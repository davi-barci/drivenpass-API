import { Controller, Post, Body, UseGuards, HttpStatus } from '@nestjs/common';
import { CredentialsService } from './credentials.service';
import { CredentialDto } from './dto/create-credential.dto';
import { AuthGuard } from '../auth/auth.guard';
import { User } from '@prisma/client';

@Controller('credentials')
@UseGuards(AuthGuard)
export class CredentialsController {
  constructor(private readonly credentialsService: CredentialsService) {}

  @Post()
  create(@Body() newCredential: CredentialDto, user: User) {
    return this.credentialsService.create(newCredential, user);
  }
}
