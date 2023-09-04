import { Controller, Body, Delete, UseGuards } from '@nestjs/common';
import { EraseService } from './erase.service';
import { AuthGuard } from '../auth/auth.guard';
import { JwtPayload } from 'src/auth/entities/auth.entity';
import { User } from '../decorators/user.decorator';
import { EraseDto } from './dto/create-erase.dto';
import {
  ApiTags,
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiBody,
} from '@nestjs/swagger';

@UseGuards(AuthGuard)
@Controller('erase')
@ApiTags('Erase')
@ApiBearerAuth()
export class EraseController {
  constructor(private readonly eraseService: EraseService) {}

  @Delete()
  @ApiOperation({ summary: 'Exclui todos os dados do usuário' })
  @ApiBody({ type: EraseDto })
  @ApiResponse({ status: 200, description: 'Dados excluídos com sucesso' })
  delete(@Body() erase: EraseDto, @User() userAuth: JwtPayload) {
    return this.eraseService.delete(erase, userAuth);
  }
}
