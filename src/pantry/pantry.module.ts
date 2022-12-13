import { forwardRef, Module } from '@nestjs/common';
import { PantryController } from './pantry.controller';
import { PantryService } from './pantry.service';
import { ItemModule } from '../item/item.module';

@Module({
  imports: [forwardRef(() => ItemModule)],
  controllers: [PantryController],
  providers: [PantryService],
})
export class PantryModule {}
