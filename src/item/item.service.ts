import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateItemDto } from '../pantry/dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { PantryEntity } from '../entities/pantry.entity';
import { ItemEntity } from '../entities/item.entity';
import { UserEntity } from '../user/entities/user.entity';
import {
  CreatedItemResponse,
  DeletedItemResponse,
  GetItemResponse,
  UpdateItemResponse,
  UpdatePantryResponse,
} from '../interfaces';
import * as moment from 'moment';
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
    pantryId: string,
    itemId: string,
  ): Promise<UpdateItemResponse> {
    const fetchedItem = await ItemEntity.findOneBy({
      id: itemId,
      user: {
        id: userId,
      },
    });

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
    await ItemEntity.createQueryBuilder()
      .where('id = :itemId AND userId = :userId', { itemId, userId })
      .delete()
      .execute();

    return {
      message: 'The item has been deleted.',
    };
  }
}
