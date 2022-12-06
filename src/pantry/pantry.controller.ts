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
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
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

  @Get('/:pantryId')
  @ApiParam({ name: 'pantryId' })
  // @ApiBearerAuth('accessToken')
  @ApiOkResponse({ type: FetchCompletePantryByIResponse })
  @ApiNotFoundResponse({ type: ApiNotFoundResponseSwagger })
  @ApiUnauthorizedResponse({ type: ApiUnauthorizedRespondSwagger })
  @ApiInternalServerErrorResponse({ type: ApiInternalServerErrorSwagger })
  // @UseGuards(AccessJwtGuard)
  fetchPantryById(
    // @UserId() userId,
    @Param('pantryId') pantryId,
    @MockedUserId() userId,
  ): Promise<FetchPantryByIdResponse> {
    return this.pantryService.fetchCompletePantryById(userId, pantryId);
  }

  @ApiBearerAuth('accessToken')
  @ApiCreatedResponse({ type: CreatedPantryResponse })
  @ApiUnauthorizedResponse({ type: ApiUnauthorizedRespondSwagger })
  @ApiInternalServerErrorResponse({ type: ApiInternalServerErrorSwagger })
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
  @ApiOkResponse({ type: FetchCompletePantryByIResponse })
  @ApiNotFoundResponse({ type: ApiNotFoundResponseSwagger })
  @ApiUnauthorizedResponse({ type: ApiUnauthorizedRespondSwagger })
  @ApiInternalServerErrorResponse({ type: ApiInternalServerErrorSwagger })
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
  @ApiOkResponse({ type: DeletedPantryResponse })
  @ApiNotFoundResponse({ type: ApiNotFoundResponseSwagger })
  @ApiUnauthorizedResponse({ type: ApiUnauthorizedRespondSwagger })
  @ApiInternalServerErrorResponse({ type: ApiInternalServerErrorSwagger })
  @Delete('/:pantryId')
  // @UseGuards(AccessJwtGuard)
  deletePantry(
    // @UserId() userId,
    @Param('pantryId', ParseUUIDPipe) pantryId,
    @MockedUserId() userId,
  ): Promise<DeletePantryResponse> {
    return this.pantryService.deletePantry(userId, pantryId);
  }

  @Get('/item/:itemId')
  // @ApiBearerAuth('accessToken')
  // @UseGuards(AccessJwtGuard)
  @ApiParam({ name: 'itemId' })
  @ApiOkResponse({ type: GetItemByIdResponse })
  @ApiNotFoundResponse({ type: ApiNotFoundResponseSwagger })
  @ApiUnauthorizedResponse({ type: ApiUnauthorizedRespondSwagger })
  @ApiInternalServerErrorResponse({ type: ApiInternalServerErrorSwagger })
  getItemById(
    @Param('itemId', ParseUUIDPipe) itemId,
    // @UserId() userId,
    @MockedUserId() userId,
  ): Promise<GetItemResponse> {
    return this.itemService.findOne(itemId, userId);
  }

  @Post('/:pantryId/item')
  // @ApiBearerAuth('accessToken')
  // @UseGuards(AccessJwtGuard)
  @ApiOkResponse({ type: GetItemByIdResponse })
  @ApiNotFoundResponse({ type: ApiNotFoundResponseSwagger })
  @ApiUnauthorizedResponse({ type: ApiUnauthorizedRespondSwagger })
  @ApiInternalServerErrorResponse({ type: ApiInternalServerErrorSwagger })
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
  @ApiOkResponse({ type: GetItemByIdResponse })
  @ApiNotFoundResponse({ type: ApiNotFoundResponseSwagger })
  @ApiUnauthorizedResponse({ type: ApiUnauthorizedRespondSwagger })
  @ApiInternalServerErrorResponse({ type: ApiInternalServerErrorSwagger })
  updateItem(
    // @UserId() userId: string,
    @Param('itemId', ParseUUIDPipe) itemId: string,
    @Body() item: CreateItemDto,
    @MockedUserId() userId,
  ): Promise<any> {
    return this.itemService.updateItem(item, userId, itemId);
  }

  @Delete('/item/:itemId')
  // @UseGuards(AccessJwtGuard)
  @ApiUnauthorizedResponse({ type: ApiUnauthorizedRespondSwagger })
  @ApiNotFoundResponse({ type: ApiNotFoundResponseSwagger })
  @ApiInternalServerErrorResponse({ type: ApiInternalServerErrorSwagger })
  deleteItem(
    // @UserId() userId: string,
    @Param('itemId', ParseUUIDPipe) itemId: string,
    @MockedUserId() userId,
  ): Promise<DeletedItemResponse> {
    return this.itemService.deleteItemById(itemId, userId);
  }
}
