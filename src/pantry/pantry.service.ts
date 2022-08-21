import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserEntity } from '../entities/user.entity';
import { PantryEntity } from '../entities/pantry.entity';
import { CreatePantryDto } from './dto/pantry.dto';
import {
  CreatePantryResponse,
  FetchAllPantryResponse,
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
}
