import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateNoteDto } from './dto/create-note.dto';
import { Note } from '@prisma/client';

@Injectable()
export class NotesRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(newNote: CreateNoteDto, userId: number): Promise<Note> {
    return await this.prisma.note.create({
      data: {
        userId: userId,
        title: newNote.title,
        text: newNote.text,
      },
    });
  }

  async findByTitle(title: string, userId: number) {
    return await this.prisma.note.findUnique({
      where: { userId_title: { title, userId } },
    });
  }
}
