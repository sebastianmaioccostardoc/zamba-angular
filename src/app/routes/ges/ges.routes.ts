import { Routes } from '@angular/router';

export const GesRoutes: Routes = [


    {
        path: 'empleado',
        loadComponent: () => import('./empleado/empleado.component').then(c => c.EmpleadoComponent),
    }

];
