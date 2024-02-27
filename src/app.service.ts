import { Injectable } from '@nestjs/common';
import { api } from './types/api.types';

@Injectable()
export class AppService {
  getVersion(): api {
    const version = {
      appName: 'research pal api',
      appVersion: '1.0',
    };
    return version;
  }
}
