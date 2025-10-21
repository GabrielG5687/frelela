import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { User } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    // Verificar se o telefone já existe
    const existingUserByPhone = await this.userRepository.findOne({
      where: { telefone: createUserDto.telefone },
    });

    if (existingUserByPhone) {
      throw new ConflictException('Telefone já cadastrado');
    }

    // Verificar se o email já existe
    const existingUserByEmail = await this.userRepository.findOne({
      where: { email: createUserDto.email },
    });

    if (existingUserByEmail) {
      throw new ConflictException('Email já cadastrado');
    }

    // Hash da senha
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(createUserDto.senha, saltRounds);

    const user = this.userRepository.create({
      ...createUserDto,
      senha: hashedPassword,
    });

    const savedUser = await this.userRepository.save(user);
    
    // Remover senha do retorno
    const { senha, ...userWithoutPassword } = savedUser;
    return userWithoutPassword as User;
  }

  async findAll(): Promise<User[]> {
    const users = await this.userRepository.find({
      select: ['id', 'nome', 'endereco', 'telefone', 'email', 'dataCriacao'],
    });
    return users;
  }

  async findOne(id: string): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { id },
      select: ['id', 'nome', 'endereco', 'telefone', 'email', 'dataCriacao'],
    });

    if (!user) {
      throw new NotFoundException('Usuário não encontrado');
    }

    return user;
  }

  async findByPhone(telefone: string): Promise<User | null> {
    return this.userRepository.findOne({
      where: { telefone },
    });
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.userRepository.findOne({
      where: { email },
    });
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.findOne(id);

    if (updateUserDto.senha) {
      const saltRounds = 10;
      updateUserDto.senha = await bcrypt.hash(updateUserDto.senha, saltRounds);
    }

    if (updateUserDto.telefone && updateUserDto.telefone !== user.telefone) {
      const existingUser = await this.userRepository.findOne({
        where: { telefone: updateUserDto.telefone },
      });

      if (existingUser) {
        throw new ConflictException('Telefone já cadastrado');
      }
    }

    Object.assign(user, updateUserDto);
    const savedUser = await this.userRepository.save(user);
    
    // Remover senha do retorno
    const { senha, ...userWithoutPassword } = savedUser;
    return userWithoutPassword as User;
  }

  async remove(id: string): Promise<void> {
    const user = await this.findOne(id);
    await this.userRepository.remove(user);
  }
}