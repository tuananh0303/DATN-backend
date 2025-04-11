import { Injectable } from '@nestjs/common';
import { ApproveAbstract } from './approve.abstract';
import { UUID } from 'crypto';
import { Approve } from '../approve.entity';
import { CreateApproveDto } from '../dtos/create-approve.dto';
import { RejectNoteDto } from '../dtos/reject-note.dto';

@Injectable()
export class ApproveFacilityNameProvider implements ApproveAbstract {
  create(
    facilityId: UUID,
    createApproveDto: CreateApproveDto,
  ): Promise<Approve> {
    throw new Error('Method not implemented.');
  }
  approve(approve: Approve): Promise<{ message: string }> {
    throw new Error('Method not implemented.');
  }
  reject(
    approve: Approve,
    rejectNoteDto: RejectNoteDto,
  ): Promise<{ message: string }> {
    throw new Error('Method not implemented.');
  }
}
