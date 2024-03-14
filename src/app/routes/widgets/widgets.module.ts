import { NgModule, Type } from '@angular/core';
import { G2MiniAreaModule } from '@delon/chart/mini-area';
import { G2MiniBarModule } from '@delon/chart/mini-bar';
import { SharedModule } from '@shared';
import { NzCarouselModule } from 'ng-zorro-antd/carousel';

import { WidgetsComponent } from './widgets/widgets.component';
import { WidgetsRoutingModule } from './widgets-routing.module';
import { CalendarComponent } from './calendar/calendar.component';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { ContextMenuModule } from '@perfectmemory/ngx-contextmenu';
import { FlatpickrModule } from 'angularx-flatpickr';

import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzInputModule } from 'ng-zorro-antd/input';
import { CarouselComponent } from './carousel/carousel.component';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzSkeletonModule } from 'ng-zorro-antd/skeleton';
import { VideoplayerComponent } from './videoplayer/videoplayer.component';
import { YouTubePlayerModule, YouTubePlayer } from '@angular/youtube-player';

import { PendingTasksComponent } from './pending-tasks/pending-tasks.component';
import { ScrollingModule } from '@angular/cdk/scrolling';


const COMPONENTS: Array<Type<void>> = [WidgetsComponent, CalendarComponent, CarouselComponent, VideoplayerComponent, PendingTasksComponent];

@NgModule({
  imports: [SharedModule, WidgetsRoutingModule, NzCarouselModule, G2MiniBarModule, G2MiniAreaModule,
    FlatpickrModule.forRoot(),
    NzModalModule,
    NzInputModule,
    NzIconModule,
    NzGridModule,
    NzTypographyModule,
    NzSelectModule,
    YouTubePlayerModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory,
    }),
    NzLayoutModule,
    ContextMenuModule,
    NzSkeletonModule,
    ScrollingModule
  ],
  declarations: COMPONENTS,
  exports: COMPONENTS,
})
export class WidgetsModule { }
