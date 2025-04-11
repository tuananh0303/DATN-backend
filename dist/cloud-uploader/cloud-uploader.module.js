"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CloudUploaderModule = void 0;
const common_1 = require("@nestjs/common");
const cloud_uploader_service_1 = require("./cloud-uploader.service");
const cloudinary_1 = require("cloudinary");
const cloudinary_provider_1 = require("./providers/cloudinary.provider");
let CloudUploaderModule = class CloudUploaderModule {
};
exports.CloudUploaderModule = CloudUploaderModule;
exports.CloudUploaderModule = CloudUploaderModule = __decorate([
    (0, common_1.Module)({
        providers: [
            cloud_uploader_service_1.CloudUploaderService,
            cloudinary_provider_1.CloudinaryProvider,
            {
                provide: 'CLOUDINARY',
                useFactory: () => {
                    return cloudinary_1.v2.config({
                        cloud_name: process.env.CLOUDINARY_NAME,
                        api_key: process.env.CLOUDINARY_API_KEY,
                        api_secret: process.env.CLOUDINARY_API_SECRET,
                    });
                },
            },
        ],
        exports: [cloud_uploader_service_1.CloudUploaderService],
    })
], CloudUploaderModule);
//# sourceMappingURL=cloud-uploader.module.js.map