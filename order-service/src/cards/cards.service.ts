import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { AddCard, MoneyToCard } from './cards.dto';
import { CardRepository } from './cards.repository';
import { Request } from 'express';
import { Cards } from './cards.entity';
@Injectable()
export class CardsService {
  constructor(private cardRepository: CardRepository) {}
  async addCard(addCard: AddCard, req: Request) {
    const user = req.user;
    // const { id } = user;
    const card = await this.cardRepository.findOneByName(
      user['id'],
      addCard.name,
    );

    if (card) {
      throw new ConflictException();
    }
    const newCard = await this.cardRepository.addCard(addCard, user['id']);
    return newCard;
  }

  async moneyToCard(moneyToCard: MoneyToCard, req: Request) {
    const findCard: any = await this.cardRepository.findOneByName(
      req.user['id'],
      moneyToCard.name,
    );
    if (!findCard) {
      throw new NotFoundException();
    }
    const newUpdate = await this.cardRepository.moneyToCard(
      moneyToCard,
      req.user['id'],
      findCard.amount,
    );

    return newUpdate;
  }
}
