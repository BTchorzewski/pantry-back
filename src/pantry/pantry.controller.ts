import {
  Body,
  Controller,
  Get,
  Inject,
  ParseUUIDPipe,
  Post,
} from '@nestjs/common';
import { PantryService } from './pantry.service';
import { CreatePantryDto } from './dto/pantry.dto';

@Controller('pantry')
export class PantryController {
  constructor(@Inject() private pantryService: PantryService) {}

  @Post('/')
  createPantry(@Body() { userid: id, name }: CreatePantryDto): Promise<any> {
    return this.pantryService.createPantry(id, name);
  }
}
