"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const person_module_1 = require("./people/person.module");
const config_1 = require("@nestjs/config");
const typeorm_1 = require("@nestjs/typeorm");
const auth_module_1 = require("./auths/auth.module");
const auth_role_guard_1 = require("./auths/guards/auth-role.guard");
const core_1 = require("@nestjs/core");
const admin_guard_1 = require("./auths/guards/admin.guard");
const player_guard_1 = require("./auths/guards/player.guard");
const owner_guard_1 = require("./auths/guards/owner.guard");
const jwt_1 = require("@nestjs/jwt");
const cloud_uploader_module_1 = require("./cloud-uploader/cloud-uploader.module");
const sport_module_1 = require("./sports/sport.module");
const field_module_1 = require("./fields/field.module");
const field_group_module_1 = require("./field-groups/field-group.module");
const facility_module_1 = require("./facilities/facility.module");
const certificate_module_1 = require("./certificates/certificate.module");
const license_module_1 = require("./licenses/license.module");
const service_module_1 = require("./services/service.module");
const voucher_module_1 = require("./vouchers/voucher.module");
const approve_module_1 = require("./approves/approve.module");
const booking_module_1 = require("./bookings/booking.module");
const booking_slot_module_1 = require("./booking-slots/booking-slot.module");
const additional_service_module_1 = require("./additional-services/additional-service.module");
const payment_module_1 = require("./payments/payment.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            person_module_1.PersonModule,
            config_1.ConfigModule.forRoot({
                isGlobal: true,
            }),
            typeorm_1.TypeOrmModule.forRootAsync({
                inject: [config_1.ConfigService],
                useFactory: (configService) => ({
                    type: 'postgres',
                    autoLoadEntities: configService.get('DATABASE_AUTOLOAD'),
                    synchronize: configService.get('DATABASE_SYNC'),
                    port: configService.get('DATABASE_PORT'),
                    username: configService.get('DATABASE_USERNAME'),
                    password: configService.get('DATABASE_PASSWORD'),
                    host: configService.get('DATABASE_HOST'),
                    database: configService.get('DATABASE_NAME'),
                    logging: true,
                }),
            }),
            auth_module_1.AuthModule,
            jwt_1.JwtModule,
            cloud_uploader_module_1.CloudUploaderModule,
            sport_module_1.SportModule,
            field_module_1.FieldModule,
            field_group_module_1.FieldGroupModule,
            facility_module_1.FacilityModule,
            certificate_module_1.CertificateModule,
            license_module_1.LicenseModule,
            service_module_1.ServiceModule,
            voucher_module_1.VoucherModule,
            approve_module_1.ApproveModule,
            booking_module_1.BookingModule,
            booking_slot_module_1.BookingSlotModule,
            additional_service_module_1.AdditionalServiceModule,
            payment_module_1.PaymentModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [
            app_service_1.AppService,
            {
                provide: core_1.APP_GUARD,
                useClass: auth_role_guard_1.AuthRoleGuard,
            },
            admin_guard_1.AdminGuard,
            player_guard_1.PlayerGuard,
            owner_guard_1.OwnerGuard,
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map