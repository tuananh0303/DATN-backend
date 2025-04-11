import { forwardRef, Module } from '@nestjs/common';
import { FacilityService } from './facility.service';
import { FacilityController } from './facility.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Facility } from './facility.entity';
import { FieldGroupModule } from 'src/field-groups/field-group.module';
import { PersonModule } from 'src/people/person.module';
import { CertificateModule } from 'src/certificates/certificate.module';
import { LicenseModule } from 'src/licenses/license.module';
import { CloudUploaderModule } from 'src/cloud-uploader/cloud-uploader.module';
import { ApproveModule } from 'src/approves/approve.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Facility]),
    forwardRef(() => FieldGroupModule),
    PersonModule,
    forwardRef(() => CertificateModule),
    forwardRef(() => LicenseModule),
    CloudUploaderModule,
    forwardRef(() => ApproveModule),
  ],
  providers: [FacilityService],
  controllers: [FacilityController],
  exports: [FacilityService],
})
export class FacilityModule {}
