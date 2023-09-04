import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtPayload } from 'src/auth/entities/auth.entity';
import { EraseRepository } from './erase.repository';
import * as bcrypt from 'bcrypt';
import { EraseDto } from './dto/create-erase.dto';

@Injectable()
export class EraseService {
  constructor(private readonly eraseRepository: EraseRepository) {}

  async delete(erase: EraseDto, userAuth: JwtPayload) {
    const user = await this.eraseRepository.findUserById(userAuth.id);

    const password = await bcrypt.compare(erase.password, user.password);

    if (!password) throw new UnauthorizedException();

    return await this.eraseRepository.delete(userAuth.id);
  }
}
