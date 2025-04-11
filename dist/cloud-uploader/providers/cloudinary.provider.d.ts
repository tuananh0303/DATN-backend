import { CloudinaryResponse } from './cloudinary-response.type';
export declare class CloudinaryProvider {
    upload(file: Express.Multer.File): Promise<CloudinaryResponse>;
}
