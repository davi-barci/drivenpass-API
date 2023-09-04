import { Module } from '@nestjs/common';
import { CardsService } from './cards.service';
import { CardsController } from './cards.controller';
import { CardsRepository } from './cards.repository';
import { CryptrService } from 'src/utils/encryption.utils';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET,
    }),
  ],
  controllers: [CardsController],
  providers: [CardsService, CardsRepository, CryptrService],
})
export class CardsModule {}
