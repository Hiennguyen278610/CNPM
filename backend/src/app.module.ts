import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AccountModule } from '@/modules/account/account.module';
import { CustomerModule } from '@/modules/customer/customer.module';
import { DishModule } from '@/modules/dish/dish.module';
import { IngredientsModule } from '@/modules/ingredients/ingredients.module';
import { IventoryModule } from '@/modules/iventory/iventory.module';
import { OptionModule } from '@/modules/option/option.module';
import { OptionGroupModule } from '@/modules/option-group/option-group.module';
import { OrderModule } from '@/modules/order/order.module';
import { OrderDetailModule } from '@/modules/order-detail/order-detail.module';
import { RecipeModule } from '@/modules/recipe/recipe.module';
import { TableModule } from '@/modules/table/table.module';
import { AuthModule } from '@/auth/auth.module';
import { JwtAuthGuard } from '@/auth/jwt-auth.guard';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { Vnpay } from './modules/vnpay/vnpay.module';

@Module({
  imports: [
    Vnpay,
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
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get('MONGODB_URI'),
      }),
      inject: [ConfigService],
    }),
    AuthModule,
    MailerModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        transport: {
          host: 'smtp.gmail.com',
          port: 465,
          secure: true,
          // ignoreTLS: true,
          auth: {
            user: configService.get<string>('MAILDEV_INCOMING_USER'),
            pass: configService.get<string>('MAILDEV_INCOMING_PASS'),
          },
        },
        defaults: {
          from: '"Sea Food" <no-reply@localhost>',
        },
        // preview: true,
        template: {
          dir: process.cwd() + '/src/mail/templates/',
          adapter: new HandlebarsAdapter(), // or new PugAdapter() or new EjsAdapter()
          options: {
            strict: true,
          },
        },
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
