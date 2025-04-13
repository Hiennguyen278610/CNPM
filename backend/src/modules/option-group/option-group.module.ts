import { Module } from '@nestjs/common';
import { OptionGroupService } from './option-group.service';
import { OptionGroupController } from './option-group.controller';

@Module({
  controllers: [OptionGroupController],
  providers: [OptionGroupService],
})
export class OptionGroupModule {}
