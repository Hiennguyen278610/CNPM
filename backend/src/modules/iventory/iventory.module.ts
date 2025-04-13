import { Module } from '@nestjs/common';
import { IventoryService } from './iventory.service';
import { IventoryController } from './iventory.controller';

@Module({
  controllers: [IventoryController],
  providers: [IventoryService],
})
export class IventoryModule {}
