import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserEntity } from '../entities/user.entity';
import { PantryEntity } from '../entities/pantry.entity';
import {
  CreatePantryDto,
  DeletePantryDto,
  UpdatePantryDto,
} from './dto/pantry.dto';
import {
  CreatePantryResponse,
  DeletePantryResponse,
  FetchAllPantryResponse,
  UpdatePantryResponse,
} from '../interfaces/pantry/pantry';
@Injectable()
export class PantryService {
  async fetchAllPantriesById(userId: string): Promise<FetchAllPantryResponse> {
    const pantries = await PantryEntity.findBy({
      user: {
        id: userId,
      },
    });

    return { message: 'Succeed', data: pantries };
  }

  async addPantry({
    name,
    userId: id,
  }: CreatePantryDto): Promise<CreatePantryResponse> {
    const user = await UserEntity.findOneBy({ id });

    if (user === null)
      throw new HttpException('User was not found.', HttpStatus.BAD_REQUEST);

    const newPantry = new PantryEntity();
    newPantry.user = user;
    newPantry.name = name;
    await newPantry.save();
    user.pantries = [];
    user.pantries.push(newPantry);
    await user.save();
    return {
      pantryId: newPantry.id,
      message: 'The pantry has been created.',
    };
  }

  async updatePantry({
    userId,
    name,
  }: UpdatePantryDto): Promise<UpdatePantryResponse> {
    const pantry = await PantryEntity.findOneBy({
      user: {
        id: userId,
      },
    });
    if (pantry === null)
      throw new HttpException(
        'The pantry was not found.',
        HttpStatus.BAD_REQUEST,
      );
    pantry.name = name;
    await pantry.save();

    return {
      message: 'Succeed',
      data: pantry,
    };
  }
  //@todo look into it if we need userId. How to connect with auth?
  async deletePantry({
    pantryId,
    userId,
  }: DeletePantryDto): Promise<DeletePantryResponse> {
    const user = await UserEntity.findOneBy({ id: userId });
    if (user === null)
      throw new HttpException(
        'The user was not found.',
        HttpStatus.BAD_REQUEST,
      );
    const pantry = await PantryEntity.findOneBy({ id: pantryId });
    if (pantry === null)
      throw new HttpException(
        'The pantry was not found.',
        HttpStatus.BAD_REQUEST,
      );
    //@todo remove items from the pantry.

    await pantry.remove();

    return {
      message: 'Succeed',
    };
  }
}
