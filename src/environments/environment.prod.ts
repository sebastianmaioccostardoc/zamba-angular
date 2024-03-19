import { Environment } from '@delon/theme';

export const environment = {
  production: true,
  useHash: true,
  apiRestBasePath: 'http://www.zambabpm.com.ar/zambaweb.restapi/api/Dashboard',
  apiWebViews: 'http://www.zambabpm.com.ar/zamba.web/Views',
  cliente: 'zamba',
  api: {
    baseUrl: './',
    refreshTokenEnabled: true,
    refreshTokenType: 'auth-refresh'
  }
} as Environment;
