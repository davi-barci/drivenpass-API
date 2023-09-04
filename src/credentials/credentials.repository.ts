import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CredentialDto } from './dto/create-credential.dto';
import { Credential } from '@prisma/client';

@Injectable()
export class CredentialsRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(
    newCredential: CredentialDto,
    userId: number,
  ): Promise<Credential> {
    return await this.prisma.credential.create({
      data: {
        userId: userId,
        title: newCredential.title,
        url: newCredential.url,
        username: newCredential.username,
        password: newCredential.password,
      },
    });
  }

  async findByTitle(title: string, userId: number): Promise<Credential> {
    return await this.prisma.credential.findUnique({
      where: { userId_title: { title, userId } },
    });
  }
}
