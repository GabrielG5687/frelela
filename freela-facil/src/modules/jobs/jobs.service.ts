import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like, Not, SelectQueryBuilder } from 'typeorm';
import { Job } from './job.entity';
import { CreateJobDto } from './dto/create-job.dto';
import { UpdateJobDto } from './dto/update-job.dto';
import { SearchJobDto } from './dto/search-job.dto';
import { SearchResultDto } from './dto/search-result.dto';

@Injectable()
export class JobsService {
  constructor(
    @InjectRepository(Job)
    private jobRepository: Repository<Job>,
  ) { }

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
    const searchTerm = `%${query.toLowerCase()}%`;

    return this.jobRepository
      .createQueryBuilder('job')
      .leftJoinAndSelect('job.usuario', 'usuario')
      .select([
        'job.id',
        'job.titulo',
        'job.descricao',
        'job.categoria',
        'job.localizacao',
        'job.tipoContrato',
        'job.salario',
        'job.valorSugerido',
        'job.experiencia',
        'job.dataPublicacao',
        'job.status',
        'usuario.id',
        'usuario.nome',
        'usuario.telefone',
        'usuario.email',
      ])
      .where(
        '(LOWER(job.titulo) LIKE :search OR LOWER(job.descricao) LIKE :search)',
        { search: searchTerm }
      )
      .orderBy('job.dataPublicacao', 'DESC')
      .getMany();
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

  /**
   * BUSCA AVANÇADA COM MÚLTIPLOS FILTROS
   */
  async searchAdvanced(searchDto: SearchJobDto): Promise<SearchResultDto> {
    // Valores padrão
    const page = searchDto.page || 1;
    const limit = searchDto.limit || 20;
    const skip = (page - 1) * limit;

    // Criar query builder
    const queryBuilder = this.jobRepository
      .createQueryBuilder('job')
      .leftJoinAndSelect('job.usuario', 'usuario')
      .select([
        'job.id',
        'job.titulo',
        'job.descricao',
        'job.categoria',
        'job.localizacao',
        'job.tipoContrato',
        'job.salario',
        'job.valorSugerido',
        'job.experiencia',
        'job.dataPublicacao',
        'job.status',
        'usuario.id',
        'usuario.nome',
        'usuario.telefone',
        'usuario.email',
      ]);

    // Aplicar filtros
    this.applyFilters(queryBuilder, searchDto);

    // Aplicar ordenação
    this.applyOrdering(queryBuilder, searchDto);

    // Buscar apenas jobs ativos
    queryBuilder.andWhere('job.status = :status', { status: 'ATIVO' });

    // Executar query com paginação
    const [jobs, total] = await queryBuilder
      .skip(skip)
      .take(limit)
      .getManyAndCount();

    // Calcular metadados de paginação
    const totalPages = Math.ceil(total / limit);

    return {
      jobs,
      total,
      page,
      totalPages,
      hasNext: page < totalPages,
      hasPrev: page > 1,
    };
  }

  /**
   * APLICAR FILTROS NA QUERY
   */
  private applyFilters(
    queryBuilder: SelectQueryBuilder<Job>,
    searchDto: SearchJobDto,
  ): void {
    // 1. BUSCA POR TEXTO (título, descrição, categoria, localizacao)
    if (searchDto.query) {
      const searchTerm = `%${searchDto.query.toLowerCase()}%`;
      queryBuilder.andWhere(
        '(LOWER(job.titulo) LIKE :search OR ' +
        'LOWER(job.descricao) LIKE :search OR ' +
        'LOWER(job.categoria) LIKE :search OR ' +
        'LOWER(job.localizacao) LIKE :search)',
        { search: searchTerm },
      );
    }

    // 2. FILTRO POR CATEGORIA
    if (searchDto.categoria) {
      queryBuilder.andWhere('LOWER(job.categoria) = LOWER(:categoria)', {
        categoria: searchDto.categoria,
      });
    }

    // 3. FILTRO POR LOCALIZAÇÃO
    if (searchDto.localizacao) {
      queryBuilder.andWhere('LOWER(job.localizacao) LIKE :localizacao', {
        localizacao: `%${searchDto.localizacao.toLowerCase()}%`,
      });
    }

    // 4. FILTRO POR TIPO DE CONTRATO
    if (searchDto.tipoContrato) {
      queryBuilder.andWhere('LOWER(job.tipoContrato) = LOWER(:tipoContrato)', {
        tipoContrato: searchDto.tipoContrato,
      });
    }

    // 5. FILTRO POR FAIXA SALARIAL
    if (searchDto.salarioMin) {
      queryBuilder.andWhere(
        '(job.salario >= :salarioMin OR job.valorSugerido >= :salarioMin)',
        { salarioMin: searchDto.salarioMin },
      );
    }

    if (searchDto.salarioMax) {
      queryBuilder.andWhere(
        '(job.salario <= :salarioMax OR job.valorSugerido <= :salarioMax)',
        { salarioMax: searchDto.salarioMax },
      );
    }

    // 6. FILTRO POR NÍVEL DE EXPERIÊNCIA
    if (searchDto.experiencia) {
      queryBuilder.andWhere('LOWER(job.experiencia) = LOWER(:experiencia)', {
        experiencia: searchDto.experiencia,
      });
    }
  }

  /**
   * APLICAR ORDENAÇÃO
   */
  private applyOrdering(
    queryBuilder: SelectQueryBuilder<Job>,
    searchDto: SearchJobDto,
  ): void {
    const orderBy = searchDto.orderBy || 'data';

    switch (orderBy) {
      case 'relevancia':
        // Se tiver busca por texto, ordena por relevância
        if (searchDto.query) {
          const exactMatch = searchDto.query.toLowerCase();
          const search = `%${searchDto.query.toLowerCase()}%`;

          // Prioriza match no título sobre descrição
          queryBuilder.addOrderBy(
            `CASE 
              WHEN LOWER(job.titulo) LIKE '${exactMatch}' THEN 1
              WHEN LOWER(job.titulo) LIKE '${search}' THEN 2
              WHEN LOWER(job.descricao) LIKE '${search}' THEN 3
              ELSE 4
            END`,
            'ASC',
          );
        }
        // Depois ordena por data (mais recentes primeiro)
        queryBuilder.addOrderBy('job.dataPublicacao', 'DESC');
        break;

      case 'salario':
        queryBuilder.orderBy(
          'COALESCE(job.salario, job.valorSugerido)',
          'DESC',
        );
        break;

      case 'data':
      default:
        queryBuilder.orderBy('job.dataPublicacao', 'DESC');
        break;
    }
  }

  /**
   * BUSCA SIMPLES (para autocompletar)
   */
  async quickSearch(query: string, limit: number = 5): Promise<Job[]> {
    if (!query || query.length < 2) {
      return [];
    }

    return this.jobRepository
      .createQueryBuilder('job')
      .select(['job.id', 'job.titulo', 'job.categoria', 'job.localizacao'])
      .where('job.status = :status', { status: 'ATIVO' })
      .andWhere(
        '(LOWER(job.titulo) LIKE :search OR LOWER(job.categoria) LIKE :search)',
        { search: `%${query.toLowerCase()}%` },
      )
      .orderBy('job.dataPublicacao', 'DESC')
      .limit(limit)
      .getMany();
  }

  /**
   * SUGESTÕES DE CATEGORIAS POPULARES
   */
  async getPopularCategories(limit: number = 10): Promise<any[]> {
    return this.jobRepository
      .createQueryBuilder('job')
      .select('job.categoria', 'categoria')
      .addSelect('COUNT(*)', 'total')
      .where('job.status = :status', { status: 'ATIVO' })
      .andWhere('job.categoria IS NOT NULL')
      .groupBy('job.categoria')
      .orderBy('total', 'DESC')
      .limit(limit)
      .getRawMany();
  }

  /**
   * SUGESTÕES DE LOCALIZAÇÕES POPULARES
   */
  async getPopularLocations(limit: number = 10): Promise<any[]> {
    return this.jobRepository
      .createQueryBuilder('job')
      .select('job.localizacao', 'localizacao')
      .addSelect('COUNT(*)', 'total')
      .where('job.status = :status', { status: 'ATIVO' })
      .andWhere('job.localizacao IS NOT NULL')
      .groupBy('job.localizacao')
      .orderBy('total', 'DESC')
      .limit(limit)
      .getRawMany();
  }

  /**
   * BUSCA DE VAGAS SIMILARES (baseado em uma vaga específica)
   */
  async findSimilarJobs(jobId: string, limit: number = 5): Promise<Job[]> {
    const job = await this.jobRepository.findOne({ where: { id: jobId } });

    if (!job) {
      return [];
    }

    return this.jobRepository
      .createQueryBuilder('job')
      .leftJoinAndSelect('job.usuario', 'usuario')
      .where('job.id != :jobId', { jobId })
      .andWhere('job.status = :status', { status: 'ATIVO' })
      .andWhere(
        '(LOWER(job.categoria) = LOWER(:categoria) OR ' +
        'LOWER(job.titulo) LIKE :search OR ' +
        'LOWER(job.experiencia) = LOWER(:experiencia))',
        {
          categoria: job.categoria,
          search: `%${job.categoria?.toLowerCase()}%`,
          experiencia: job.experiencia,
        },
      )
      .orderBy('job.dataPublicacao', 'DESC')
      .limit(limit)
      .getMany();
  }
}