import { ApiProperty } from '@nestjs/swagger';
import { UserResponseDto } from '../../users/dto/user-response.dto';

export class JobResponseDto {
  @ApiProperty({
    description: 'ID único do trabalho',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  id: string;

  @ApiProperty({
    description: 'Título do trabalho',
    example: 'Desenvolvimento de Site Responsivo',
  })
  titulo: string;

  @ApiProperty({
    description: 'Valor sugerido para o trabalho em reais',
    example: 1500.00,
  })
  valorSugerido: number;

  @ApiProperty({
    description: 'Descrição detalhada do trabalho',
    example: 'Preciso de um site responsivo para minha empresa de consultoria.',
  })
  descricao: string;

  @ApiProperty({
    description: 'Data de publicação do trabalho',
    example: '2024-10-21T10:30:00Z',
  })
  dataPublicacao: Date;

  @ApiProperty({
    description: 'ID do usuário que criou o trabalho',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  usuarioId: string;

  @ApiProperty({
    description: 'Dados do usuário que criou o trabalho',
    type: UserResponseDto,
  })
  usuario?: UserResponseDto;
}