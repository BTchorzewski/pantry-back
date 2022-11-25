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
import { CreatePantryDto } from './dto/create-pantry.dto';
import {
  CreatePantryResponse,
  DeletePantryResponse,
  FetchShortPantriesResponse,
  UpdatePantryResponse,
} from '../interfaces/pantry/pantry';
import { ItemService } from '../item/item.service';
import { CreateItemDto } from './dto/create-item.dto';
import { UserId } from '../decorators/userId.decorator';
import { AccessJwtGuard } from '../guards/access-jwt.guard';
import { MockedUserId } from '../decorators/mockUserId.decorator';
import mock = jest.mock;
import { DeletedItemResponse, GetItemResponse } from '../interfaces';
import { UpdateItemDto } from '../item/dto/update-item.dto';
import { UpdatePantryDto } from './dto/update-pantry.dto';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiParam,
  ApiTags,
  ApiUnauthorizedResponse,
  ApiInternalServerErrorResponse
} from '@nestjs/swagger';
import {
  CreatedPantryResponse,
  FetchPantriesResponse,
} from '../swagger/models/pantry';
import {
  ApiInternalServerErrorSwagger,
  ApiUnauthorizedRespondSwagger,
  BadRequestResponseSwagger,
} from '../swagger/models/general';

@ApiTags('Pantry and Items')
@Controller('pantry')
export class PantryController {
  constructor(
    private pantryService: PantryService,
    private itemService: ItemService,
  ) {}

  @ApiBearerAuth('accessToken')
  @ApiOkResponse({ type: FetchPantriesResponse })
  @ApiBadRequestResponse({ type: BadRequestResponseSwagger })
  @ApiUnauthorizedResponse({ type: ApiUnauthorizedRespondSwagger })
  @ApiInternalServerErrorResponse({ type: ApiInternalServerErrorSwagger })
  @Get('/')
  // @UseGuards(AccessJwtGuard)
  fetchPantries(
    // @UserId() userId,
    @MockedUserId() userId,
  ): Promise<FetchShortPantriesResponse> {
    return this.pantryService.fetchShortPantries(userId);
  }
  @ApiBearerAuth('accessToken')
  @ApiCreatedResponse({ type: CreatedPantryResponse })
  @ApiUnauthorizedResponse({ type: ApiUnauthorizedRespondSwagger })
  @Post('/')
  // @UseGuards(AccessJwtGuard)
  createPantry(
    @Body() { name }: CreatePantryDto,
    // @UserId() userId,
    @MockedUserId() userId,
  ): Promise<CreatePantryResponse> {
    return this.pantryService.createPantry(userId, name);
  }

  @ApiBearerAuth('accessToken')
  @ApiParam({ name: 'pantryId' })
  @ApiBadRequestResponse({ description: 'The pantry was not found.' })
  @ApiUnauthorizedResponse({ type: ApiUnauthorizedRespondSwagger })
  @Put('/:pantryId')
  // @UseGuards(AccessJwtGuard)
  updatePantry(
    @Body() { name }: UpdatePantryDto,
    // @UserId() userId,
    @Param('pantryId') pantryId,
    @MockedUserId() userId,
  ): Promise<UpdatePantryResponse> {
    return this.pantryService.updatePantry(userId, pantryId, name);
  }

  @ApiBearerAuth('accessToken')
  @ApiParam({ name: 'pantryId' })
  @ApiBadRequestResponse({ description: 'The pantry was not found.' })
  @ApiUnauthorizedResponse({ type: ApiUnauthorizedRespondSwagger })
  @Delete('/:pantryId')
  // @UseGuards(AccessJwtGuard)
  deletePantry(
    // @UserId() userId,
    @Param('pantryId', ParseUUIDPipe) pantryId,
    @MockedUserId() userId,
  ): Promise<DeletePantryResponse> {
    return this.pantryService.deletePantry(userId, pantryId);
  }

  @ApiBearerAuth('accessToken')
  @ApiParam({ name: 'itemId' })
  @ApiUnauthorizedResponse({ type: ApiUnauthorizedRespondSwagger })
  @Get('/item/:itemId')
  // @UseGuards(AccessJwtGuard)
  getItemById(
    @Param('itemId', ParseUUIDPipe) itemId,
    // @UserId() userId,
    @MockedUserId() userId,
  ): Promise<GetItemResponse> {
    return this.itemService.findOne(itemId, userId);
  }

  @Post('/:pantryId/item')
  // @UseGuards(AccessJwtGuard)
  @ApiUnauthorizedResponse({ type: ApiUnauthorizedRespondSwagger })
  createItem(
    // @UserId() userId: string,
    @Param('pantryId', ParseUUIDPipe) pantryId: string,
    @Body() item: CreateItemDto,
    @MockedUserId() userId,
  ): Promise<any> {
    return this.itemService.create(item, userId, pantryId);
  }

  @Put('/item/:itemId')
  // @UseGuards(AccessJwtGuard)
  @ApiUnauthorizedResponse({ type: ApiUnauthorizedRespondSwagger })
  updateItem(
    // @UserId() userId: string,
    @Param('pantryId', ParseUUIDPipe) pantryId: string,
    @Param('itemId', ParseUUIDPipe) itemId: string,
    @Body() item: CreateItemDto,
    @MockedUserId() userId,
  ): Promise<any> {
    return this.itemService.updateItem(item, userId, pantryId, itemId);
  }

  @Delete('/item/:itemId')
  // @UseGuards(AccessJwtGuard)
  @ApiUnauthorizedResponse({ type: ApiUnauthorizedRespondSwagger })
  deleteItem(
    // @UserId() userId: string,
    @Param('itemId', ParseUUIDPipe) itemId: string,
    @MockedUserId() userId,
  ): Promise<DeletedItemResponse> {
    return this.itemService.deleteItemById(itemId, userId);
  }
}
