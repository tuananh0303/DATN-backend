import {
  BadRequestException,
  forwardRef,
  Inject,
  Injectable,
} from '@nestjs/common';
import { ApproveAbstract } from './approve.abstract';
import { UUID } from 'crypto';
import { Approve } from '../approve.entity';
import { CreateApproveDto } from '../dtos/create-approve.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { FacilityService } from 'src/facilities/facility.service';
import { ApproveStatusEnum } from '../enums/approve-status.enum';
import { RejectNoteDto } from '../dtos/reject-note.dto';

@Injectable()
export class ApproveFacilityProvider implements ApproveAbstract {
  constructor(
    /**
     * inject ApproveRopsitory
     */
    @InjectRepository(Approve)
    private readonly approveRepository: Repository<Approve>,
    /**
     * inject FacilityService
     */
    @Inject(forwardRef(() => FacilityService))
    private readonly facilityService: FacilityService,
  ) {}

  public async create(
    facilityId: UUID,
    createApproveDto: CreateApproveDto,
  ): Promise<Approve> {
    const facility = await this.facilityService.findOneById(facilityId);

    console.log(facility);

    const approve = this.approveRepository.create({
      type: createApproveDto.type,
      facility,
    });

    return await this.approveRepository.save(approve);
  }

  public async approve(approve: Approve): Promise<{ message: string }> {
    approve.status = ApproveStatusEnum.APPROVED;

    await this.facilityService.approve(approve.facility);

    try {
      await this.approveRepository.save(approve);
    } catch {
      throw new BadRequestException(
        'An error occurred when approve the facility',
      );
    }

    return {
      message: 'Approve the facility successful',
    };
  }

  public async reject(
    approve: Approve,
    rejectNoteDto: RejectNoteDto,
  ): Promise<{ message: string }> {
    approve.status = ApproveStatusEnum.REJECTED;
    if (rejectNoteDto.note) {
      approve.note = rejectNoteDto.note;
    }

    await this.facilityService.reject(approve.facility);

    try {
      await this.approveRepository.save(approve);
    } catch {
      throw new BadRequestException(
        'An error occurred when reject the facility',
      );
    }

    return {
      message: 'Reject the facility successful',
    };
  }
}
