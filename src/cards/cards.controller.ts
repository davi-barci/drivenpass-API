import {
  Controller,
  Post,
  Body,
  UseGuards,
  Get,
  Param,
  Delete,
} from '@nestjs/common';
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

  @Get()
  findAll(@User() userAuth: JwtPayload) {
    return this.cardsService.findAll(userAuth);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @User() userAuth: JwtPayload) {
    return this.cardsService.findOne(+id, userAuth);
  }

  @Delete(':id')
  delete(@Param('id') id: string, @User() userAuth: JwtPayload) {
    return this.cardsService.delete(+id, userAuth);
  }
}
