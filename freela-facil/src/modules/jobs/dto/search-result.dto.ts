import { ApiProperty } from '@nestjs/swagger';
import { Job } from '../job.entity';

export class SearchResultDto {
  @ApiProperty({
    description: 'Lista de trabalhos encontrados',
    type: [Job],
  })
  jobs: Job[];

  @ApiProperty({
    description: 'Total de trabalhos encontrados',
    example: 150,
  })
  total: number;

  @ApiProperty({
    description: 'Página atual',
    example: 1,
  })
  page: number;

  @ApiProperty({
    description: 'Total de páginas',
    example: 8,
  })
  totalPages: number;

  @ApiProperty({
    description: 'Indica se há próxima página',
    example: true,
  })
  hasNext: boolean;

  @ApiProperty({
    description: 'Indica se há página anterior',
    example: false,
  })
  hasPrev: boolean;
}