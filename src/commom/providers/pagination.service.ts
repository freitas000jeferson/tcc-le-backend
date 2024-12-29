import { PaginationQueryDto } from '../dtos/pagination-query.dto';
import { PaginationMetadata, PaginationType } from '../types/pagination.type';

export class PaginationService {
  public static build({
    page = 0,
    size = 10,
    sort,
    order,
  }: PaginationQueryDto): PaginationType {
    const sortBy = [];
    if (sort && order) {
      sortBy.push([order, sort]);
    }
    return { limit: size, skip: page * size, sort: sortBy };
  }

  public static metadata(
    countDocuments: number,
    { page, size }: PaginationQueryDto
  ): PaginationMetadata {
    const totalPages = Math.ceil(countDocuments / size);

    return {
      total: countDocuments,
      totalPages,
      ...(page > 1 && { previousPage: page - 1 }),
      ...(page < countDocuments && page < totalPages && { nextPage: page + 1 }),
    };
  }
}
