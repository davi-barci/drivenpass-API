import {
  Controller,
  Post,
  Body,
  UseGuards,
  Get,
  Param,
  Delete,
} from '@nestjs/common';
import { CardsService } from './cards.service';
import { AuthGuard } from '../auth/auth.guard';
import { JwtPayload } from 'src/auth/entities/auth.entity';
import { User } from '../decorators/user.decorator';
import { CardDto } from './dto/create-card.dto';
import { User as UserType } from '@prisma/client';
import {
  ApiTags,
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
} from '@nestjs/swagger';

@UseGuards(AuthGuard)
@Controller('cards')
@ApiTags('Cards')
@ApiBearerAuth()
export class CardsController {
  constructor(private readonly cardsService: CardsService) {}

  @Post()
  @ApiOperation({ summary: 'Cria um novo cartão' })
  @ApiBody({ type: CardDto })
  @ApiResponse({ status: 201, description: 'Cartão criado com sucesso' })
  create(@Body() newCard: CardDto, @User() userAuth: UserType) {
    return this.cardsService.create(newCard, userAuth);
  }

  @Get()
  @ApiOperation({ summary: 'Lista todos os cartões do usuário autenticado' })
  @ApiResponse({ status: 200, description: 'Retorna a lista de cartões' })
  findAll(@User() userAuth: JwtPayload) {
    return this.cardsService.findAll(userAuth);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtém um cartão pelo ID' })
  @ApiParam({ name: 'id', type: 'number', description: 'ID do cartão' })
  @ApiResponse({ status: 200, description: 'Retorna um cartão pelo ID' })
  findOne(@Param('id') id: string, @User() userAuth: JwtPayload) {
    return this.cardsService.findOne(+id, userAuth);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Exclui um cartão pelo ID' })
  @ApiParam({ name: 'id', type: 'number', description: 'ID do cartão' })
  @ApiResponse({ status: 200, description: 'Cartão excluído com sucesso' })
  delete(@Param('id') id: string, @User() userAuth: JwtPayload) {
    return this.cardsService.delete(+id, userAuth);
  }
}
