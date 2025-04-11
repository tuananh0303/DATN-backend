import { Injectable } from '@nestjs/common';
import { IAdditionalServiceService } from './iadditional-service.service';

@Injectable()
export class AdditionalServiceService implements IAdditionalServiceService {}
