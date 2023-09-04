import { Module } from '@nestjs/common';
import { CredentialsService } from './credentials.service';
import { CredentialsController } from './credentials.controller';
import { CredentialsRepository } from './credentials.repository';
import { CryptrService } from '../utils/encryption.utils';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET,
    }),
  ],
  controllers: [CredentialsController],
  providers: [CredentialsService, CredentialsRepository, CryptrService],
})
export class CredentialsModule {}
