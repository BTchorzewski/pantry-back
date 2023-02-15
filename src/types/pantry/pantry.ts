import { PantryEntity } from '../../entities/pantry.entity';

export interface CreatePantryResponse {
  message: string;
  pantryId?: string;
}

export interface Stats {
  fresh: number;
  expiredSoon: number;
  total: number;
  expired: number;
}

export interface PantriesWithStats {
  id: string;
  name: string;
  stats: Stats;
}

export interface FetchPantriesWithStatsResponse {
  message: string;
  data: PantriesWithStats[];
}

export interface UpdatePantryResponse {
  message: string;
  data: PantryEntity;
}

export interface DeletePantryResponse {
  message: string;
}

export interface FetchPantryByIdResponse {
  message: string;
  data: PantryEntity;
}

export interface FetchPantriesWithItemsResponse {
  message: string;
  data: PantryEntity[];
}
