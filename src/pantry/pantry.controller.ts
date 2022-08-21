import { Body, Controller, Get, Post } from '@nestjs/common';
import { PantryService } from './pantry.service';
import { CreatePantryDto } from './dto/pantry.dto';
import { CreatePantryResponse } from '../interfaces/pantry/pantry';

@Controller('pantry')
export class PantryController {
  constructor(private pantryService: PantryService) {}

  @Get('/')
  getAllPantries() {
    return this.pantryService.getAllPantries();
  }

  @Post('/')
  createPantry(@Body() body: CreatePantryDto): Promise<CreatePantryResponse> {
    return this.pantryService.addPantry(body);
  }
}
