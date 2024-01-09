import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { WidgetsComponent } from './widgets/widgets.component';
import { CalendarComponent } from './calendar/calendar.component';

const routes: Routes = [{ path: 'calendar', component: CalendarComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WidgetsRoutingModule { }
