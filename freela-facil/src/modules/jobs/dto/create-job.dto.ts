import { IsString, IsNotEmpty, IsNumber, IsPositive, MinLength, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class CreateJobDto {
  @ApiProperty({
    description: 'Título do trabalho',
    example: 'Desenvolvimento de Site Responsivo',
    minLength: 3,
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  titulo: string;

  @ApiProperty({
    description: 'Valor sugerido para o trabalho em reais',
    example: 1500.00,
    minimum: 0.01,
  })
  @IsNumber()
  @IsPositive()
  @Type(() => Number)
  valorSugerido: number;

  @ApiProperty({
    description: 'Salário oferecido em reais',
    example: 5000.00,
    required: false,
  })
  @IsOptional()
  @IsNumber()
  @IsPositive()
  @Type(() => Number)
  salario?: number;

  @ApiProperty({
    description: 'Descrição detalhada do trabalho',
    example: 'Preciso de um site responsivo para minha empresa de consultoria. O site deve ter 5 páginas principais e formulário de contato.',
    minLength: 10,
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(10)
  descricao: string;

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
    description: 'Nível de experiência requerido',
    example: 'Pleno',
    required: false,
  })
  @IsOptional()
  @IsString()
  experiencia?: string;
}