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
  FetchPantryByIdResponse,
  FetchShortPantriesResponse,
  UpdatePantryResponse,
} from '../types';
import { ItemService } from '../item/item.service';
import { CreateItemDto } from './dto/create-item.dto';
import { UserId } from '../decorators/userId.decorator';
import { AccessJwtGuard } from '../guards/access-jwt.guard';
import { DeletedItemResponse, GetItemResponse } from '../types';
import { UpdatePantryDto } from './dto/update-pantry.dto';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiParam,
  ApiTags,
  ApiUnauthorizedResponse,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOperation,
} from '@nestjs/swagger';
import {
  CreatedPantryResponse,
  DeletedPantryResponse,
  FetchCompletePantryByIResponse,
  FetchPantriesResponse,
  GetItemByIdResponse,
} from '../swagger/models/pantry';
import {
  ApiInternalServerErrorSwagger,
  ApiNotFoundResponseSwagger,
  ApiUnauthorizedRespondSwagger,
  BadRequestResponseSwagger,
} from '../swagger/models/general';

@ApiTags('CRUD for Pantries and Items')
@Controller('pantry')
export class PantryController {
  constructor(
    private pantryService: PantryService,
    private itemService: ItemService,
  ) {}

  @Get('/')
  // Authentication section
  @ApiBearerAuth('accessToken')
  @UseGuards(AccessJwtGuard)
  // Swagger section
  @ApiOperation({ description: 'Fetch all pantries.' })
  @ApiOkResponse({ type: FetchPantriesResponse })
  @ApiBadRequestResponse({ type: BadRequestResponseSwagger })
  @ApiUnauthorizedResponse({ type: ApiUnauthorizedRespondSwagger })
  @ApiInternalServerErrorResponse({ type: ApiInternalServerErrorSwagger })
  fetchPantries(
    @UserId() userId,
    // @MockedUserId() userId,
  ): Promise<FetchShortPantriesResponse> {
    return this.pantryService.fetchShortPantries(userId);
  }

  @Get('/:pantryId')
  // Authentication section
  @ApiBearerAuth('accessToken')
  @UseGuards(AccessJwtGuard)
  // Swagger section
  @ApiParam({ name: 'pantryId' })
  @ApiOperation({ description: 'Fetch a pantry by id.' })
  @ApiOkResponse({ type: FetchCompletePantryByIResponse })
  @ApiNotFoundResponse({ type: ApiNotFoundResponseSwagger })
  @ApiUnauthorizedResponse({ type: ApiUnauthorizedRespondSwagger })
  @ApiInternalServerErrorResponse({ type: ApiInternalServerErrorSwagger })
  fetchPantryById(
    @UserId() userId,
    @Param('pantryId') pantryId,
    // @MockedUserId() userId,
  ): Promise<FetchPantryByIdResponse> {
    return this.pantryService.fetchCompletePantryById(userId, pantryId);
  }

  @Post('/')
  // Authentication section
  @ApiBearerAuth('accessToken')
  @UseGuards(AccessJwtGuard)
  // Swagger section
  @ApiOperation({ description: 'Create a pantry.' })
  @ApiCreatedResponse({ type: CreatedPantryResponse })
  @ApiUnauthorizedResponse({ type: ApiUnauthorizedRespondSwagger })
  @ApiInternalServerErrorResponse({ type: ApiInternalServerErrorSwagger })
  createPantry(
    @Body() { name }: CreatePantryDto,
    @UserId() userId,
    // @MockedUserId() userId,
  ): Promise<CreatePantryResponse> {
    return this.pantryService.createPantry(userId, name);
  }

  @Put('/:pantryId')
  // Authentication section
  @ApiBearerAuth('accessToken')
  @UseGuards(AccessJwtGuard)
  // Swagger section
  @ApiParam({ name: 'pantryId' })
  @ApiOperation({ description: 'Update a pantry.' })
  @ApiOkResponse({ type: FetchCompletePantryByIResponse })
  @ApiNotFoundResponse({ type: ApiNotFoundResponseSwagger })
  @ApiUnauthorizedResponse({ type: ApiUnauthorizedRespondSwagger })
  @ApiInternalServerErrorResponse({ type: ApiInternalServerErrorSwagger })
  updatePantry(
    @Body() { name }: UpdatePantryDto,
    @UserId() userId,
    @Param('pantryId') pantryId,
    // @MockedUserId() userId,
  ): Promise<UpdatePantryResponse> {
    return this.pantryService.updatePantry(userId, pantryId, name);
  }

  @Delete('/:pantryId')
  // Authentication section
  @ApiBearerAuth('accessToken')
  @UseGuards(AccessJwtGuard)
  // Swagger section
  @ApiOperation({ description: 'Delete a pantry.' })
  @ApiParam({ name: 'pantryId' })
  @ApiOkResponse({ type: DeletedPantryResponse })
  @ApiNotFoundResponse({ type: ApiNotFoundResponseSwagger })
  @ApiUnauthorizedResponse({ type: ApiUnauthorizedRespondSwagger })
  @ApiInternalServerErrorResponse({ type: ApiInternalServerErrorSwagger })
  deletePantry(
    @Param('pantryId', ParseUUIDPipe) pantryId,
    @UserId() userId,
    // @MockedUserId() userId,
  ): Promise<DeletePantryResponse> {
    return this.pantryService.deletePantry(userId, pantryId);
  }

  @Get('/item/:itemId')
  // Authentication section
  @ApiBearerAuth('accessToken')
  @UseGuards(AccessJwtGuard)
  // Swagger section
  @ApiParam({ name: 'itemId' })
  @ApiOperation({ description: 'Fetch an item by id.' })
  @ApiOkResponse({ type: GetItemByIdResponse })
  @ApiNotFoundResponse({ type: ApiNotFoundResponseSwagger })
  @ApiUnauthorizedResponse({ type: ApiUnauthorizedRespondSwagger })
  @ApiInternalServerErrorResponse({ type: ApiInternalServerErrorSwagger })
  getItemById(
    @Param('itemId', ParseUUIDPipe) itemId,
    @UserId() userId,
    // @MockedUserId() userId,
  ): Promise<GetItemResponse> {
    return this.itemService.findOne(itemId, userId);
  }

  @Post('/:pantryId/item')
  // Authentication section
  @ApiBearerAuth('accessToken')
  @UseGuards(AccessJwtGuard)
  // Swagger section
  @ApiOperation({ description: 'Create an item.' })
  @ApiOkResponse({ type: GetItemByIdResponse })
  @ApiNotFoundResponse({ type: ApiNotFoundResponseSwagger })
  @ApiUnauthorizedResponse({ type: ApiUnauthorizedRespondSwagger })
  @ApiInternalServerErrorResponse({ type: ApiInternalServerErrorSwagger })
  createItem(
    @Param('pantryId', ParseUUIDPipe) pantryId: string,
    @Body() item: CreateItemDto,
    @UserId() userId: string,
    // @MockedUserId() userId,
  ): Promise<any> {
    return this.itemService.create(item, userId, pantryId);
  }

  @Put('/item/:itemId')
  // Authentication section
  @ApiBearerAuth('accessToken')
  @UseGuards(AccessJwtGuard)
  // Swagger section
  @ApiOperation({ description: 'Update an item by id.' })
  @ApiOkResponse({ type: GetItemByIdResponse })
  @ApiNotFoundResponse({ type: ApiNotFoundResponseSwagger })
  @ApiUnauthorizedResponse({ type: ApiUnauthorizedRespondSwagger })
  @ApiInternalServerErrorResponse({ type: ApiInternalServerErrorSwagger })
  updateItem(
    @Param('itemId', ParseUUIDPipe) itemId: string,
    @Body() item: CreateItemDto,
    @UserId() userId: string,
    // @MockedUserId() userId,
  ): Promise<any> {
    return this.itemService.updateItem(item, userId, itemId);
  }

  @Delete('/item/:itemId')
  // Authentication section
  @ApiBearerAuth('accessToken')
  @UseGuards(AccessJwtGuard)
  // Swagger section
  @ApiOperation({ description: 'Delete an item by id.' })
  @ApiUnauthorizedResponse({ type: ApiUnauthorizedRespondSwagger })
  @ApiNotFoundResponse({ type: ApiNotFoundResponseSwagger })
  @ApiInternalServerErrorResponse({ type: ApiInternalServerErrorSwagger })
  deleteItem(
    @Param('itemId', ParseUUIDPipe) itemId: string,
    @UserId() userId: string,
    // @MockedUserId() userId,
  ): Promise<DeletedItemResponse> {
    return this.itemService.deleteItemById(itemId, userId);
  }
}
