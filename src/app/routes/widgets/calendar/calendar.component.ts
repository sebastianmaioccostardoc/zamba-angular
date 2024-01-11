import { HttpContext } from '@angular/common/http';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, OnDestroy, Optional, ViewChild, TemplateRef, OnInit, LOCALE_ID } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { StartupService } from '@core';
import { ReuseTabService } from '@delon/abc/reuse-tab';
import { ALLOW_ANONYMOUS, DA_SERVICE_TOKEN, ITokenService, SocialOpenType, SocialService } from '@delon/auth';
import { SettingsService, _HttpClient } from '@delon/theme';
import { environment } from '@env/environment';
import { NzTabChangeEvent } from 'ng-zorro-antd/tabs';
import { catchError, finalize, throwError, Subject } from 'rxjs';
import { startOfDay, endOfDay, subDays, addDays, endOfMonth, isSameDay, isSameMonth, addHours } from 'date-fns';
import { CalendarEvent, CalendarView } from 'angular-calendar';
import { enUS, es } from 'date-fns/locale';
import ngEn from '@angular/common/locales/en';
import ngEs from '@angular/common/locales/es-AR';
import { EventColor } from 'calendar-utils';

const colors: Record<string, EventColor> = {
  red: {
    primary: '#ad2121',
    secondary: '#FAE3E3',
  },
  blue: {
    primary: '#1e90ff',
    secondary: '#D1E8FF',
  },
  yellow: {
    primary: '#e3bc08',
    secondary: '#FDF1BA',
  },
};



@Component({
  selector: 'calendar-widget',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.less'],
  providers: [SocialService],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CalendarComponent implements OnInit {
  viewDate: Date = new Date();
  events: CalendarEvent[] = [];

  view: CalendarView = CalendarView.Week;

  CalendarView = CalendarView;

  locale: string = es?.code || 'en-US';

  refresh = new Subject<void>();


  constructor(
    private fb: FormBuilder,
    private router: Router,
    private settingsService: SettingsService,
    private socialService: SocialService,
    @Optional()
    @Inject(ReuseTabService)
    private reuseTabService: ReuseTabService,
    @Inject(DA_SERVICE_TOKEN) private tokenService: ITokenService,
    private startupSrv: StartupService,
    private http: _HttpClient,
    private cdr: ChangeDetectorRef,

    @Inject(LOCALE_ID) locale: string,
  ) {

  }
  ngOnInit(): void {
  }


  setView(view: CalendarView) {
    this.view = view;
  }


  addEvent(): void {
    this.events = [
      ...this.events,
      {
        title: 'New event',
        start: startOfDay(new Date()),
        end: endOfDay(new Date()),
        color: colors["red"],
        draggable: true,
        resizable: {
          beforeStart: true,
          afterEnd: true,
        },
      },
    ];
  }

}
