import {
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { User } from '@prisma/client';
import { CryptrService } from '../utils/encryption.utils';
import { CardDto } from './dto/create-card.dto';
import { CardsRepository } from './cards.repository';

@Injectable()
export class CardsService {
  constructor(
    private readonly cardsRepository: CardsRepository,
    private readonly cryptrService: CryptrService,
  ) {}

  async create(newCard: CardDto, user: User) {
    const card = await this.cardsRepository.findByTitle(newCard.title, user.id);

    if (card) throw new ConflictException();

    const encryptedPassword = this.cryptrService.encrypt(newCard.password);
    const encryptedCVV = this.cryptrService.encrypt(newCard.cvv);
    return await this.cardsRepository.create(
      { ...newCard, password: encryptedPassword, cvv: encryptedCVV },
      user.id,
    );
  }
}
