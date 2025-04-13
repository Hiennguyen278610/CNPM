import { Module } from '@nestjs/common';
import { AccountService } from './account.service';
import { AccountController } from './account.controller';
import {MongooseModule} from "@nestjs/mongoose";
import {Account, AccountSchema} from "@/modules/account/schemas/account.schema";

@Module({
  imports : [MongooseModule.forFeature([{name: Account.name, schema: AccountSchema}])],
  controllers: [AccountController],
  providers: [AccountService],
})
export class AccountModule {}
