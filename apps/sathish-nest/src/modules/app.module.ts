import { Module, MiddlewareConsumer, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import configuration from '@config/configuration';
import { DatabaseModule } from '@database/database.module';
import { AuthModule } from '@modules/auth.module';
import { UsersModule } from '@modules/users.module';
import { GraphqlModule } from '@modules/graphql.module';
import { TenantMiddleware } from '@middleware/tenant.middleware';
import { AppController } from '@controllers/app.controller';
import { AppService } from '@services/app.service';
import { HealthController } from '@controllers/health.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'schema.gql'),
      sortSchema: true,
      cache: 'bounded',
      csrfPrevention: true,
    }),
    DatabaseModule,
    AuthModule,
    UsersModule,
    GraphqlModule,
  ],
  controllers: [AppController, HealthController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(TenantMiddleware).forRoutes('*');
  }
}
