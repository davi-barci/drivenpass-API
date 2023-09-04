import { ConflictException, Injectable } from '@nestjs/common';
import { CreateNoteDto } from './dto/create-note.dto';
import { NotesRepository } from './notes.repository';
import { User } from '@prisma/client';
import { CryptrService } from '../utils/encryption.utils';

@Injectable()
export class NotesService {
  constructor(
    private readonly notesRepository: NotesRepository,
    private readonly cryptrService: CryptrService,
  ) {}

  async create(newNote: CreateNoteDto, user: User) {
    const note = await this.notesRepository.findByTitle(newNote.title, user.id);

    if (note) throw new ConflictException();

    const encryptedText = this.cryptrService.encrypt(newNote.text);

    return await this.notesRepository.create(
      { ...newNote, text: encryptedText },
      user.id,
    );
  }
}
