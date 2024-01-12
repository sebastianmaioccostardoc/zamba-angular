import { HttpContext } from '@angular/common/http';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, OnDestroy, Optional, ViewChild, TemplateRef, OnInit, LOCALE_ID, Directive, ElementRef, Renderer2 } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { StartupService } from '@core';
import { ReuseTabService } from '@delon/abc/reuse-tab';
import { ALLOW_ANONYMOUS, DA_SERVICE_TOKEN, ITokenService, SocialOpenType, SocialService } from '@delon/auth';
import { SettingsService, _HttpClient } from '@delon/theme';
import { environment } from '@env/environment';
import { NzTabChangeEvent } from 'ng-zorro-antd/tabs';
import { catchError, finalize, throwError, Subject } from 'rxjs';
import { startOfDay, endOfDay, subDays, addDays, endOfMonth, isSameDay, isSameMonth, addHours, parse } from 'date-fns';
import { CalendarEvent, CalendarEventAction, CalendarView } from 'angular-calendar';
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

  view: CalendarView = CalendarView.Month;

  CalendarView = CalendarView;

  locale: string = es?.code || 'en-US';

  refresh = new Subject<void>();

  isVisible = false;

  //event modal properties
  eventTitle: string = "";
  start: Date = new Date();
  end: Date = new Date();

  eventPrimaryColor: string = "#ad2121";

  eventSecondaryColor: string = "#cccccc";

  eventTextColor: string = "#000000";


  actions: CalendarEventAction[] = [
    {
      label: '<i class="fas fa-fw fa-pencil-alt"></i>',
      a11yLabel: 'Edit',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.handleEvent('Edited', event);
      },
    },
    {
      label: '<i class="fas fa-fw fa-trash-alt"></i>',
      a11yLabel: 'Delete',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.events = this.events.filter((iEvent) => iEvent !== event);
        this.handleEvent('Deleted', event);
      },
    },
  ];



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



  handleEvent(action: string, event: CalendarEvent): void {
    /*
    this.modalData = { event, action };
    this.modal.open(this.modalContent, { size: 'lg' });
    */
  }


  handleOk(): void {
    console.log('Button ok clicked!');
    this.isVisible = false;
  }

  handleCancel(): void {
    console.log('Button cancel clicked!');
    this.isVisible = false;
  }
  showModal(event: Event, date: Date): void {
    this.isVisible = true;
    this.eventTitle = "";
    this.eventPrimaryColor = "#ad2121";
    this.eventSecondaryColor = "#cccccc";
    this.eventTextColor = "#000000";
    this.start = date;
    this.end = new Date(date.getTime());
    this.end.setHours(this.start.getHours() + 1);
    console.log("valor de date: ", date);
    event.preventDefault();
  }
  addEvent(): void {

    //imprimo valores del modal
    console.log("valor de title: ", this.eventTitle);
    console.log("valor de start: ", this.start);
    console.log("valor de end: ", this.end);

    let start: Date;
    let end: Date;

    if (this.start instanceof Date) {
      start = this.start;
    } else {
      let formatString = "dd/MM/yyyy HH:mm";
      start = parse(this.start, formatString, new Date());
    }

    if (this.end instanceof Date) {
      end = this.end;
    } else {
      let formatString = "dd/MM/yyyy HH:mm";
      end = parse(this.end, formatString, new Date());
    }

    //colors
    let color: EventColor = {
      primary: this.eventPrimaryColor,
      secondary: this.eventSecondaryColor,
      secondaryText: this.eventTextColor
    };

    this.events = [
      ...this.events,
      {
        title: this.eventTitle,

        start: start,
        end: end,
        color: color,
        draggable: true,
        resizable: {
          beforeStart: true,
          afterEnd: true,
        },
      },
    ];
    this.refresh.next();
    this.isVisible = false;
  }


}



