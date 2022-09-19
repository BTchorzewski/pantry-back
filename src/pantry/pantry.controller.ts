import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { PantryService } from './pantry.service';
import {
  CreatePantryDto,
  DeletePantryDto,
  UpdatePantryDto,
} from './dto/pantry.dto';
import {
  CreatePantryResponse,
  DeletePantryResponse,
  FetchAllPantryResponse,
  UpdatePantryResponse,
} from '../interfaces/pantry/pantry';
import { ItemService } from '../item/item.service';
import { CreateItemDto } from './dto/create-item.dto';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { UserId } from '../decorators/UserId';

@Controller('pantry')
export class PantryController {
  constructor(
    private pantryService: PantryService,
    private itemService: ItemService,
  ) {}

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

  @UseGuards(JwtAuthGuard)
  @Post('/:pantryId/item')
  addItemToPantry(
    @UserId() userId: string,
    @Param('pantryId', ParseUUIDPipe) pantryId: string,
    @Body() item: CreateItemDto,
  ): Promise<any> {
    return this.itemService.create(item, userId, pantryId);
  }
  @UseGuards(JwtAuthGuard)
  @Put('/:pantryId/item/:itemId')
  updateItemToPantry(
    @UserId() userId: string,
    @Param('pantryId', ParseUUIDPipe) pantryId: string,
    @Param('itemId', ParseUUIDPipe) itemId: string,
    @Body() item: CreateItemDto,
  ): Promise<any> {
    return this.itemService.updateItem(item, userId, pantryId, itemId);
  }
}
