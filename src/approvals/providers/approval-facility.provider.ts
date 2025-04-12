import {
  BadRequestException,
  forwardRef,
  Inject,
  Injectable,
} from '@nestjs/common';
import { ApprovalAbstract } from './approval.abstract';
import { UUID } from 'crypto';
import { Approval } from '../approval.entity';
import { CreateApprovalDto } from '../dtos/create-approval.dto';
import { DataSource, EntityManager, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { FacilityService } from 'src/facilities/facility.service';
import { ApprovalStatusEnum } from '../enums/approval-status.enum';
import { RejectNoteDto } from '../dtos/reject-note.dto';
import { ApprovalTypeEnum } from '../enums/approval-type.enum';
import { FacilityStatusEnum } from 'src/facilities/enums/facility-status.enum';

@Injectable()
export class ApprovalFacilityProvider implements ApprovalAbstract {
  constructor(
    /**
     * inject ApproveRopsitory
     */
    @InjectRepository(Approval)
    private readonly approveRepository: Repository<Approval>,
    /**
     * inject FacilityService
     */
    @Inject(forwardRef(() => FacilityService))
    private readonly facilityService: FacilityService,
    /**
     * inject DataSource
     */
    private readonly dataSource: DataSource,
  ) {}

  public async createWithTransaction(
    facilityId: UUID,
    createApprovalDto: CreateApprovalDto,
    manager: EntityManager,
  ): Promise<Approval> {
    const facility = await this.facilityService.findOneByIdWithTransaction(
      facilityId,
      manager,
    );

    const approve = manager.create(Approval, {
      type: ApprovalTypeEnum.FACILITY,
      facility,
    });

    // maybe add notificate here, later

    return await manager.save(approve);
  }

  public async approve(approve: Approval): Promise<{ message: string }> {
    await this.dataSource.transaction(async (manager) => {
      approve.status = ApprovalStatusEnum.APPROVED;

      const facility = await this.facilityService.findOneByIdWithTransaction(
        approve.facility.id,
        manager,
      );

      if (facility.status !== FacilityStatusEnum.PENDING) {
        throw new BadRequestException('The facility status must be pending');
      }

      facility.status = FacilityStatusEnum.ACTIVE;

      try {
        await manager.save(approve);

        await manager.save(facility);
      } catch {
        throw new BadRequestException(
          'An error occurred when approve the facility',
        );
      }
    });

    return {
      message: 'Approve the facility successful',
    };
  }

  public async reject(
    approval: Approval,
    rejectNoteDto: RejectNoteDto,
  ): Promise<{ message: string }> {
    await this.dataSource.transaction(async (manager) => {
      approval.status = ApprovalStatusEnum.REJECTED;

      if (rejectNoteDto.note) {
        approval.note = rejectNoteDto.note;
      }

      const facility = await this.facilityService.findOneByIdWithTransaction(
        approval.facility.id,
        manager,
      );

      if (facility.status !== FacilityStatusEnum.PENDING) {
        throw new BadRequestException('The facility status must be pending');
      }

      facility.status = FacilityStatusEnum.UNACTIVE;

      try {
        await manager.save(approval);

        await manager.save(facility);
      } catch {
        throw new BadRequestException(
          'An error occurred when reject the facility',
        );
      }
    });

    return {
      message: 'Reject the facility successful',
    };
  }
}
