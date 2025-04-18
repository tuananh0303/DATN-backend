import {
  Body,
  Controller,
  Post,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { ApiOperation } from '@nestjs/swagger';
import { CreateReviewInterceptor } from './interceptors/create-review.interceptor';
import { CreateReviewDto } from './dtos/requests/create-review.dto';
import { ActivePerson } from 'src/auths/decorators/active-person.decorator';
import { UUID } from 'crypto';
import { ReviewService } from './review.service';
import { AuthRoles } from 'src/auths/decorators/auth-role.decorator';
import { AuthRoleEnum } from 'src/auths/enums/auth-role.enum';

@Controller('review')
export class ReviewController {
  constructor(
    /**
     * inject ReviewService
     */
    private readonly reviewService: ReviewService,
  ) {}

  @ApiOperation({
    summary: 'create rating (role: player)',
  })
  @UseInterceptors(FilesInterceptor('images'), CreateReviewInterceptor)
  @Post()
  @AuthRoles(AuthRoleEnum.PLAYER)
  public create(
    @Body() createReviewDto: CreateReviewDto,
    @UploadedFiles() images: Express.Multer.File[],
    @ActivePerson('sub') playerId: UUID,
  ) {
    return this.reviewService.create(createReviewDto, images, playerId);
  }
}
