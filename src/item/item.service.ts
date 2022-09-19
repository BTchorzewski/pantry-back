import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateItemDto } from '../pantry/dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { PantryEntity } from '../entities/pantry.entity';
import { ItemEntity } from '../entities/item.entity';
import { UserEntity } from '../entities/user.entity';

@Injectable()
export class ItemService {
  async create(createItemDto: CreateItemDto, userId: string, pantryId: string) {
    const pantry = await PantryEntity.findOneBy({
      id: pantryId,
      user: {
        id: userId,
      },
    });

    if (pantry === null)
      throw new HttpException('The pantry not found.', HttpStatus.NO_CONTENT);

    const user = await UserEntity.findOneBy({
      id: userId,
    });

    if (user === null)
      throw new HttpException('The pantry not found.', HttpStatus.NO_CONTENT);

    const item = new ItemEntity();
    item.name = createItemDto.name;
    item.expiration = new Date(createItemDto.expiration);
    item.user = user;
    await item.save();
    pantry.items.push(item);
    await pantry.save();

    return {
      message: 'Succeed',
      data: item,
    };
  }

  findAll() {
    return `This action returns all item`;
  }

  findOne(id: number) {
    return `This action returns a #${id} item`;
  }

  update(id: number, updateItemDto: UpdateItemDto) {
    return `This action updates a #${id} item`;
  }

  async updateItem(
    item: CreateItemDto,
    userId: string,
    pantryId: string,
    itemId: string,
  ) {
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
      message: 'succeed',
      data: fetchedItem,
    };
  }
}
