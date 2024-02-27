import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { api } from './types/api.types';

@Controller('api')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getApiVersion(): api {
    return this.appService.getVersion();
  }
}
