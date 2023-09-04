import {
  Controller,
  Post,
  Body,
  UseGuards,
  Get,
  Param,
  Delete,
} from '@nestjs/common';
import { NotesService } from './notes.service';
import { CreateNoteDto } from './dto/create-note.dto';
import { AuthGuard } from '../auth/auth.guard';
import { User } from '../decorators/user.decorator';
import { JwtPayload } from 'src/auth/entities/auth.entity';
import { User as UserType } from '@prisma/client';
import {
  ApiTags,
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
} from '@nestjs/swagger';

@UseGuards(AuthGuard)
@Controller('notes')
@ApiTags('Notes')
@ApiBearerAuth()
export class NotesController {
  constructor(private readonly notesService: NotesService) {}

  @Post()
  @ApiOperation({ summary: 'Cria uma nova nota' })
  @ApiBody({ type: CreateNoteDto })
  @ApiResponse({ status: 201, description: 'Nota criada com sucesso' })
  create(@Body() newNote: CreateNoteDto, @User() userAuth: UserType) {
    return this.notesService.create(newNote, userAuth);
  }

  @Get()
  @ApiOperation({ summary: 'Lista todas as notas do usuário autenticado' })
  @ApiResponse({ status: 200, description: 'Retorna a lista de notas' })
  findAll(@User() userAuth: JwtPayload) {
    return this.notesService.findAll(userAuth);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtém uma nota pelo ID' })
  @ApiParam({ name: 'id', type: 'number', description: 'ID da nota' })
  @ApiResponse({ status: 200, description: 'Retorna uma nota pelo ID' })
  findOne(@Param('id') id: string, @User() userAuth: JwtPayload) {
    return this.notesService.findOne(+id, userAuth);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Exclui uma nota pelo ID' })
  @ApiParam({ name: 'id', type: 'number', description: 'ID da nota' })
  @ApiResponse({ status: 200, description: 'Nota excluída com sucesso' })
  delete(@Param('id') id: string, @User() userAuth: JwtPayload) {
    return this.notesService.delete(+id, userAuth);
  }
}
