import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateItemDto } from '../pantry/dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { PantryEntity } from '../entities/pantry.entity';
import { ItemEntity } from '../entities/item.entity';

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

    const item = new ItemEntity();
    item.name = createItemDto.name;
    item.expiration = new Date(createItemDto.expiration);
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

  updateItem(item: CreateItemDto, userId: string, pantryId: string, itemId: string) {




    return Promise.resolve(undefined);
  }
}
