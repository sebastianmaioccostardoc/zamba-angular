import { ChangeDetectionStrategy, Component } from '@angular/core';
import { _HttpClient } from '@delon/theme';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-account-settings-security',
  templateUrl: './security.component.html',
  styles: [
    `
      

      nz-select {
        margin: 0 8px 10px 0;
        width: 200px;
      }
    `
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProAccountSettingsSecurityComponent {
  constructor(public msg: NzMessageService) { }
}
