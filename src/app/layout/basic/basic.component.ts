import { Component, OnInit } from '@angular/core';
import { SettingsService, User } from '@delon/theme';
import { LayoutDefaultOptions } from '@delon/theme/layout-default';
import { environment } from '@env/environment';
import { ZambaService } from '../../services/zamba/zamba.service'

@Component({
  selector: 'layout-basic',
  templateUrl: './basic.component.html'
})
export class LayoutBasicComponent implements OnInit {

  constructor(
    private settings: SettingsService,
    private ZambaService: ZambaService) { }
  ngOnInit(): void {
    this.ZambaService.GetinfoSideBar();
  }


  options: LayoutDefaultOptions = {
    logoExpanded: `./assets/logo-full.svg`,
    logoCollapsed: `./assets/logo.svg`,
    hideAside: environment['cliente'] == `zamba` ? this.ZambaService.GetConfigUserSidbar() : false,
  };
  searchToggleStatus = false;
  showSettingDrawer = !environment.production;
  get user(): User {
    return this.settings.user;
  }

}
