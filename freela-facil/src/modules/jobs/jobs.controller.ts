import { 
  Controller, 
  Get, 
  Post, 
  Body, 
  Patch, 
  Param, 
  Delete,
  UseGuards,
  Request,
  Query,
  HttpStatus,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiParam,
  ApiQuery,
  ApiBody,
} from '@nestjs/swagger';
import { JobsService } from './jobs.service';
import { CreateJobDto } from './dto/create-job.dto';
import { UpdateJobDto } from './dto/update-job.dto';
import { JobResponseDto } from './dto/job-response.dto';
import { JwtAuthGuard } from '../../auth/jwt-auth.guard';

@ApiTags('jobs')
@Controller('jobs')
export class JobsController {
  constructor(private readonly jobsService: JobsService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ 
    summary: 'Criar novo trabalho',
    description: 'Cria um novo trabalho vinculado ao usuário autenticado'
  })
  @ApiBody({ type: CreateJobDto })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Trabalho criado com sucesso',
    type: JobResponseDto,
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Token JWT inválido ou ausente',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Dados inválidos',
  })
  create(@Body() createJobDto: CreateJobDto, @Request() req) {
    return this.jobsService.create(createJobDto, req.user.userId);
  }

  @Get()
  @ApiOperation({ 
    summary: 'Listar todos os trabalhos',
    description: 'Retorna lista de todos os trabalhos disponíveis'
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Lista de trabalhos retornada com sucesso',
    type: [JobResponseDto],
  })
 findAll(@Request() req) {
    return this.jobsService.findAll();
  }


  @Get('search')
  @ApiOperation({ 
    summary: 'Buscar trabalhos',
    description: 'Busca trabalhos por título ou descrição'
  })
  @ApiQuery({
    name: 'q',
    description: 'Termo de busca',
    example: 'desenvolvimento',
    required: false,
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Resultados da busca retornados com sucesso',
    type: [JobResponseDto],
  })
  search(@Query('q') query: string) {
    if (!query) {
      return this.jobsService.findAll();
    }
    return this.jobsService.search(query);
  }

  @UseGuards(JwtAuthGuard)
  @Get('my-jobs')
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ 
    summary: 'Listar meus trabalhos',
    description: 'Retorna lista de trabalhos criados pelo usuário autenticado'
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Lista de trabalhos do usuário retornada com sucesso',
    type: [JobResponseDto],
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Token JWT inválido ou ausente',
  })
  findMyJobs(@Request() req) {
    return this.jobsService.findByUser(req.user.userId);
  }

  @Get(':id')
  @ApiOperation({ 
    summary: 'Buscar trabalho por ID',
    description: 'Retorna detalhes de um trabalho específico'
  })
  @ApiParam({
    name: 'id',
    description: 'ID único do trabalho',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Trabalho encontrado',
    type: JobResponseDto,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Trabalho não encontrado',
  })
  findOne(@Param('id') id: string) {
    return this.jobsService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ 
    summary: 'Atualizar trabalho',
    description: 'Atualiza um trabalho (apenas o criador pode editar)'
  })
  @ApiParam({
    name: 'id',
    description: 'ID único do trabalho',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @ApiBody({ type: UpdateJobDto })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Trabalho atualizado com sucesso',
    type: JobResponseDto,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Trabalho não encontrado',
  })
  @ApiResponse({
    status: HttpStatus.FORBIDDEN,
    description: 'Você não tem permissão para editar este trabalho',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Token JWT inválido ou ausente',
  })
  update(@Param('id') id: string, @Body() updateJobDto: UpdateJobDto, @Request() req) {
    return this.jobsService.update(id, updateJobDto, req.user.userId);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ 
    summary: 'Remover trabalho',
    description: 'Remove um trabalho (apenas o criador pode remover)'
  })
  @ApiParam({
    name: 'id',
    description: 'ID único do trabalho',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: 'Trabalho removido com sucesso',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Trabalho não encontrado',
  })
  @ApiResponse({
    status: HttpStatus.FORBIDDEN,
    description: 'Você não tem permissão para remover este trabalho',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Token JWT inválido ou ausente',
  })
  remove(@Param('id') id: string, @Request() req) {
    return this.jobsService.remove(id, req.user.userId);
  }
}
