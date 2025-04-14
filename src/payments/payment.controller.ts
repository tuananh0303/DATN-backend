import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Put,
  Req,
} from '@nestjs/common';
import { PaymentService } from './payment.service';
import { ApiOperation } from '@nestjs/swagger';
import { UUID } from 'crypto';
import { PaymentDto } from './dtos/requests/payment.dto';
import { ActivePerson } from 'src/auths/decorators/active-person.decorator';
import { AuthRoles } from 'src/auths/decorators/auth-role.decorator';
import { AuthRoleEnum } from 'src/auths/enums/auth-role.enum';
import { Request } from 'express';

@Controller('payment')
export class PaymentController {
  constructor(
    /**
     * inject PaymentService
     */
    private readonly paymentService: PaymentService,
  ) {}

  @ApiOperation({
    summary: 'payment for booking (role: player)',
  })
  @Put(':paymentId')
  @AuthRoles(AuthRoleEnum.PLAYER)
  public payment(
    @Param('paymentId', ParseUUIDPipe) paymentId: UUID,
    @Body() paymentDto: PaymentDto,
    @ActivePerson('sub') playerId: UUID,
    @Req() req: Request,
  ) {
    return this.paymentService.payment(paymentId, paymentDto, playerId, req);
  }

  @ApiOperation({
    summary: 'verify ipn response',
  })
  @Get('ipn')
  @AuthRoles(AuthRoleEnum.NONE)
  public ipn(@Req() req: Request) {
    return this.paymentService.ipn(req);
  }
}
