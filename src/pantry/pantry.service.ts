import {
  forwardRef,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
} from '@nestjs/common';

import { PantryEntity } from '../entities/pantry.entity';
import {
  CreatePantryResponse,
  DeletePantryResponse,
  FetchPantryByIdResponse,
  FetchShortPantriesResponse,
  ShortPantry,
  UpdatePantryResponse,
} from '../interfaces/pantry/pantry';
import { ItemEntity } from '../entities/item.entity';
import { ItemService } from '../item/item.service';
import { UserEntity } from '../entities/user.entity';
@Injectable()
export class PantryService {
  constructor(
    @Inject(forwardRef(() => ItemService)) private itemService: ItemService,
  ) {}

  async fetchShortPantries(
    userId: string,
  ): Promise<FetchShortPantriesResponse> {
    const results = await PantryEntity.findBy({
      user: {
        id: userId,
      },
    });

    const pantries = await Promise.all(
      results.map(async (pantry) => {
        return {
          id: pantry.id,
          name: pantry.name,
          stats: await this.itemService.createStats(pantry.id),
        } as ShortPantry;
      }),
    );

    return { message: 'Succeed', data: pantries };
  }

  async fetchCompletePantryById(
    userId: string,
    pantryId: string,
  ): Promise<FetchPantryByIdResponse> {
    const data = await PantryEntity.findOneBy({
      id: pantryId,
      user: {
        id: userId,
      },
    });

    if (data === null)
      throw new HttpException('The pantry not found', HttpStatus.NOT_FOUND);

    return {
      message: 'Succeed',
      data,
    };
  }

  async createPantry(
    userId: string,
    name: string,
  ): Promise<CreatePantryResponse> {
    const [user] = await UserEntity.find({
      where: {
        id: userId,
      },
    });

    if (!user)
      throw new HttpException('User was not found.', HttpStatus.BAD_REQUEST);

    const newPantry = new PantryEntity();
    newPantry.user = user;
    newPantry.name = name;
    await newPantry.save();
    user.pantries.push(newPantry);
    await user.save();
    return {
      pantryId: newPantry.id,
      message: 'The pantry has been created.',
    };
  }

  async updatePantry(
    userId: string,
    pantryId: string,
    newName: string,
  ): Promise<UpdatePantryResponse> {
    const pantry = await PantryEntity.findOneBy({
      user: {
        id: userId,
      },
      id: pantryId,
    });
    if (pantry === null)
      throw new HttpException(
        'The pantry was not found.',
        HttpStatus.BAD_REQUEST,
      );
    pantry.name = newName;
    await pantry.save();

    return {
      message: 'Succeed',
      data: pantry,
    };
  }
  async deletePantry(
    userId: string,
    pantryId: string,
  ): Promise<DeletePantryResponse> {
    const user = await UserEntity.findOneBy({ id: userId });
    if (!user)
      throw new HttpException('The user was not found.', HttpStatus.NOT_FOUND);
    const pantry = await PantryEntity.findOneBy({
      id: pantryId,
      user: { id: userId },
    });
    if (pantry === null)
      throw new HttpException(
        'The pantry was not found.',
        HttpStatus.BAD_REQUEST,
      );

    await ItemEntity.createQueryBuilder()
      .where('userId = :id AND pantryId = :pantryId', { id: userId, pantryId })
      .delete()
      .execute();

    await pantry.remove();

    return {
      message: 'Succeed',
    };
  }
}
