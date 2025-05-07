// option-group.module.ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { OptionGroupService } from './option-group.service';
import { OptionGroupController } from './option-group.controller';
import { OptionGroup, OptionGroupSchema } from './schemas/option-group.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: OptionGroup.name, schema: OptionGroupSchema },
    ]),
  ],
  controllers: [OptionGroupController],
  providers: [OptionGroupService],
})
export class OptionGroupModule {}