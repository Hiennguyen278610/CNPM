import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { VnpayModule } from 'nestjs-vnpay';
import { ignoreLogger } from 'vnpay';

import { VnpayController } from './vnpay.controller';
import { VnpayServices } from './vnpay.service';

@Module({
    imports: [
        ConfigModule.forRoot({
            envFilePath: '.env',
        }),
        VnpayModule.registerAsync({
            imports: [ConfigModule],
            useFactory: async (configService: ConfigService) => ({
                secureSecret: configService.getOrThrow<string>('VNPAY_SECURE_SECRET'),
                tmnCode: configService.getOrThrow<string>('VNPAY_TMN_CODE'),
                loggerFn: ignoreLogger,
            }),
            inject: [ConfigService],
        }),
    ],
    controllers: [VnpayController],
    providers: [VnpayServices],
})
export class Vnpay {}