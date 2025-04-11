import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Put,
} from '@nestjs/common';
import { FieldGroupService } from './field-group.service';
import { ApiOperation } from '@nestjs/swagger';
import { AuthRoles } from 'src/auths/decorators/auth-role.decorator';
import { AuthRoleEnum } from 'src/auths/enums/auth-role.enum';
import { CreateManyFieldGroupsDto } from './dtos/request/craete-many-field-groups.dto';
import { UUID } from 'crypto';
import { ActivePerson } from 'src/auths/decorators/active-person.decorator';
import { UpdateFieldGroupDto } from './dtos/request/update-field-group.dto';

@Controller('field-group')
export class FieldGroupController {
  constructor(
    /**
     * inject FieldGroupService
     */
    private readonly fieldGroupService: FieldGroupService,
  ) {}

  @ApiOperation({
    summary: 'create many field group and fields (role: owner)',
  })
  @Put(':facilityId')
  @AuthRoles(AuthRoleEnum.OWNER)
  public createMany(
    @Body() createManyFieldGroupsDto: CreateManyFieldGroupsDto,
    @Param('facilityId', ParseUUIDPipe) facilityId: UUID,
    @ActivePerson('sub') ownerId: UUID,
  ) {
    return this.fieldGroupService.createMany(
      createManyFieldGroupsDto,
      facilityId,
      ownerId,
    );
  }

  @ApiOperation({
    summary: 'update field group (role: owner)',
  })
  @Patch(':fieldGroupId')
  @AuthRoles(AuthRoleEnum.OWNER)
  public update(
    @Param('fieldGroupId', ParseUUIDPipe) fieldGroupId: UUID,
    @Body() updateFieldGroupDto: UpdateFieldGroupDto,
    @ActivePerson('sub') ownerId: UUID,
  ) {
    return this.fieldGroupService.update(
      updateFieldGroupDto,
      fieldGroupId,
      ownerId,
    );
  }

  @ApiOperation({
    summary: 'delete field group (role: owner)',
  })
  @Delete(':fieldGroupId')
  @AuthRoles(AuthRoleEnum.OWNER)
  public delete(
    @Param('fieldGroupId', ParseUUIDPipe) fieldGroupId: UUID,
    @ActivePerson('sub') ownerId: UUID,
  ) {
    return this.fieldGroupService.delete(fieldGroupId, ownerId);
  }

  @ApiOperation({
    summary: 'get field group in facility (role: none)',
  })
  @Get(':facilityId')
  @AuthRoles(AuthRoleEnum.NONE)
  public getByFacilityId(@Param('facilityId', ParseUUIDPipe) facilityId: UUID) {
    return this.fieldGroupService.getByFacilityId(facilityId);
  }
}
