import { Injectable } from '@nestjs/common';
import { CreateSignUpDto } from '../auth/dto/signup.dto';
import { PrismaService } from '../prisma/prisma.service';
import { User } from '@prisma/client';

@Injectable()
export class UsersRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(newUser: CreateSignUpDto): Promise<User> {
    return await this.prisma.user.create({
      data: newUser,
    });
  }

  async findUserByEmail(email: string): Promise<User> {
    return await this.prisma.user.findUnique({
      where: {
        email: email,
      },
    });
  }
}
