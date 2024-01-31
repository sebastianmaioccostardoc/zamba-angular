import { ChangeDetectionStrategy, Component, EventEmitter, Inject, Input, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { DA_SERVICE_TOKEN, ITokenService } from '@delon/auth';
import { _HttpClient } from '@delon/theme';
import { GridsterItem } from 'angular-gridster2';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'videoplayer',
  templateUrl: './videoplayer.component.html',
  styleUrls: ['videoplayer.component.css']
})
export class VideoplayerComponent implements OnInit {
  @Input()
  widget: GridsterItem = {
    type: '',
    title: '',
    cols: 0,
    rows: 0,
    x: 0,
    y: 0,
    resizeEvent: new EventEmitter<GridsterItem>()
  };
  @Input()
  resizeEvent: EventEmitter<GridsterItem> = new EventEmitter<GridsterItem>();
  src: SafeResourceUrl;
  constructor(public msg: NzMessageService, @Inject(DA_SERVICE_TOKEN) private tokenService: ITokenService, private router: Router, private sanitizer: DomSanitizer) {
    this.src = this.sanitizer.bypassSecurityTrustResourceUrl('https://www.youtube.com/embed/CsAT8LQf8gw?autoplay=1');
  }
  ngOnInit(): void {
    const tokenData = this.tokenService.get();
  }
}
