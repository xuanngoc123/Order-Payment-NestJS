import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CardsController } from './cards.controller';
import { CardRepository } from './cards.repository';
import { CardSchema } from './cards.schema';
import { CardsService } from './cards.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Card', schema: CardSchema }])],
  controllers: [CardsController],
  providers: [CardsService, CardRepository],
})
export class CardsModule {}
