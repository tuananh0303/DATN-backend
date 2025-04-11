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
import { DataSource, In, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateFacilityDto } from './dtos/requests/create-facility.dto';
import { PersonService } from 'src/people/person.service';
import { FieldGroupService } from 'src/field-groups/field-group.service';
import { CertificateService } from 'src/certificates/certificate.service';
import { LicenseService } from 'src/licenses/license.service';
import { CloudUploaderService } from 'src/cloud-uploader/cloud-uploader.service';
import { FacilityStatusEnum } from './enums/facility-status.enum';
import { ApproveService } from 'src/approves/approve.service';
import { ApproveTypeEnum } from 'src/approves/enums/approve-type.enum';

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
    @Inject(forwardRef(() => ApproveService))
    private readonly approveService: ApproveService,
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
    let facilityId: UUID;

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

      // create notification for admin here, later
      facilityId = newFacility.id;
    });

    await this.approveService.create(facilityId!, {
      type: ApproveTypeEnum.FACILITY,
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

  public async getByFacility(facilityId: UUID): Promise<Facility> {
    return this.facilityRepository
      .findOneOrFail({
        relations: {
          fieldGroups: {
            fields: true,
            sports: true,
          },
          owner: true,
          licenses: true,
          certificate: true,
        },
        where: {
          id: facilityId,
        },
      })
      .catch(() => {
        throw new NotFoundException(
          `Not found facility with id: ${facilityId}`,
        );
      });
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

  public async approve(facility: Facility): Promise<Facility> {
    if (facility.status !== FacilityStatusEnum.PENDING) {
      throw new BadRequestException('The facility is not pending');
    }

    facility.status = FacilityStatusEnum.ACTIVE;

    return await this.facilityRepository.save(facility);
  }

  public async reject(facility: Facility): Promise<Facility> {
    if (facility.status !== FacilityStatusEnum.PENDING) {
      throw new BadRequestException('The facility is not pending');
    }

    facility.status = FacilityStatusEnum.UNACTIVE;

    return await this.facilityRepository.save(facility);
  }
}
