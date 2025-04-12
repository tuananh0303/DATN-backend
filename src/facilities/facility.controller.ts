import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  ParseUUIDPipe,
  Post,
  Put,
  Query,
  UploadedFile,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FacilityService } from './facility.service';
import { ApiOperation, ApiQuery } from '@nestjs/swagger';
import {
  FileFieldsInterceptor,
  FileInterceptor,
} from '@nestjs/platform-express';
import { CreateFacilityInterceptor } from './interceptors/create-facility.interceptor';
import { AuthRoles } from 'src/auths/decorators/auth-role.decorator';
import { AuthRoleEnum } from 'src/auths/enums/auth-role.enum';
import { CreateFacilityDto } from './dtos/requests/create-facility.dto';
import { SportLicensesDto } from './dtos/requests/sport-licenses.dto';
import { ActivePerson } from 'src/auths/decorators/active-person.decorator';
import { UUID } from 'crypto';

@Controller('facility')
export class FacilityController {
  constructor(
    /**
     * inject FacilityService
     */
    private readonly facilityService: FacilityService,
  ) {}

  @ApiOperation({
    summary: 'create new facility and field groups and fields (role: owner)',
  })
  @Post('create')
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'images', maxCount: 10 },
      { name: 'licenses', maxCount: 7 },
      { name: 'certificate', maxCount: 1 },
    ]),
    CreateFacilityInterceptor,
  )
  @AuthRoles(AuthRoleEnum.OWNER)
  public create(
    @Body('facilityInfo') createFacilityDto: CreateFacilityDto,
    @UploadedFiles()
    files: {
      images: Express.Multer.File[];
      certificate: Express.Multer.File[];
      licenses?: Express.Multer.File[];
    },
    @Body('sportLicenses') sportLicensesDto: SportLicensesDto,
    @ActivePerson('sub') ownerId: UUID,
  ) {
    return this.facilityService.create(
      createFacilityDto,
      files.images,
      ownerId,
      files.certificate[0],
      files.licenses,
      sportLicensesDto.sportIds,
    );
  }

  @ApiOperation({
    summary: 'get all facilities (role: none)',
  })
  @Get('all')
  @AuthRoles(AuthRoleEnum.NONE)
  public getAll() {
    return this.facilityService.getAll();
  }

  @ApiOperation({
    summary: 'get drop down info of facility (role: owner)',
  })
  @Get('drop-down')
  @AuthRoles(AuthRoleEnum.OWNER)
  public getDropDownInfo(@ActivePerson('sub') ownerId: UUID) {
    return this.facilityService.getDropDownInfo(ownerId);
  }

  @ApiOperation({
    summary: 'get all facility by owner (role: none)',
  })
  @Get('owner/:ownerId')
  @AuthRoles(AuthRoleEnum.NONE)
  public getByOwner(@Param('ownerId', ParseUUIDPipe) ownerId: UUID) {
    return this.facilityService.getByOwner(ownerId);
  }

  @ApiOperation({
    summary: 'get facility by id (role: none)',
  })
  @Get(':facilityId')
  @AuthRoles(AuthRoleEnum.NONE)
  public getByFacility(@Param('facilityId', ParseUUIDPipe) facilityId: UUID) {
    return this.facilityService.getByFacility(facilityId);
  }

  @ApiOperation({
    summary: 'update name of facility (role: owner)',
  })
  @ApiQuery({
    name: 'name',
    type: 'string',
    example: 'Tên cơ sở mới',
  })
  @UseInterceptors(FileInterceptor('certificate'))
  @Put(':facilityId/update-name')
  @AuthRoles(AuthRoleEnum.OWNER)
  public updateName(
    @Param('facilityId', ParseUUIDPipe) facilityId: UUID,
    @Query('name') name: string,
    @UploadedFile() certificate: Express.Multer.File,
    @ActivePerson('sub') ownerId: UUID,
  ) {
    return this.facilityService.updateName(
      facilityId,
      name,
      certificate,
      ownerId,
    );
  }

  @ApiOperation({
    summary: 'update certificate in facility (role: owner)',
  })
  @UseInterceptors(FileInterceptor('certificate'))
  @Put(':facilityId/update-certificate')
  @AuthRoles(AuthRoleEnum.OWNER)
  public updateCertificate(
    @Param('facilityId', ParseUUIDPipe) facilityId: UUID,
    @UploadedFile() certificate: Express.Multer.File,
    @ActivePerson('sub') ownerId: UUID,
  ) {
    return this.facilityService.updateCertificate(
      facilityId,
      certificate,
      ownerId,
    );
  }

  @ApiOperation({
    summary: 'update license inn facility (role: owner)',
  })
  @ApiQuery({
    name: 'sportId',
    type: 'number',
    example: 1,
  })
  @UseInterceptors(FileInterceptor('license'))
  @Put(':facilityId/update-license')
  @AuthRoles(AuthRoleEnum.OWNER)
  public updateLicense(
    @Param('facilityId', ParseUUIDPipe) facilityId: UUID,
    @Query('sportId', ParseIntPipe) sportId: number,
    @UploadedFile() license: Express.Multer.File,
    @ActivePerson('sub') ownerId: UUID,
  ) {
    return this.facilityService.updateLicense(
      facilityId,
      sportId,
      license,
      ownerId,
    );
  }
}
