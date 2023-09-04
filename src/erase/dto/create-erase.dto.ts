import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class EraseDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Senha de confirmação para executar a operação de exclusão',
    example: 'SenhaSegura123!',
  })
  password: string;
}
