import { PantryEntity } from '../../entities/pantry.entity';

export interface CreatePantryResponse {
  message: string;
  pantryId?: string;
}

export interface FetchAllPantryResponse {
  message: string;
  data: PantryEntity[];
}

export interface UpdatePantryResponse {
  message: string;
  data: PantryEntity;
}

export interface DeletePantryResponse {
  message: string;
}
