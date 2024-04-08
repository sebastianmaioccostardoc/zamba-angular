import { Environment } from '@delon/theme';

export const environment = {
  production: true,
  useHash: true,
  apiRestBasePath: 'https://www.zamba.com.ar/zambaweb.restapi/api/Dashboard',
  zambaWeb: 'https://www.zamba.com.ar/Zamba.Web',
  cliente: 'zamba',
  api: {
    baseUrl: './',
    refreshTokenEnabled: true,
    refreshTokenType: 'auth-refresh'
  }
} as Environment;
