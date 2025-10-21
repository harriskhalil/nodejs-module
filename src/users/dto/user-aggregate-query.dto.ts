import { IntersectionType } from '@nestjs/mapped-types';
import { PageOptionsDto } from '../../common/dtos/page-options.dto';
import { createSortOptions } from '../../common/factories/sort-options.factory';
import { UserSearchDto } from './user-search.dto';

export class UserSortOptionDto extends createSortOptions([
  '_id',
  'created_at',
] as const) {}

export class UserAggregateQueryDto extends IntersectionType(
  PageOptionsDto,
  UserSortOptionDto,
  UserSearchDto,
) {}
