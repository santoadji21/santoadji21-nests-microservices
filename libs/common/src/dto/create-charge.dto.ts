import { Type } from 'class-transformer';
import { IsNumber } from 'class-validator';
import { CardDto } from './card.dto';

export class CreateChargeDto {
  @Type(() => CardDto)
  card?: CardDto;

  @IsNumber()
  amount: number;
}
