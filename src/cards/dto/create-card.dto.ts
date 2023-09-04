import { ApiProperty } from '@nestjs/swagger';
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
  @ApiProperty({
    description: 'Título do cartão',
    example: 'Meu Cartão',
  })
  title: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(16)
  @MaxLength(16)
  @Matches(/^[0-9]+$/, { message: 'Apenas dígitos (0-9) são permitidos.' })
  @ApiProperty({
    description: 'Número do cartão (16 dígitos)',
    example: '1234567890123456',
  })
  cardNumber: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: 'Nome do titular do cartão',
    example: 'João da Silva',
  })
  cardHolder: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(3)
  @Matches(/^[0-9]+$/, { message: 'Apenas dígitos (0-9) são permitidos.' })
  @ApiProperty({
    description: 'CVV (Código de Segurança) do cartão (3 dígitos)',
    example: '123',
  })
  cvv: string;

  @IsDateString()
  @ApiProperty({
    description: 'Data de validade do cartão (formato: YYYY-MM)',
    example: '2030-12',
  })
  expDate: Date;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: 'Senha do cartão',
    example: 'SenhaSegura123!',
  })
  password: string;

  @IsBoolean()
  @ApiProperty({
    description: 'É um cartão virtual?',
    example: true,
  })
  isVirtual: boolean;

  @IsEnum(CardType)
  @ApiProperty({
    description: 'Tipo do cartão (DEBIT, CREDIT ou BOTH)',
    enum: CardType,
    example: 'CREDIT',
  })
  cardType: CardType;
}
