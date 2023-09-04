import {
  IsBoolean,
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

enum CardType {
  DEBIT = 'DEBIT',
  CREDIT = 'CREDIT',
  BOTH = 'BOTH',
}

export class CardDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(16)
  @MaxLength(16)
  @Matches(/^[0-9]+$/, { message: 'Only digits (0-9) are allowed.' })
  cardNumber: string;

  @IsNotEmpty()
  @IsString()
  cardHolder: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(3)
  @Matches(/^[0-9]+$/, { message: 'Only digits (0-9) are allowed.' })
  cvv: string;

  @IsDateString()
  expDate: Date;

  @IsNotEmpty()
  @IsString()
  password: string;

  @IsBoolean()
  isVirtual: boolean;

  @IsEnum(CardType)
  cardType: CardType;
}
