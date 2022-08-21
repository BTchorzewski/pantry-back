import { Body, Controller, Get, ParseUUIDPipe, Post } from '@nestjs/common';
import { PantryService } from './pantry.service';
import { CreatePantryDto } from './dto/pantry.dto';
import { CreatePantryResponse } from '../interfaces/pantry/pantry';

@Controller('pantry')
export class PantryController {
  constructor(private pantryService: PantryService) {}

  @Get('/')
  getAllPantries(@Body('userId', ParseUUIDPipe) userId: string) {
    return this.pantryService.fetchAllPantriesById(userId);
  }

  @Post('/')
  createPantry(@Body() body: CreatePantryDto): Promise<CreatePantryResponse> {
    //@todo rename method. The method should be named 'createPantry' not 'addPantry'.
    return this.pantryService.addPantry(body);
  }
}
