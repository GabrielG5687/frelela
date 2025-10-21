import { Controller, Get, HttpStatus } from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
} from '@nestjs/swagger';
import { AppService } from './app.service';

@ApiTags('app')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @ApiOperation({ 
    summary: 'Mensagem de boas-vindas',
    description: 'Retorna mensagem de boas-vindas da API'
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Mensagem de boas-vindas',
    schema: {
      type: 'string',
      example: 'Welcome to FreelaFácil API!',
    },
  })
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('health')
  @ApiOperation({ 
    summary: 'Health Check',
    description: 'Verifica se a API está funcionando'
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Status da API',
    schema: {
      type: 'object',
      properties: {
        status: {
          type: 'string',
          example: 'OK',
        },
        message: {
          type: 'string',
          example: 'FreelaFácil API is running',
        },
        timestamp: {
          type: 'string',
          example: '2024-10-21T10:30:00.000Z',
        },
      },
    },
  })
  getHealth(): object {
    return {
      status: 'OK',
      message: 'FreelaFácil API is running',
      timestamp: new Date().toISOString(),
    };
  }
}