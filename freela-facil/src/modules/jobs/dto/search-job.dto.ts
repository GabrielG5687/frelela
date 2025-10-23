import { IsOptional, IsString, IsNumber, IsIn, Min, Max } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class SearchJobDto {
  @ApiProperty({
    description: 'Texto livre para busca em título, descrição, categoria e localização',
    example: 'desenvolvedor react',
    required: false,
  })
  @IsOptional()
  @IsString()
  query?: string;

  @ApiProperty({
    description: 'Categoria do trabalho',
    example: 'TI',
    required: false,
  })
  @IsOptional()
  @IsString()
  categoria?: string;

  @ApiProperty({
    description: 'Localização do trabalho',
    example: 'São Paulo',
    required: false,
  })
  @IsOptional()
  @IsString()
  localizacao?: string;

  @ApiProperty({
    description: 'Tipo de contrato',
    example: 'CLT',
    required: false,
  })
  @IsOptional()
  @IsString()
  tipoContrato?: string;

  @ApiProperty({
    description: 'Salário mínimo',
    example: 3000,
    required: false,
  })
  @IsOptional()
  @IsNumber()
  @Min(0)
  @Type(() => Number)
  salarioMin?: number;

  @ApiProperty({
    description: 'Salário máximo',
    example: 8000,
    required: false,
  })
  @IsOptional()
  @IsNumber()
  @Min(0)
  @Type(() => Number)
  salarioMax?: number;

  @ApiProperty({
    description: 'Nível de experiência',
    example: 'Pleno',
    required: false,
  })
  @IsOptional()
  @IsString()
  experiencia?: string;

  @ApiProperty({
    description: 'Número da página',
    example: 1,
    minimum: 1,
    required: false,
  })
  @IsOptional()
  @IsNumber()
  @Min(1)
  @Type(() => Number)
  page?: number;

  @ApiProperty({
    description: 'Itens por página',
    example: 20,
    minimum: 1,
    maximum: 100,
    required: false,
  })
  @IsOptional()
  @IsNumber()
  @Min(1)
  @Max(100)
  @Type(() => Number)
  limit?: number;

  @ApiProperty({
    description: 'Ordenação dos resultados',
    enum: ['relevancia', 'data', 'salario'],
    example: 'data',
    required: false,
  })
  @IsOptional()
  @IsIn(['relevancia', 'data', 'salario'])
  orderBy?: 'relevancia' | 'data' | 'salario';
}