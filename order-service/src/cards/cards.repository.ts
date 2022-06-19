import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { AddCard, MoneyToCard } from './cards.dto';
import { Cards } from './cards.entity';
import { Card, CardDocument } from './cards.schema';

@Injectable()
export class CardRepository {
  constructor(@InjectModel(Card.name) private cardModel: Model<CardDocument>) {}

  findOneByName(idUser: any, nameCard: string) {
    const objectId = new mongoose.Types.ObjectId(idUser);
    return this.cardModel.findOne({ user: objectId, name: nameCard });
  }

  addCard(addCard: AddCard, userId) {
    return this.cardModel.create({ ...addCard, user: userId });
  }

  async moneyToCard(moneyToCard: MoneyToCard, userId: any, oldAmount: number) {
    const newAmount = Number(oldAmount) + Number(moneyToCard.amount);
    await this.cardModel.updateOne(
      { user: userId, name: moneyToCard.name },
      { amount: newAmount },
    );
    const card = await this.cardModel.findOne({
      user: userId,
      name: moneyToCard.name,
    });
    return card;
  }
}
