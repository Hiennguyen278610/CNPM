import { Module } from '@nestjs/common'; 
import { OptionService } from './option.service';
import { OptionController } from './option.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Option, OptionSchema } from './schemas/option.schema';
import { OptionDocument } from './schemas/option.schema';

@Module({
  controllers: [OptionController],
  providers: [OptionService],
  imports: [MongooseModule.forFeature([{ name: Option.name, schema: OptionSchema }])] 
})
export class OptionModule {}
