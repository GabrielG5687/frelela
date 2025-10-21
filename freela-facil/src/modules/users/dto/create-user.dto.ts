import { IsString, IsEmail, MinLength, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({
    description: 'Nome completo do usuário',
    example: 'João Silva',
    minLength: 2,
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  nome: string;

  @ApiProperty({
    description: 'Endereço completo do usuário',
    example: 'Rua das Flores, 123, Centro, São Paulo - SP',
  })
  @IsString()
  @IsNotEmpty()
  endereco: string;

  @ApiProperty({
    description: 'Número de telefone único para login',
    example: '11999999999',
  })
  @IsString()
  @IsNotEmpty()
  telefone: string;

  @ApiProperty({
    description: 'E-mail do usuário',
    example: 'joao@email.com',
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    description: 'Senha do usuário',
    example: 'minhasenha123',
    minLength: 6,
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  senha: string;
}