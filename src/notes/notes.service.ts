import {
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateNoteDto } from './dto/create-note.dto';
import { NotesRepository } from './notes.repository';
import { Note, User } from '@prisma/client';
import { CryptrService } from '../utils/encryption.utils';
import { JwtPayload } from 'src/auth/entities/auth.entity';

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

  async findAll(userAuth: JwtPayload) {
    const userNotes = await this.notesRepository.findAll(userAuth.id);

    const userNotesDecrypted = await Promise.all(
      userNotes.map(async (note: Note) => {
        const text = this.cryptrService.decrypt(note.text);
        return { ...note, text };
      }),
    );

    return userNotesDecrypted;
  }

  async findOne(id: number, userAuth: JwtPayload) {
    const userNote = await this.notesRepository.findById(id);

    if (!userNote) throw new NotFoundException();

    if (userNote.userId !== userAuth.id) throw new ForbiddenException();

    const text = this.cryptrService.decrypt(userNote.text);
    return { ...userNote, text };
  }
}
