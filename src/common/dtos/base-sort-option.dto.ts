import { IsOptional, IsIn } from 'class-validator';
import { Type } from 'class-transformer';
export class BaseSortOptionDto {
  @IsOptional()
  readonly sortBy: string = '_id';

  @IsOptional()
  @Type(() => Number)
  @IsIn([-1, 1])
  readonly desc?: 1 | -1 = -1;
}
