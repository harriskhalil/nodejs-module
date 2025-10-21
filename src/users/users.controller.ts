import {
  Controller,
  Get,
  Param,
  Body,
  Put,
  Delete,
  Query,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/user.dto';
import { PageOptionsDto } from '../common/dtos/page-options.dto';
import { UserAggregateQueryDto } from './dto/user-aggregate-query.dto';
@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Get()
  findAll(@Query() pageOptionsDto: PageOptionsDto) {
    return this.userService.findAll(pageOptionsDto);
  }

  @Get('/ag')
  aggregate(@Query() aggregateQuery: UserAggregateQueryDto) {
    return this.userService.aggregate(aggregateQuery);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findById(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() user: UpdateUserDto) {
    return this.userService.update(id, user);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.userService.delete(id);
  }
}
