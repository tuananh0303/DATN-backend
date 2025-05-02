import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
} from '@nestjs/common';
import { PlaymateService } from './playmate.service';
import { ApiOperation } from '@nestjs/swagger';
import { CreatePlaymateDto } from './dtos/create-playmate.dto';
import { ActivePerson } from 'src/auths/decorators/active-person.decorator';
import { UUID } from 'crypto';
import { AuthRoles } from 'src/auths/decorators/auth-role.decorator';
import { AuthRoleEnum } from 'src/auths/enums/auth-role.enum';
import { UpdatePlaymateDto } from './dtos/update-playmate.dto';
import { AcceptParticipantPlaymate } from './dtos/accept-participant-playmate.dto';

@Controller('playmate')
export class PlaymateController {
  constructor(
    /**
     * inject PlaymateService
     */
    private readonly playmateService: PlaymateService,
  ) {}

  @ApiOperation({
    summary: 'create a playmate (role: player)',
  })
  @Post('create')
  @AuthRoles(AuthRoleEnum.PLAYER)
  public create(
    @Body() createPlaymateDto: CreatePlaymateDto,
    @ActivePerson('sub') playerId: UUID,
  ) {
    return this.playmateService.create(createPlaymateDto, playerId);
  }

  @ApiOperation({
    summary: 'Update playmate (role: player)',
  })
  @Put('update')
  @AuthRoles(AuthRoleEnum.PLAYER)
  public update(
    @Body() updatePlaymateDto: UpdatePlaymateDto,
    @ActivePerson('sub') playerId: UUID,
  ) {
    return this.playmateService.update(updatePlaymateDto, playerId);
  }

  @ApiOperation({
    summary: 'register a playmate post (role: player)',
  })
  @Post(':playmateId/register')
  @AuthRoles(AuthRoleEnum.PLAYER)
  public register(
    @Param('playmateId', ParseUUIDPipe) playmateId: UUID,
    @ActivePerson('sub') playerId: UUID,
  ) {
    return this.playmateService.register(playmateId, playerId);
  }

  @ApiOperation({
    summary: 'get many playmate post (role: none)',
  })
  @Get()
  @AuthRoles(AuthRoleEnum.NONE)
  public getMany() {
    return this.playmateService.getMany();
  }

  @ApiOperation({
    summary: 'get detail of playmate post (post: none)',
  })
  @Get(':playmateId')
  @AuthRoles(AuthRoleEnum.NONE)
  public getDetail(@Param('playmateId', ParseUUIDPipe) playmateId: UUID) {
    return this.playmateService.getDetail(playmateId);
  }

  @ApiOperation({
    summary: 'accept player to playmate (role: player)',
  })
  @Put('switch-accept')
  @AuthRoles(AuthRoleEnum.PLAYER)
  public switchAccept(
    @Body() acceptParticipantPlaymate: AcceptParticipantPlaymate,
    @ActivePerson('sub') playerId: UUID,
  ) {
    return this.playmateService.switchAccept(
      acceptParticipantPlaymate,
      playerId,
    );
  }
}
