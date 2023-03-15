import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateItemDto } from '../pantry/dto/create-item.dto';
import { PantryEntity } from '../entities/pantry.entity';
import { ItemEntity } from '../entities/item.entity';
import { UserEntity } from '../entities/user.entity';
import {
  CreatedItemResponse,
  DeletedItemResponse,
  GetItemResponse,
  Stats,
  UpdateItemResponse,
} from '../types';
import * as moment from 'moment';
import { Raw } from 'typeorm';
import { ItemModel } from '../swagger/models/pantry';
@Injectable()
export class ItemService {
  async create(
    { name, expiration }: CreateItemDto,
    userId: string,
    pantryId: string,
  ) {
    if (moment(expiration).isBefore(moment()))
      throw new HttpException(
        'The expiration date is invalid.',
        HttpStatus.BAD_REQUEST,
      );

    const pantry = await PantryEntity.findOneBy({
      id: pantryId,
      user: {
        id: userId,
      },
    });

    if (!pantry)
      throw new HttpException('The pantry not found.', HttpStatus.NOT_FOUND);

    const user = await UserEntity.findOneBy({
      id: userId,
    });

    if (!user)
      throw new HttpException('The user not found.', HttpStatus.NOT_FOUND);

    const item = new ItemEntity();
    item.name = name;
    item.expiration = new Date(expiration);
    item.user = user;
    await item.save();
    pantry.items.push(item);
    await pantry.save();

    return {
      message: 'Succeed',
      data: {
        id: item.id,
        name: item.name,
        expiration: item.expiration,
      } as CreatedItemResponse,
    };
  }

  async findOne(itemId: string, userId: string): Promise<GetItemResponse> {
    const item = await ItemEntity.findOneBy({
      id: itemId,
      user: { id: userId },
    });

    if (!item)
      throw new HttpException('The item not found.', HttpStatus.NOT_FOUND);

    const { id, name, expiration } = item;
    return {
      id,
      name,
      expiration,
    };
  }

  async updateItem(
    item: CreateItemDto,
    userId: string,
    itemId: string,
  ): Promise<UpdateItemResponse> {
    const fetchedItem = await ItemEntity.findOneBy({
      id: itemId,
      user: {
        id: userId,
      },
    });

    if (!fetchedItem)
      throw new HttpException('the item is not found.', HttpStatus.NOT_FOUND);

    fetchedItem.name = item.name;
    fetchedItem.expiration = item.expiration;
    await fetchedItem.save();

    return {
      id: fetchedItem.id,
      name: fetchedItem.name,
      expiration: fetchedItem.expiration,
    };
  }

  async deleteItemById(
    itemId: string,
    userId: string,
  ): Promise<DeletedItemResponse> {
    const results = await ItemEntity.createQueryBuilder()
      .where('id = :itemId AND userId = :userId', { itemId, userId })
      .delete()
      .execute();

    if (!results.affected)
      throw new HttpException('the item is not found.', HttpStatus.NOT_FOUND);

    return {
      message: 'The item has been deleted.',
    };
  }
  async countTotalItemsInPantry(pantryId: string): Promise<number> {
    return await ItemEntity.countBy({ pantry: { id: pantryId } });
  }

  async countFreshItemsInPantry(pantryId: string): Promise<number> {
    return await ItemEntity.countBy({
      pantry: { id: pantryId },
      expiration: Raw((expiration) => `DATEDIFF(${expiration}, NOW()) > 7`),
    });
  }
  async countSoonExpiredItemsInPantry(pantryId: string): Promise<number> {
    return await ItemEntity.countBy({
      pantry: { id: pantryId },
      expiration: Raw(
        (expiration) => `DATEDIFF(${expiration}, NOW()) BETWEEN 1 AND 7`,
      ),
    });
  }
  async countExpiredItemsInPantry(pantryId: string): Promise<number> {
    return await ItemEntity.countBy({
      pantry: { id: pantryId },
      expiration: Raw((expiration) => `DATEDIFF(${expiration}, NOW()) < 1`),
    });
  }
  async createStats(pantryId: string): Promise<Stats> {
    return {
      total: await this.countTotalItemsInPantry(pantryId),
      fresh: await this.countFreshItemsInPantry(pantryId),
      expiredSoon: await this.countSoonExpiredItemsInPantry(pantryId),
      expired: await this.countExpiredItemsInPantry(pantryId),
    };
  }

  async getExpiredItemsInPantry(
    pantryId: string,
    userId: string,
  ): Promise<ItemModel[]> {
    const expiredItems = await ItemEntity.findBy({
      pantry: {
        id: pantryId,
      },
      user: {
        id: userId,
      },
      expiration: Raw((expiration) => `DATEDIFF(${expiration}, NOW()) < 1`),
    });
    return expiredItems;
  }
}
