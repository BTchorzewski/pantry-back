import {
  Body,
  Controller,
  Get,
  ParseUUIDPipe,
  Post,
  Put,
} from '@nestjs/common';
import { PantryService } from './pantry.service';
import { CreatePantryDto, UpdatePantryDto } from './dto/pantry.dto';
import {
  CreatePantryResponse,
  FetchAllPantryResponse,
} from '../interfaces/pantry/pantry';

@Controller('pantry')
export class PantryController {
  constructor(private pantryService: PantryService) {}

  @Get('/')
  getAllPantries(
    @Body('userId', ParseUUIDPipe) userId: string,
  ): Promise<FetchAllPantryResponse> {
    return this.pantryService.fetchAllPantriesById(userId);
  }

  @Post('/')
  createPantry(@Body() body: CreatePantryDto): Promise<CreatePantryResponse> {
    //@todo rename method. The method should be named 'createPantry' not 'addPantry'.
    return this.pantryService.addPantry(body);
  }

  @Put('/')
  updatePantry(@Body() body: UpdatePantryDto): Promise<any> {
    return this.pantryService.updatePantry(body);
  }
}
