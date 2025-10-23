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
import { SearchJobDto } from './dto/search-job.dto';
import { SearchResultDto } from './dto/search-result.dto';
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

  @Post('search/advanced')
  @ApiOperation({ 
    summary: 'Busca avançada de trabalhos',
    description: 'Busca trabalhos com múltiplos filtros e paginação'
  })
  @ApiBody({ type: SearchJobDto })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Resultados da busca avançada retornados com sucesso',
    type: SearchResultDto,
  })
  searchAdvanced(@Body() searchDto: SearchJobDto) {
    return this.jobsService.searchAdvanced(searchDto);
  }

  @Get('search/quick')
  @ApiOperation({ 
    summary: 'Busca rápida para autocompletar',
    description: 'Busca rápida para sugestões de autocompletar'
  })
  @ApiQuery({
    name: 'q',
    description: 'Termo de busca',
    example: 'dev',
    required: true,
  })
  @ApiQuery({
    name: 'limit',
    description: 'Limite de resultados',
    example: 5,
    required: false,
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Sugestões retornadas com sucesso',
    type: [JobResponseDto],
  })
  quickSearch(
    @Query('q') query: string,
    @Query('limit') limit?: number,
  ) {
    return this.jobsService.quickSearch(query, limit);
  }

  @Get('categories/popular')
  @ApiOperation({ 
    summary: 'Categorias populares',
    description: 'Retorna as categorias mais populares'
  })
  @ApiQuery({
    name: 'limit',
    description: 'Limite de resultados',
    example: 10,
    required: false,
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Categorias populares retornadas com sucesso',
  })
  getPopularCategories(@Query('limit') limit?: number) {
    return this.jobsService.getPopularCategories(limit);
  }

  @Get('locations/popular')
  @ApiOperation({ 
    summary: 'Localizações populares',
    description: 'Retorna as localizações mais populares'
  })
  @ApiQuery({
    name: 'limit',
    description: 'Limite de resultados',
    example: 10,
    required: false,
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Localizações populares retornadas com sucesso',
  })
  getPopularLocations(@Query('limit') limit?: number) {
    return this.jobsService.getPopularLocations(limit);
  }

  @Get(':id/similar')
  @ApiOperation({ 
    summary: 'Trabalhos similares',
    description: 'Retorna trabalhos similares baseado em uma vaga específica'
  })
  @ApiParam({
    name: 'id',
    description: 'ID único do trabalho',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @ApiQuery({
    name: 'limit',
    description: 'Limite de resultados',
    example: 5,
    required: false,
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Trabalhos similares retornados com sucesso',
    type: [JobResponseDto],
  })
  findSimilarJobs(
    @Param('id') id: string,
    @Query('limit') limit?: number,
  ) {
    return this.jobsService.findSimilarJobs(id, limit);
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
