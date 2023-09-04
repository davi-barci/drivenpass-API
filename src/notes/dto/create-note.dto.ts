import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateNoteDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Título da nota',
    example: 'Minha Nota',
  })
  title: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Texto da nota',
    example: 'Conteúdo da minha nota...',
  })
  text: string;
}
