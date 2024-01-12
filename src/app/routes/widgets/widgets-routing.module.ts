import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { WidgetsComponent } from './widgets/widgets.component';
import { CalendarComponent } from './calendar/calendar.component';
import { CarouselComponent } from './carousel/carousel.component';

const routes: Routes = [
  { path: 'calendar', component: CalendarComponent },
  { path: 'carousel', component: CarouselComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WidgetsRoutingModule { }
