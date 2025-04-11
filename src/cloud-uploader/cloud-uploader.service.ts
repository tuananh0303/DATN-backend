import { Injectable } from '@nestjs/common';
import { CloudinaryProvider } from './providers/cloudinary.provider';

@Injectable()
export class CloudUploaderService {
  constructor(
    /**
     * inject CloudinaryProvider
     */
    private readonly cloudinaryProvider: CloudinaryProvider,
  ) {}

  public async upload(file: Express.Multer.File) {
    return await this.cloudinaryProvider.upload(file);
  }
}
