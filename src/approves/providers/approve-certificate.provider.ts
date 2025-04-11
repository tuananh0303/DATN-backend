import { UUID } from 'crypto';
import { Approve } from '../approve.entity';
import { CreateApproveDto } from '../dtos/create-approve.dto';
import { ApproveAbstract } from './approve.abstract';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { RejectNoteDto } from '../dtos/reject-note.dto';

export class ApproveCertificateProvider implements ApproveAbstract {
  constructor(
    /**
     * inject ApproveProvider
     */
    @InjectRepository(Approve)
    private readonly approveRepository: Repository<Approve>,
  ) {}

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
