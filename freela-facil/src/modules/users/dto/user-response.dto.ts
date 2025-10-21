import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class UserResponseDto {
  @ApiProperty({
    description: 'ID único do usuário',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  id: string;

  @ApiProperty({
    description: 'Nome completo do usuário',
    example: 'João Silva',
  })
  nome: string;

  @ApiProperty({
    description: 'Endereço completo do usuário',
    example: 'Rua das Flores, 123, Centro, São Paulo - SP',
  })
  endereco: string;

  @ApiProperty({
    description: 'Número de telefone único para login',
    example: '11999999999',
  })
  telefone: string;

  @ApiPropertyOptional({
    description: 'E-mail do usuário',
    example: 'joao@email.com',
  })
  email?: string;

  @ApiProperty({
    description: 'Data de criação da conta',
    example: '2024-10-21T10:30:00Z',
  })
  dataCriacao: Date;
}