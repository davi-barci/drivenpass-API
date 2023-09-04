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

@UseGuards(AuthGuard)
@Controller('notes')
export class NotesController {
  constructor(private readonly notesService: NotesService) {}

  @Post()
  create(@Body() newNote: CreateNoteDto, @User() userAuth: UserType) {
    return this.notesService.create(newNote, userAuth);
  }

  @Get()
  findAll(@User() userAuth: JwtPayload) {
    return this.notesService.findAll(userAuth);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @User() userAuth: JwtPayload) {
    return this.notesService.findOne(+id, userAuth);
  }

  @Delete(':id')
  delete(@Param('id') id: string, @User() userAuth: JwtPayload) {
    return this.notesService.delete(+id, userAuth);
  }
}
