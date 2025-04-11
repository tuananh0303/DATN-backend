import { Body, Controller, Get, Post } from '@nestjs/common';
import { SportService } from './sport.service';
import { CreateSportDto } from './dtos/requests/create-sport.dto';
import { AuthRoles } from 'src/auths/decorators/auth-role.decorator';
import { AuthRoleEnum } from 'src/auths/enums/auth-role.enum';
import { ApiOperation } from '@nestjs/swagger';

@Controller('sport')
export class SportController {
  constructor(
    /**
     * inject SportService
     */
    private readonly sportService: SportService,
  ) {}

  @ApiOperation({
    summary: 'create sport (role: admin)',
  })
  @Post()
  @AuthRoles(AuthRoleEnum.ADMIN)
  public create(@Body() createSportDto: CreateSportDto) {
    return this.sportService.create(createSportDto);
  }

  @ApiOperation({
    summary: 'get all sport (role: none)',
  })
  @Get('all')
  @AuthRoles(AuthRoleEnum.NONE)
  public getAll() {
    return this.sportService.getAll();
  }
}
