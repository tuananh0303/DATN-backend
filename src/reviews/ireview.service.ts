import { UUID } from 'crypto';
import { CreateReviewDto } from './dtos/requests/create-review.dto';

export interface IReviewService {
  create(
    createReviewDto: CreateReviewDto,
    images: Express.Multer.File[],
    playerId: UUID,
  ): Promise<{ message: string }>;
}
