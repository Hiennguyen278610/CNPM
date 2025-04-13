import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {ConfigModule, ConfigService} from "@nestjs/config";
import {MongooseModule} from "@nestjs/mongoose";
import {AccountModule} from '@/modules/account/account.module';
import {CustomerModule} from "@/modules/customer/customer.module";
import {DishModule} from "@/modules/dish/dish.module";
import {IngredientsModule} from "@/modules/ingredients/ingredients.module";
import {IventoryModule} from "@/modules/iventory/iventory.module";
import {OptionModule} from "@/modules/option/option.module";
import {OptionGroupModule} from "@/modules/option-group/option-group.module";
import {OrderModule} from "@/modules/order/order.module";
import {OrderDetailModule} from "@/modules/order-detail/order-detail.module";
import {RecipeModule} from "@/modules/recipe/recipe.module";
import {TableModule} from "@/modules/table/table.module";

@Module({
    imports: [
        AccountModule,
        CustomerModule,
        DishModule,
        IngredientsModule,
        IventoryModule,
        OptionModule,
        OptionGroupModule,
        OrderModule,
        OrderDetailModule,
        RecipeModule,
        TableModule,
        ConfigModule.forRoot({isGlobal: true}),
        MongooseModule.forRootAsync({
            imports: [ConfigModule],
            useFactory: async (configService: ConfigService) => ({
                uri: configService.get('MONGODB_URI'),
            }),
            inject: [ConfigService],
        })
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {
}
