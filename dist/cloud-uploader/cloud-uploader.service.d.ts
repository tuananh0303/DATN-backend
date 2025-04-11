import { CloudinaryProvider } from './providers/cloudinary.provider';
export declare class CloudUploaderService {
    private readonly cloudinaryProvider;
    constructor(cloudinaryProvider: CloudinaryProvider);
    upload(file: Express.Multer.File): Promise<import("./providers/cloudinary-response.type").CloudinaryResponse>;
}
