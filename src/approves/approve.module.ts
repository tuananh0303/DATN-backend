import { forwardRef, Module } from '@nestjs/common';
import { ApproveController } from './approve.controller';
import { ApproveService } from './approve.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Approve } from './approve.entity';
import { ApproveFacilityProvider } from './providers/approve-facility.provider';
import { ApproveFacilityNameProvider } from './providers/approve-facilaty-name.provider';
import { ApproveCertificateProvider } from './providers/approve-certificate.provider';
import { ApproveLicenseProvider } from './providers/approvce-license.provider';
import { FacilityModule } from 'src/facilities/facility.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Approve]),
    forwardRef(() => FacilityModule),
  ],
  controllers: [ApproveController],
  providers: [
    ApproveService,
    ApproveFacilityProvider,
    ApproveFacilityNameProvider,
    ApproveCertificateProvider,
    ApproveLicenseProvider,
  ],
  exports: [ApproveService],
})
export class ApproveModule {}
