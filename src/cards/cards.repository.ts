import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Card } from '@prisma/client';
import { CardDto } from './dto/create-card.dto';

@Injectable()
export class CardsRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(newCard: CardDto, userId: number): Promise<Card> {
    return await this.prisma.card.create({
      data: {
        userId: userId,
        title: newCard.title,
        cardHolder: newCard.cardHolder,
        cardNumber: newCard.cardNumber,
        CVV: newCard.cvv,
        expDate: new Date(newCard.expDate),
        password: newCard.password,
        isVirtual: newCard.isVirtual,
        cardType: newCard.cardType,
      },
    });
  }

  async findByTitle(title: string, userId: number): Promise<Card> {
    return await this.prisma.card.findUnique({
      where: { userId_title: { title, userId } },
    });
  }

  findAll(userId: number): Promise<Card[]> {
    return this.prisma.card.findMany({
      where: {
        userId: userId,
      },
    });
  }

  findById(id: number): Promise<Card> {
    return this.prisma.card.findFirst({
      where: {
        id: id,
      },
    });
  }

  async delete(userId: number, title: string): Promise<Card> {
    return await this.prisma.card.delete({
      where: {
        userId_title: { title, userId },
      },
    });
  }
}
