import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { PantryModule } from './pantry/pantry.module';
import { AdminModule } from './admin/admin.module';
import { AuthModule } from './auth/auth.module';
import { DataSource } from 'typeorm';
import { config } from './config/config';
import { UserEntity } from './user/entities/user.entity';
import { PantryEntity } from './entities/pantry.entity';
import { ItemEntity } from './entities/item.entity';
import { EmailModule } from './email/email.module';
import { ItemModule } from './item/item.module';
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: config.db.username,
      password: config.db.password,
      database: config.db.database,
      entities: [UserEntity, PantryEntity, ItemEntity],
      synchronize: true,
    }),
    UserModule,
    PantryModule,
    AdminModule,
    AuthModule,
    EmailModule,
    ItemModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}
