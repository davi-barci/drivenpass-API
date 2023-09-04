import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsStrongPassword,
} from 'class-validator';

export class SignUpDto {
  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Endereço de e-mail do usuário',
    example: 'usuario@example.com',
  })
  email: string;

  @IsStrongPassword({
    minLength: 10,
    minLowercase: 1,
    minUppercase: 1,
    minSymbols: 1,
    minNumbers: 1,
  })
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: 'Senha do usuário',
    example: 'SenhaSegura123!',
  })
  password: string;
}

export class CreateSignUpDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: 'Endereço de e-mail do usuário',
    example: 'usuario@example.com',
  })
  email: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: 'Senha do usuário',
    example: 'SenhaSegura123!',
  })
  password: string;
}
