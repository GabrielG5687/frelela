import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like, Not } from 'typeorm';
import { Job } from './job.entity';
import { CreateJobDto } from './dto/create-job.dto';
import { UpdateJobDto } from './dto/update-job.dto';

@Injectable()
export class JobsService {
  constructor(
    @InjectRepository(Job)
    private jobRepository: Repository<Job>,
  ) {}

  async create(createJobDto: CreateJobDto, usuarioId: string): Promise<Job> {
    const job = this.jobRepository.create({
      ...createJobDto,
      usuarioId,
    });

    return this.jobRepository.save(job);
  }

  async findAll(): Promise<Job[]> {
    return this.jobRepository.find({
      relations: ['usuario'],
      select: {
        usuario: {
          id: true,
          nome: true,
          telefone: true,
          email: true,
        },
      },
      order: {
        dataPublicacao: 'DESC',
      },
    });
  }

  //traz todos os trabalhos menos do usuário autenticado
  async findAllExcludingUser(usuarioId: string): Promise<Job[]> {
    return this.jobRepository.find({
      where: { usuarioId: Not(usuarioId) },
      relations: ['usuario'],
      select: {
        usuario: {
          id: true,
          nome: true,
          telefone: true,
          email: true,
        },
      },
      order: {
        dataPublicacao: 'DESC',
      },
    });
  }

  async findByUser(usuarioId: string): Promise<Job[]> {
    return this.jobRepository.find({
      where: { usuarioId },
      relations: ['usuario'],
      select: {
        usuario: {
          id: true,
          nome: true,
          telefone: true,
          email: true,
        },
      },
      order: {
        dataPublicacao: 'DESC',
      },
    });
  }

  async findOne(id: string): Promise<Job> {
    const job = await this.jobRepository.findOne({
      where: { id },
      relations: ['usuario'],
      select: {
        usuario: {
          id: true,
          nome: true,
          telefone: true,
          email: true,
        },
      },
    });

    if (!job) {
      throw new NotFoundException('Trabalho não encontrado');
    }

    return job;
  }

  async search(query: string): Promise<Job[]> {
    return this.jobRepository.find({
      where: [
        { titulo: Like(`%${query}%`) },
        { descricao: Like(`%${query}%`) },
      ],
      relations: ['usuario'],
      select: {
        usuario: {
          id: true,
          nome: true,
          telefone: true,
          email: true,
        },
      },
      order: {
        dataPublicacao: 'DESC',
      },
    });
  }

  async update(id: string, updateJobDto: UpdateJobDto, usuarioId: string): Promise<Job> {
    const job = await this.findOne(id);

    // Verificar se o usuário é o dono do trabalho
    if (job.usuarioId !== usuarioId) {
      throw new ForbiddenException('Você não tem permissão para editar este trabalho');
    }

    Object.assign(job, updateJobDto);
    return this.jobRepository.save(job);
  }

  async remove(id: string, usuarioId: string): Promise<void> {
    const job = await this.findOne(id);

    // Verificar se o usuário é o dono do trabalho
    if (job.usuarioId !== usuarioId) {
      throw new ForbiddenException('Você não tem permissão para remover este trabalho');
    }

    await this.jobRepository.remove(job);
  }
}