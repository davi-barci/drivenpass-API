import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class SignInDto {
  @IsNotEmpty()
  @IsEmail()
  @ApiProperty({
    description: 'Endereço de e-mail do usuário',
    example: 'usuario@example.com',
  })
  email: string;

  @IsNotEmpty()
  @ApiProperty({
    description: 'Senha do usuário',
    example: 'SenhaSecreta123',
  })
  password: string;
}
