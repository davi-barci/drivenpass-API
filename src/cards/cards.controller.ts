import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { CardsService } from './cards.service';
import { AuthGuard } from '../auth/auth.guard';
import { JwtPayload } from 'src/auth/entities/auth.entity';
import { User } from '../decorators/user.decorator';
import { CardDto } from './dto/create-card.dto';
import { User as UserType } from '@prisma/client';

@UseGuards(AuthGuard)
@Controller('cards')
export class CardsController {
  constructor(private readonly cardsService: CardsService) {}

  @Post()
  create(@Body() newCard: CardDto, @User() userAuth: UserType) {
    return this.cardsService.create(newCard, userAuth);
  }
}
