import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class AddCard {
  @IsNotEmpty()
  @ApiProperty()
  name: string;

  @IsNotEmpty()
  @ApiProperty()
  // @IsInt()
  // @Min(40000)
  // @Max(1000000)
  amount: number;
}

export class MoneyToCard {
  @IsNotEmpty()
  @ApiProperty()
  name: string;

  @IsNotEmpty()
  @ApiProperty()
  // @IsInt()
  // @Min(40000)
  // @Max(1000000)
  amount: number;
}
