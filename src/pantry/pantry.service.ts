import { Injectable } from '@nestjs/common';

@Injectable()
export class PantryService {
  async getAllPantries(): Promise<any> {
    return 'getAllPantries';
  }

  async addPantry(): Promise<any> {
    return 'addPantry';
  }
}
