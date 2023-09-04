import {
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Card, User } from '@prisma/client';
import { CryptrService } from '../utils/encryption.utils';
import { CardDto } from './dto/create-card.dto';
import { CardsRepository } from './cards.repository';
import { JwtPayload } from 'src/auth/entities/auth.entity';

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

  async findAll(userAuth: JwtPayload) {
    const userCards = await this.cardsRepository.findAll(userAuth.id);

    const userCardsDecrypted = await Promise.all(
      userCards.map(async (card: Card) => {
        const password = this.cryptrService.decrypt(card.password);
        const CVV = this.cryptrService.decrypt(card.CVV);
        return { ...card, password, CVV };
      }),
    );

    return userCardsDecrypted;
  }

  async findOne(id: number, userAuth: JwtPayload) {
    const userCard = await this.cardsRepository.findById(id);

    if (!userCard) throw new NotFoundException();

    if (userCard.userId !== userAuth.id) {
      throw new ForbiddenException();
    }

    const password = this.cryptrService.decrypt(userCard.password);
    const CVV = this.cryptrService.decrypt(userCard.CVV);
    return { ...userCard, password, CVV };
  }
}
