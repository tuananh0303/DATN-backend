import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { IApproveService } from './iapprove.service';
import { UUID } from 'crypto';
import { Approve } from './approve.entity';
import { CreateApproveDto } from './dtos/create-approve.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ApproveFacilityProvider } from './providers/approve-facility.provider';
import { ApproveFacilityNameProvider } from './providers/approve-facilaty-name.provider';
import { ApproveCertificateProvider } from './providers/approve-certificate.provider';
import { ApproveLicenseProvider } from './providers/approvce-license.provider';
import { ApproveTypeEnum } from './enums/approve-type.enum';
import { RejectNoteDto } from './dtos/reject-note.dto';
import { ApproveStatusEnum } from './enums/approve-status.enum';

@Injectable()
export class ApproveService implements IApproveService {
  constructor(
    /**
     * inject ApproveRepository
     */
    @InjectRepository(Approve)
    private readonly approveRepository: Repository<Approve>,
    /**
     * inject ApproveFacilityProvider
     */
    private readonly approveFacilityProvider: ApproveFacilityProvider,
    /**
     * inject ApproveFacilityNameProvider
     */
    private readonly approveFacilityNameProvider: ApproveFacilityNameProvider,
    /**
     * inject ApproveCertificateProvider
     */
    private readonly approveCertificateProvider: ApproveCertificateProvider,
    /**
     * inject ApproveLicenseProvider
     */
    private readonly approveLicenseProvider: ApproveLicenseProvider,
  ) {}

  public async create(
    facilityId: UUID,
    createApproveDto: CreateApproveDto,
  ): Promise<Approve> {
    console.log('--------------------');
    switch (createApproveDto.type) {
      case ApproveTypeEnum.FACILITY:
        return await this.approveFacilityProvider.create(
          facilityId,
          createApproveDto,
        );

      case ApproveTypeEnum.FACILITY_NAME:
        return await this.approveFacilityNameProvider.create(
          facilityId,
          createApproveDto,
        );

      case ApproveTypeEnum.CERTIFICATE:
        return await this.approveCertificateProvider.create(
          facilityId,
          createApproveDto,
        );

      case ApproveTypeEnum.LICENSE:
        return await this.approveLicenseProvider.create(
          facilityId,
          createApproveDto,
        );
      default:
        throw new BadRequestException('An error occurred');
    }
  }

  public async approve(approveId: UUID): Promise<{ message: string }> {
    const approve = await this.findOneById(approveId);

    if (approve.status !== ApproveStatusEnum.PENDING) {
      throw new BadRequestException('approval must be pendding');
    }

    switch (approve.type) {
      case ApproveTypeEnum.FACILITY:
        return await this.approveFacilityProvider.approve(approve);

      case ApproveTypeEnum.FACILITY_NAME:
        return await this.approveFacilityNameProvider.approve(approve);

      case ApproveTypeEnum.CERTIFICATE:
        return await this.approveCertificateProvider.approve(approve);

      case ApproveTypeEnum.LICENSE:
        return await this.approveLicenseProvider.approve(approve);
      default:
        throw new BadRequestException('An error occurred');
    }
  }

  public async reject(
    approveId: UUID,
    rejectNoteDto: RejectNoteDto,
  ): Promise<{ message: string }> {
    const approve = await this.findOneById(approveId);

    if (approve.status !== ApproveStatusEnum.PENDING) {
      throw new BadRequestException('approval must be pendding');
    }

    switch (approve.type) {
      case ApproveTypeEnum.FACILITY:
        return await this.approveFacilityProvider.reject(
          approve,
          rejectNoteDto,
        );

      case ApproveTypeEnum.FACILITY_NAME:
        return await this.approveFacilityNameProvider.reject(
          approve,
          rejectNoteDto,
        );

      case ApproveTypeEnum.CERTIFICATE:
        return await this.approveCertificateProvider.reject(
          approve,
          rejectNoteDto,
        );

      case ApproveTypeEnum.LICENSE:
        return await this.approveLicenseProvider.reject(approve, rejectNoteDto);
      default:
        throw new BadRequestException('An error occurred');
    }
  }

  public async findOneById(approveId: UUID): Promise<Approve> {
    return await this.approveRepository
      .findOneOrFail({
        relations: {
          facility: true,
        },
        where: {
          id: approveId,
        },
      })
      .catch(() => {
        throw new NotFoundException('Not found the approve');
      });
  }

  public async getAll(): Promise<Approve[]> {
    return this.approveRepository.find({
      relations: {
        facility: {
          certificate: true,
          licenses: true,
        },
      },
    });
  }
}
