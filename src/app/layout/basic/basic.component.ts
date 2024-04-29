import { Component, OnInit } from '@angular/core';
import { SettingsService, User } from '@delon/theme';
import { LayoutDefaultOptions } from '@delon/theme/layout-default';
import { environment } from '@env/environment';

import { ZambaService } from '../../services/zamba/zamba.service';
import { MessageListenerService } from 'src/app/services/message-listener.service';

@Component({
  selector: 'layout-basic',
  templateUrl: './basic.component.html',
  styleUrls: ['./basic.component.less']
})
export class LayoutBasicComponent implements OnInit {
  constructor(
    private settings: SettingsService,
    private ZambaService: ZambaService,
    private messageListener: MessageListenerService
  ) { }
  ngOnInit(): void {
    this.ZambaService.GetSidebarItems();
    this.settings.setLayout('collapsed', true);
    this.messageListener.startListening();
  }



  options: LayoutDefaultOptions = {
    logoExpanded: `./assets/logo-zamba-rrhh-t.svg`,
    logoCollapsed: `./assets/logo-zamba-rrhh-iso.png`,
    hideAside: false
  };
  searchToggleStatus = false;
  showSettingDrawer = false;
  get user(): User {
    return this.settings.user;
  }
}
