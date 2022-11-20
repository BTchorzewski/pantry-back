import { PantryEntity } from '../../entities/pantry.entity';

export interface CreatePantryResponse {
  message: string;
  pantryId?: string;
}

export interface ShortPantry {
  id: string;
  name: string;
  stats: {
    fresh: number;
    expiredSoon: number;
    total: number;
  };
}

export interface FetchShortPantriesResponse {
  message: string;
  data: ShortPantry[];
}

export interface UpdatePantryResponse {
  message: string;
  data: PantryEntity;
}

export interface DeletePantryResponse {
  message: string;
}
