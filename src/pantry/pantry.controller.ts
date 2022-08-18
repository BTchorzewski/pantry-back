import { Controller, Get, Post } from '@nestjs/common';
import { PantryService } from './pantry.service';

@Controller('pantry')
export class PantryController {
  constructor(private pantryService: PantryService) {}

  @Get('/')
  getAllPantries() {
    return this.pantryService.getAllPantries();
  }

  @Post('/')
  addPantry() {
    return this.pantryService.addPantry();
  }
}
