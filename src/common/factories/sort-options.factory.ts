import { BaseSortOptionDto } from '../dtos/base-sort-option.dto';
import { IsIn } from 'class-validator';

export function createSortOptions<T extends string>(allowedField: T[]) {
  class SortOptionsDto extends BaseSortOptionDto {
    @IsIn(allowedField)
    readonly sortBy: T = allowedField[0];
    // | (string & {})
  }
  return SortOptionsDto;
}
