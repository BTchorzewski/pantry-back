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
import { UserId } from '../decorators/userId.decorator';
import { AccessJwtGuard } from '../guards/access-jwt.guard';

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

  @UseGuards(AccessJwtGuard)
  @Post('/:pantryId/item')
  addItemToPantry(
    @UserId() userId: string,
    @Param('pantryId', ParseUUIDPipe) pantryId: string,
    @Body() item: CreateItemDto,
  ): Promise<any> {
    return this.itemService.create(item, userId, pantryId);
  }
  @UseGuards(AccessJwtGuard)
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
