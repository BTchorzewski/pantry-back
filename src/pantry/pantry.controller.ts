import {
  Body,
  Controller,
  Delete,
  Get,
  ParseUUIDPipe,
  Post,
  Put,
} from '@nestjs/common';
import { PantryService } from './pantry.service';
import {
  CreatePantryDto,
  DeletePantryDto,
  UpdatePantryDto,
} from './dto/pantry.dto';
import {
  CreatePantryResponse, DeletePantryResponse,
  FetchAllPantryResponse, UpdatePantryResponse,
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
  updatePantry(@Body() body: UpdatePantryDto): Promise<UpdatePantryResponse> {
    return this.pantryService.updatePantry(body);
  }

  @Delete('/')
  deletePantry(@Body() body: DeletePantryDto): Promise<DeletePantryResponse> {
    return this.pantryService.deletePantry(body);
  }
}
