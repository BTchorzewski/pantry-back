import { Injectable } from '@nestjs/common';
import { UserEntity } from '../entities/user.entity';
import { PantryEntity } from '../entities/pantry.entity';
@Injectable()
export class PantryService {
  async createPantry(id: string, name: string): Promise<any> {
    const user = await UserEntity.findOneBy({ id });
    const newPantry = new PantryEntity();
    newPantry.name = name;
    newPantry.user = user;
    user.pantry.push(newPantry);
    await user.save();
    await newPantry.save();

    return {
      pantryId: newPantry.id,
      userId: user.id,
    };
  }
}
