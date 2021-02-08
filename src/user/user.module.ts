import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserResolver } from './user.resolver';
import { User } from './user.entity';
import { UserService } from './user.service';
import UserLoaderService from './user-loader.service';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [UserService, UserResolver, UserLoaderService],
  exports: [UserService, UserLoaderService],
})
export class UserModule {}
