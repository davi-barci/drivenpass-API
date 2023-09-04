import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsUrl } from 'class-validator';

export class CredentialDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Título da credencial',
    example: 'Minha Credencial',
  })
  title: string;

  @IsUrl()
  @IsNotEmpty()
  @ApiProperty({
    description: 'URL da credencial',
    example: 'https://www.exemplo.com',
  })
  url: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Nome de usuário da credencial',
    example: 'usuario123',
  })
  username: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Senha da credencial',
    example: 'SenhaSegura123!',
  })
  password: string;
}
