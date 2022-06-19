import { Body, Controller, Post, Put, Req, UseGuards } from '@nestjs/common';
import { AddCard, MoneyToCard } from './cards.dto';
import { CardsService } from './cards.service';
import { Request } from 'express';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
@Controller('cards')
@ApiTags('Card')
@UseGuards(JwtAuthGuard)
export class CardsController {
  constructor(private readonly cardsService: CardsService) {}

  @Post()
  addCard(@Body() addCard: AddCard, @Req() req: Request) {
    return this.cardsService.addCard(addCard, req);
  }

  @Put()
  moneyToCard(@Body() moneyToCard: MoneyToCard, @Req() req: Request) {
    return this.cardsService.moneyToCard(moneyToCard, req);
  }
}
