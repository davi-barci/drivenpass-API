import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class EraseRepository {
  constructor(private readonly prisma: PrismaService) {}

  async delete(userId: number) {
    return this.prisma.$transaction([
      this.prisma.card.deleteMany({ where: { userId } }),
      this.prisma.credential.deleteMany({ where: { userId } }),
      this.prisma.note.deleteMany({ where: { userId } }),
      this.prisma.user.delete({ where: { id: userId } }),
    ]);
  }

  async findUserById(userId: number) {
    return await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
    });
  }
}
