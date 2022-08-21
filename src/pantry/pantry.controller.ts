import { Body, Controller, Get, Post } from '@nestjs/common';
import { PantryService } from './pantry.service';
import { CreatePantryDto } from './dto/pantry.dto';

@Controller('pantry')
export class PantryController {
  constructor(private pantryService: PantryService) {}

  @Get('/')
  getAllPantries() {
    return this.pantryService.getAllPantries();
  }

  @Post('/')
  addPantry(@Body('userId') { userId }: CreatePantryDto) {
    return this.pantryService.addPantry(userId);
  }
}
