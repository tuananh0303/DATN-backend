import { UUID } from 'crypto';
import { Approve } from './approve.entity';
import { CreateApproveDto } from './dtos/create-approve.dto';
import { RejectNoteDto } from './dtos/reject-note.dto';

export interface IApproveService {
  create(
    facilityId: UUID,
    createApproveDto: CreateApproveDto,
  ): Promise<Approve>;

  approve(approveId: UUID): Promise<{ message: string }>;

  reject(
    approveId: UUID,
    rejectNoteDto: RejectNoteDto,
  ): Promise<{ message: string }>;

  findOneById(approveId: UUID): Promise<Approve>;

  getAll(): Promise<Approve[]>;
}
