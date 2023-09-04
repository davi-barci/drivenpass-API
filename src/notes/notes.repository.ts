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

  async findByTitle(title: string, userId: number): Promise<Note> {
    return await this.prisma.note.findUnique({
      where: { userId_title: { title, userId } },
    });
  }

  findAll(userId: number): Promise<Note[]> {
    return this.prisma.note.findMany({
      where: {
        userId: userId,
      },
    });
  }

  findById(id: number): Promise<Note> {
    return this.prisma.note.findFirst({
      where: {
        id: id,
      },
    });
  }
}
