import {
  BadRequestException,
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { IFacilityService } from './ifacility.service';
import { UUID } from 'crypto';
import { Facility } from './facility.entity';
import { DataSource, EntityManager, In, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateFacilityDto } from './dtos/requests/create-facility.dto';
import { PersonService } from 'src/people/person.service';
import { FieldGroupService } from 'src/field-groups/field-group.service';
import { CertificateService } from 'src/certificates/certificate.service';
import { LicenseService } from 'src/licenses/license.service';
import { CloudUploaderService } from 'src/cloud-uploader/cloud-uploader.service';
import { FacilityStatusEnum } from './enums/facility-status.enum';
import { ApprovalService } from 'src/approvals/approval.service';
import { ApprovalTypeEnum } from 'src/approvals/enums/approval-type.enum';
import { SportService } from 'src/sports/sport.service';
import { DeleteImageDto } from './dtos/requests/delete-image.dto';
import { UpdateBaseInfo } from './dtos/requests/update-base-info.dto';

@Injectable()
export class FacilityService implements IFacilityService {
  constructor(
    /**
     * inject FacilityRepository
     */
    @InjectRepository(Facility)
    private readonly facilityRepository: Repository<Facility>,
    /**
     * inject DataSource
     */
    private readonly dataSource: DataSource,
    /**
     * inject PersonService
     */
    private readonly personService: PersonService,
    /**
     * inject FieldGroupService
     */
    @Inject(forwardRef(() => FieldGroupService))
    private readonly fieldGroupService: FieldGroupService,
    /**
     * inject CertificateService
     */
    @Inject(forwardRef(() => CertificateService))
    private readonly certificateService: CertificateService,
    /**
     * inject LicenseService
     */
    @Inject(forwardRef(() => LicenseService))
    private readonly licenseService: LicenseService,
    /**
     * inject CloudUploaderService
     */
    private readonly cloudUploaderService: CloudUploaderService,
    /**
     * inject ApproveService
     */
    @Inject(forwardRef(() => ApprovalService))
    private readonly approvalService: ApprovalService,
    /**
     * inject SportService
     */
    private readonly sportService: SportService,
  ) {}

  public async findOneByIdAndOwnerId(
    facilityId: UUID,
    ownerId: UUID,
  ): Promise<Facility> {
    return await this.facilityRepository
      .findOneOrFail({
        where: {
          id: facilityId,
          owner: {
            id: ownerId,
          },
        },
      })
      .catch(() => {
        throw new NotFoundException(
          `Not found facility by id: ${facilityId} of owner: ${ownerId}`,
        );
      });
  }

  public async create(
    createFacilityDto: CreateFacilityDto,
    images: Express.Multer.File[],
    ownerId: UUID,
    certificate: Express.Multer.File,
    licenses?: Express.Multer.File[],
    sportIds?: number[],
  ): Promise<{ message: string }> {
    await this.dataSource.transaction(async (manager) => {
      const owner = await this.personService.findOneByIdWithTransaction(
        ownerId,
        manager,
      );

      // create facility
      const facility = manager.create(Facility, {
        ...createFacilityDto,
        owner,
      });
      try {
        await manager.save(facility);
      } catch {
        throw new BadRequestException('An error occurred when create facility');
      }

      // create field groups
      for (const fieldGroup of createFacilityDto.fieldGroups) {
        await this.fieldGroupService.createWithTransaction(
          fieldGroup,
          facility,
          manager,
        );
      }

      // create certificate
      await this.certificateService.createWithTransaction(
        certificate,
        facility,
        manager,
      );

      if (sportIds && licenses) {
        if (sportIds.length !== licenses.length) {
          throw new BadRequestException(
            'sportIds and licenses must be the same length',
          );
        }

        const uniqueSportIds = new Set(sportIds);
        if (uniqueSportIds.size !== sportIds.length) {
          throw new BadRequestException('sportIds must be unique set');
        }

        for (let i = 0; i < licenses.length; i++) {
          await this.licenseService.createWithTransaction(
            licenses[i],
            facility,
            sportIds[i],
            manager,
          );
        }
      }

      // upload image
      const iamgesUrl: string[] = [];
      for (const image of images) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        const { secure_url } = await this.cloudUploaderService.upload(image);
        iamgesUrl.push(String(secure_url));
      }

      const newFacility = await manager
        .findOneOrFail(Facility, {
          where: {
            id: facility.id,
          },
        })
        .catch(() => {
          throw new BadRequestException();
        });

      newFacility.imagesUrl = iamgesUrl;

      await manager.save(newFacility);

      await this.approvalService.createWithTransaction(
        newFacility.id,
        ApprovalTypeEnum.FACILITY,
        {},
        manager,
      );
    });

    return {
      message: 'Create facility successful',
    };
  }

  public async getAll(): Promise<any[]> {
    const facilities = await this.facilityRepository.find({
      relations: {
        owner: true,
        fieldGroups: {
          sports: true,
        },
      },
    });

    return facilities.map(({ fieldGroups, ...facility }) => ({
      ...facility,
      sports: fieldGroups
        .map((fieldGroup) => fieldGroup.sports)
        .flat()
        .filter(
          (item, index, self) =>
            index === self.findIndex((t) => t.id === item.id),
        ),
    }));
  }

  public async getDropDownInfo(ownerId: UUID): Promise<any[]> {
    const facilities = await this.facilityRepository.find({
      relations: {
        fieldGroups: {
          sports: true,
        },
      },
      select: {
        id: true,
        name: true,
        fieldGroups: true,
      },
      where: {
        owner: {
          id: ownerId,
        },
        status: In([FacilityStatusEnum.ACTIVE, FacilityStatusEnum.CLOSED]),
      },
      order: {
        name: 'ASC',
      },
    });

    return facilities.map(({ fieldGroups, ...facility }) => ({
      ...facility,
      sports: fieldGroups
        .map((fieldGroup) => fieldGroup.sports)
        .flat()
        .filter(
          (item, index, self) =>
            index === self.findIndex((t) => t.id === item.id),
        ),
    }));
  }

  public async getByOwner(ownerId: UUID): Promise<any[]> {
    const facilities = await this.facilityRepository.find({
      where: {
        owner: {
          id: ownerId,
        },
      },
      relations: {
        fieldGroups: {
          sports: true,
        },
      },
    });

    return facilities.map(({ fieldGroups, ...facility }) => ({
      ...facility,
      sports: fieldGroups
        .map((fieldGroup) => fieldGroup.sports)
        .flat()
        .filter(
          (item, index, self) =>
            index === self.findIndex((t) => t.id === item.id),
        ),
      minPrice: Math.min(
        ...fieldGroups.map((fieldGroup) => fieldGroup.basePrice),
      ),
      maxPrice: Math.max(
        ...fieldGroups.map((fieldGroup) => fieldGroup.basePrice),
      ),
    }));
  }

  public async getByFacility(facilityId: UUID): Promise<any> {
    const facility = await this.facilityRepository
      .findOneOrFail({
        relations: {
          fieldGroups: {
            fields: true,
            sports: true,
          },
          owner: true,
          licenses: {
            sport: true,
          },
          certificate: true,
          approvals: true,
          services: true,
          vouchers: true,
        },
        where: {
          id: facilityId,
        },
        order: {
          name: 'ASC',
          approvals: {
            updatedAt: 'DESC',
          },
        },
      })
      .catch(() => {
        throw new NotFoundException(
          `Not found facility with id: ${facilityId}`,
        );
      });

    return {
      ...facility,
      minPrice: Math.min(
        ...facility.fieldGroups.map((fieldGroup) => fieldGroup.basePrice),
      ),
      maxPrice: Math.max(
        ...facility.fieldGroups.map((fieldGroup) => fieldGroup.basePrice),
      ),
    };
  }

  public async findOneById(facilityId: UUID): Promise<Facility> {
    return this.facilityRepository
      .findOneOrFail({
        where: {
          id: facilityId,
        },
      })
      .catch(() => {
        throw new NotFoundException('Not found the facility');
      });
  }

  public async findOneByIdWithTransaction(
    facilityId: UUID,
    manager: EntityManager,
  ): Promise<Facility> {
    return manager
      .findOneOrFail(Facility, {
        where: {
          id: facilityId,
        },
      })
      .catch(() => {
        throw new NotFoundException('Not found the facility');
      });
  }

  public async findOneByIdAndOwnerWithTransaction(
    facilityId: UUID,
    manager: EntityManager,
    ownerId: UUID,
  ): Promise<Facility> {
    return manager
      .findOneOrFail(Facility, {
        where: {
          id: facilityId,
          owner: {
            id: ownerId,
          },
        },
      })
      .catch(() => {
        throw new NotFoundException('Not found the facility');
      });
  }

  public async updateName(
    facilityId: UUID,
    name: string,
    certificate: Express.Multer.File,
    ownerId: UUID,
  ): Promise<{ message: string }> {
    await this.dataSource.transaction(async (manager) => {
      const facility = await this.findOneByIdAndOwnerWithTransaction(
        facilityId,
        manager,
        ownerId,
      );

      if (facility.status !== FacilityStatusEnum.ACTIVE) {
        throw new BadRequestException('The facility must be active');
      }

      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const { secure_url } =
        await this.cloudUploaderService.upload(certificate);

      await this.approvalService.createWithTransaction(
        facilityId,
        ApprovalTypeEnum.FACILITY_NAME,
        { name, certificate: String(secure_url) },
        manager,
      );
    });

    return {
      message: 'Update name successful',
    };
  }

  public async updateCertificate(
    facilityId: UUID,
    certificate: Express.Multer.File,
    ownerId: UUID,
  ): Promise<{ message: string }> {
    await this.dataSource.transaction(async (manager) => {
      const facility = await this.findOneByIdAndOwnerWithTransaction(
        facilityId,
        manager,
        ownerId,
      );

      if (facility.status !== FacilityStatusEnum.ACTIVE) {
        throw new BadRequestException('The facility must be active');
      }

      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const { secure_url } =
        await this.cloudUploaderService.upload(certificate);

      await this.approvalService.createWithTransaction(
        facilityId,
        ApprovalTypeEnum.CERTIFICATE,
        { certificate: String(secure_url) },
        manager,
      );
    });

    return {
      message: 'Update certificate successful',
    };
  }

  public async updateLicense(
    facilityId: UUID,
    sportId: number,
    license: Express.Multer.File,
    ownerId: UUID,
  ): Promise<{ message: string }> {
    await this.dataSource.transaction(async (manager) => {
      const facility = await this.findOneByIdAndOwnerWithTransaction(
        facilityId,
        manager,
        ownerId,
      );

      await this.sportService.findOneByIdWithTransaction(sportId, manager);

      if (facility.status !== FacilityStatusEnum.ACTIVE) {
        throw new BadRequestException('The facility must be active');
      }

      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const { secure_url } = await this.cloudUploaderService.upload(license);

      await this.approvalService.createWithTransaction(
        facilityId,
        ApprovalTypeEnum.LICENSE,
        {
          license: String(secure_url),
          sportId,
        },
        manager,
      );
    });

    return {
      message: 'Update license successful',
    };
  }

  public async getExistingFacilityName(ownerId: UUID): Promise<string[]> {
    const facilities = await this.facilityRepository.find({
      where: {
        owner: {
          id: ownerId,
        },
      },
    });

    return facilities.map((facility) => facility.name);
  }

  public async addImages(
    facilityId: UUID,
    images: Express.Multer.File[],
    ownerId: UUID,
  ): Promise<{ message: string }> {
    const facility = await this.facilityRepository
      .findOneOrFail({
        where: {
          id: facilityId,
          owner: {
            id: ownerId,
          },
        },
      })
      .catch(() => {
        throw new NotFoundException('Not found the facility');
      });

    for (const image of images) {
      if (!image.mimetype.includes('image')) {
        throw new BadRequestException('The files must be image type');
      }

      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const { secure_url } = await this.cloudUploaderService.upload(image);

      facility.imagesUrl?.push(String(secure_url));
    }

    try {
      await this.facilityRepository.save(facility);
    } catch {
      throw new BadRequestException(
        'An error occurred when add image into facility',
      );
    }

    return {
      message: 'Add image into facility successful',
    };
  }

  public async deleteImage(
    deleteImageDto: DeleteImageDto,
    ownerId: UUID,
  ): Promise<{ message: string }> {
    const facility = await this.facilityRepository
      .findOneOrFail({
        where: {
          id: deleteImageDto.facilityId,
          owner: {
            id: ownerId,
          },
        },
      })
      .catch(() => {
        throw new NotFoundException('Not found the facility');
      });

    facility.imagesUrl = facility.imagesUrl?.filter(
      (imageUrl) => imageUrl !== deleteImageDto.imageUrl,
    );

    try {
      await this.facilityRepository.save(facility);
    } catch {
      throw new BadRequestException('Delete the image in facility');
    }

    return {
      message: 'Delete image in facility successful',
    };
  }

  public async updateBaseInfo(
    facilityId: UUID,
    updateBaseInfo: UpdateBaseInfo,
    ownerId: UUID,
  ): Promise<{ message: string }> {
    const facility = await this.findOneByIdAndOwnerId(facilityId, ownerId);

    if (updateBaseInfo.description)
      facility.description = updateBaseInfo.description;

    if (updateBaseInfo.openTime1) facility.openTime1 = updateBaseInfo.openTime1;

    if (updateBaseInfo.closeTime1)
      facility.closeTime1 = updateBaseInfo.closeTime1;

    if (updateBaseInfo.openTime2) facility.openTime2 = updateBaseInfo.openTime2;

    if (updateBaseInfo.closeTime2)
      facility.closeTime2 = updateBaseInfo.closeTime2;

    if (updateBaseInfo.openTime3) facility.openTime3 = updateBaseInfo.openTime3;

    if (updateBaseInfo.closeTime3)
      facility.closeTime3 = updateBaseInfo.closeTime3;

    try {
      await this.facilityRepository.save(facility);
    } catch (error) {
      throw new BadRequestException(String(error));
    }

    return {
      message: 'Update info facility successful',
    };
  }

  public async getActiveTime(facilityId: UUID): Promise<any> {
    const facility = await this.facilityRepository
      .findOneOrFail({
        where: {
          id: facilityId,
        },
      })
      .catch(() => {
        throw new NotFoundException(`Not found facility by id: ${facilityId}`);
      });

    return {
      openTime1: facility.openTime1,
      closeTime1: facility.closeTime1,
      openTime2: facility.openTime2,
      closeTime2: facility.closeTime2,
      openTime3: facility.closeTime3,
      closeTime3: facility.closeTime3,
    };
  }

  public async findOneByField(fieldId: number): Promise<Facility> {
    return await this.facilityRepository
      .findOneOrFail({
        relations: {
          fieldGroups: true,
        },
        where: {
          fieldGroups: {
            fields: {
              id: fieldId,
            },
          },
        },
      })
      .catch(() => {
        throw new NotFoundException('Not found the facility by field');
      });
  }
}
