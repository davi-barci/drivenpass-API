import { Controller, Body, Delete, UseGuards } from '@nestjs/common';
import { EraseService } from './erase.service';
import { AuthGuard } from '../auth/auth.guard';
import { JwtPayload } from 'src/auth/entities/auth.entity';
import { User } from '../decorators/user.decorator';
import { EraseDto } from './dto/create-erase.dto';

@UseGuards(AuthGuard)
@Controller('erase')
export class EraseController {
  constructor(private readonly eraseService: EraseService) {}

  @Delete()
  delete(@Body() erase: EraseDto, @User() userAuth: JwtPayload) {
    return this.eraseService.delete(erase, userAuth);
  }
}
