import {
  Controller,
  Post,
  Body,
  UseGuards,
  HttpStatus,
  Get,
  Param,
} from '@nestjs/common';
import { CredentialsService } from './credentials.service';
import { CredentialDto } from './dto/create-credential.dto';
import { AuthGuard } from '../auth/auth.guard';
import { User as UserType } from '@prisma/client';
import { JwtPayload } from 'src/auth/entities/auth.entity';
import { User } from '../decorators/user.decorator';

@Controller('credentials')
@UseGuards(AuthGuard)
export class CredentialsController {
  constructor(private readonly credentialsService: CredentialsService) {}

  @Post()
  create(@Body() newCredential: CredentialDto, @User() user: UserType) {
    return this.credentialsService.create(newCredential, user);
  }

  @Get()
  findAll(@User() userAuth: JwtPayload) {
    return this.credentialsService.findAll(userAuth);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @User() userAuth: JwtPayload) {
    return this.credentialsService.findOne(+id, userAuth);
  }
}
