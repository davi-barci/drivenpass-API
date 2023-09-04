import {
  Controller,
  Post,
  Body,
  UseGuards,
  Get,
  Param,
  Delete,
} from '@nestjs/common';
import { CredentialsService } from './credentials.service';
import { CredentialDto } from './dto/create-credential.dto';
import { AuthGuard } from '../auth/auth.guard';
import { User as UserType } from '@prisma/client';
import { JwtPayload } from 'src/auth/entities/auth.entity';
import { User } from '../decorators/user.decorator';
import {
  ApiTags,
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
} from '@nestjs/swagger';

@Controller('credentials')
@UseGuards(AuthGuard)
@ApiTags('Credentials')
@ApiBearerAuth()
export class CredentialsController {
  constructor(private readonly credentialsService: CredentialsService) {}

  @Post()
  @ApiOperation({ summary: 'Cria uma nova credencial' })
  @ApiBody({ type: CredentialDto })
  @ApiResponse({ status: 201, description: 'Credencial criada com sucesso' })
  create(@Body() newCredential: CredentialDto, @User() user: UserType) {
    return this.credentialsService.create(newCredential, user);
  }

  @Get()
  @ApiOperation({
    summary: 'Lista todas as credenciais do usuário autenticado',
  })
  @ApiResponse({ status: 200, description: 'Retorna a lista de credenciais' })
  findAll(@User() userAuth: JwtPayload) {
    return this.credentialsService.findAll(userAuth);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtém uma credencial pelo ID' })
  @ApiParam({ name: 'id', type: 'number', description: 'ID da credencial' })
  @ApiResponse({ status: 200, description: 'Retorna uma credencial pelo ID' })
  findOne(@Param('id') id: string, @User() userAuth: JwtPayload) {
    return this.credentialsService.findOne(+id, userAuth);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Exclui uma credencial pelo ID' })
  @ApiParam({ name: 'id', type: 'number', description: 'ID da credencial' })
  @ApiResponse({ status: 200, description: 'Credencial excluída com sucesso' })
  delete(@Param('id') id: string, @User() userAuth: JwtPayload) {
    return this.credentialsService.delete(+id, userAuth);
  }
}
