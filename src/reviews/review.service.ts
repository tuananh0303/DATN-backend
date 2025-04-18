import { BadRequestException, Injectable } from '@nestjs/common';
import { IReviewService } from './ireview.service';
import { UUID } from 'crypto';
import { CreateReviewDto } from './dtos/requests/create-review.dto';
import { Review } from './review.entity';
import { BookingService } from 'src/bookings/booking.service';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CloudUploaderService } from 'src/cloud-uploader/cloud-uploader.service';
import { FacilityService } from 'src/facilities/facility.service';
import { PaymentStatusEnum } from 'src/payments/enums/payment-status.enum';

@Injectable()
export class ReviewService implements IReviewService {
  constructor(
    /**
     * inject BookingService
     */
    private readonly bookingService: BookingService,
    /**
     * inject ReviewRepository
     */
    @InjectRepository(Review)
    private readonly reviewRepository: Repository<Review>,
    /**
     * inject CloudUploadService
     */
    private readonly cloudUploadService: CloudUploaderService,
    /**
     * inject FacilityService
     */
    private readonly facilityService: FacilityService,
  ) {}

  public async create(
    createReviewDto: CreateReviewDto,
    images: Express.Multer.File[],
    playerId: UUID,
  ): Promise<{ message: string }> {
    const booking = await this.bookingService.findOneByIdAndPlayer(
      createReviewDto.bookingId,
      playerId,
      ['bookingSlots.field', 'review', 'payment'],
    );

    if (booking.payment.status !== PaymentStatusEnum.PAID) {
      throw new BadRequestException('The booking is unpaid or cancel');
    }

    let isAccept = false;

    for (const bookingSlot of booking.bookingSlots) {
      const bookingDate = new Date(
        bookingSlot.date.toISOString().split('T')[0] + ' ' + booking.startTime,
      );

      console.log(booking.createdAt);

      if (bookingDate < new Date(new Date().toString())) {
        isAccept = true;

        break;
      }
    }

    if (!isAccept) {
      throw new BadRequestException('You cannot submit a review yet');
    }

    if (booking.review !== null) {
      throw new BadRequestException('You have reviewed this booking yet');
    }

    const imageUrl: string[] = [];
    for (const image of images) {
      if (!image.mimetype.includes('image')) {
        throw new BadRequestException('You only submit an image type');
      }

      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const { secure_url } = await this.cloudUploadService.upload(image);

      imageUrl.push(String(secure_url));
    }

    const review = this.reviewRepository.create({
      ...createReviewDto,
      imageUrl,
      booking,
    });

    try {
      await this.reviewRepository.save(review);

      await this.facilityService.addRating(
        booking.bookingSlots[0].field.id,
        createReviewDto.rating,
      );
    } catch {
      throw new BadRequestException('An error occurred when create review');
    }

    return {
      message: 'create review successful',
    };
  }
}
