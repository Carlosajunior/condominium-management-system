import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { join } from 'path';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: parseInt(process.env.POSTGRES_PORT),
      database: process.env.POSTGRES_DATABASE,
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      logging: true,
      synchronize: false,
      entities: [__dirname + '/../**/*.entity{.ts,.js}'],
      migrations: [
        join(__dirname, '/../../', 'database/migrations/**/*{.ts,.js}'),
      ],
      migrationsTableName: 'typeorm_migrations',
      migrationsRun: false,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
