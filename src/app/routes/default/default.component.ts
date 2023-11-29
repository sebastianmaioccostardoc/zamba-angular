import { ChangeDetectionStrategy, Component } from '@angular/core';
import { _HttpClient } from '@delon/theme';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-account-settings-default',
  templateUrl: './default.component.html',
  styleUrls: ['default.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DefaultComponent {
  constructor(public msg: NzMessageService) {

  }

}
