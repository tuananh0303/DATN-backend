import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { CloudUploaderService } from './cloud-uploader.service';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('cloud-uploader')
export class CloudUploaderController {
  constructor(
    /**
     * inject CloudUploaderService
     */
    private readonly cloudUploaderService: CloudUploaderService,
  ) {}

  @Post()
  @UseInterceptors(FileInterceptor('image'))
  public upload(@UploadedFile() image: Express.Multer.File) {
    return this.cloudUploaderService.uploadImage(image);
  }
}
