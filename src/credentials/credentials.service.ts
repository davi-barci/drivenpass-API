import { ConflictException, Injectable } from '@nestjs/common';
import { CredentialsRepository } from './credentials.repository';
import { CredentialDto } from './dto/create-credential.dto';
import { User } from '@prisma/client';
import { CryptrService } from '../utils/encryption.utils';

@Injectable()
export class CredentialsService {
  constructor(
    private readonly credentialsRepository: CredentialsRepository,
    private readonly cryptrService: CryptrService,
  ) {}

  async create(newCredential: CredentialDto, user: User) {
    const credential = await this.credentialsRepository.findByTitle(
      newCredential.title,
      user.id,
    );

    if (credential) throw new ConflictException();

    const encryptedPassword = this.cryptrService.encrypt(
      newCredential.password,
    );
    return await this.credentialsRepository.create(
      { ...newCredential, password: encryptedPassword },
      user.id,
    );
  }
}
