import {
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CredentialsRepository } from './credentials.repository';
import { CredentialDto } from './dto/create-credential.dto';
import { Credential, User } from '@prisma/client';
import { CryptrService } from '../utils/encryption.utils';
import { JwtPayload } from '../auth/entities/auth.entity';

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

  async findAll(userAuth: JwtPayload) {
    const userCredentials = await this.credentialsRepository.findAll(
      userAuth.id,
    );

    const userCredentialsDecrypted = await Promise.all(
      userCredentials.map(async (credential: Credential) => {
        const password = this.cryptrService.decrypt(credential.password);
        return { ...credential, password };
      }),
    );

    return userCredentialsDecrypted;
  }

  async findOne(id: number, userAuth: JwtPayload) {
    const userCredential = await this.credentialsRepository.findById(id);

    if (!userCredential) throw new NotFoundException();

    if (userCredential.userId !== userAuth.id) {
      throw new ForbiddenException();
    }

    const password = this.cryptrService.decrypt(userCredential.password);
    return { ...userCredential, password };
  }

  async delete(id: number, userAuth: JwtPayload) {
    const userCredential = await this.credentialsRepository.findById(id);

    if (!userCredential) throw new NotFoundException();

    if (userCredential.userId !== userAuth.id) {
      throw new ForbiddenException();
    }

    return await this.credentialsRepository.delete(
      userAuth.id,
      userCredential.title,
    );
  }
}
