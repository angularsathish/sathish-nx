import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { REQUEST } from '@nestjs/core';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService, REQUEST],
      useFactory: async (configService: ConfigService, req: { tenant: string }) => {
        const mongoUrlPrefix = configService.get<string>('mongoUrlPrefix');
        const dbName = req.tenant ? `${req.tenant}-db` : 'default-db';
        return {
          uri: `${mongoUrlPrefix}/${dbName}`,
        };
      },
    }),
  ],
})
export class DatabaseModule {}
