import { Controller } from '@nestjs/common';
import { ItemService } from './item.service';

@Controller('item')
export class ItemController {
  constructor(private readonly itemService: ItemService) {}
  //
  // @UseGuards(JwtAuthGuard)
  // @Post('/')
  // create(@Body() createItemDto: CreateItemDto, @UserId() userId) {
  //   return this.itemService.create(createItemDto, userId);
  // }
  //
  // @Get('/')
  // findAll() {
  //   return this.itemService.findAll();
  // }
  //
  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.itemService.findOne(+id);
  // }
  //
  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateItemDto: UpdateItemDto) {
  //   return this.itemService.update(+id, updateItemDto);
  // }
  //
  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.itemService.remove(+id);
  // }
}
