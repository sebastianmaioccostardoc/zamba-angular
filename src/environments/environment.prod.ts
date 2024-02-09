import { Environment } from '@delon/theme';

export const environment = {
  production: true,
  useHash: true,
  apiRestBasePath: "http://localhost/ZambaWeb.RestApi/api/Dashboard",
  apiWebViews: "http://localhost/Zamba.Web/Views",
  cliente: 'zamba',
  api: {
    baseUrl: './',
    refreshTokenEnabled: true,
    refreshTokenType: 'auth-refresh'
  }
} as Environment;
