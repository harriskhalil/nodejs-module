import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { User } from './entities/user.entity';
import { IsUniqueEmailConstraint } from './validators/is-unique-email.validator';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [UsersService, IsUniqueEmailConstraint],
  controllers: [UsersController],
  exports: [UsersService],
})
export class UsersModule {}
