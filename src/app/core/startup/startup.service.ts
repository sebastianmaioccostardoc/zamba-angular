import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { ALAIN_I18N_TOKEN, MenuService, SettingsService, TitleService } from '@delon/theme';
import { environment } from '../../../environments/environment';
import { ZambaService } from '../../services/zamba/zamba.service'

import { NzIconService } from 'ng-zorro-antd/icon';
import { Observable, zip, catchError, map, of } from 'rxjs';

import { ICONS } from '../../../style-icons';
import { ICONS_AUTO } from '../../../style-icons-auto';
import { I18NService } from '../i18n/i18n.service';

/**
 * Used for application startup
 * Generally used to get the basic data of the application, like: Menu Data, User Data, etc.
 */
@Injectable()
export class StartupService {
  constructor(
    iconSrv: NzIconService,
    @Inject(ALAIN_I18N_TOKEN) private i18n: I18NService,
    private ZambaService: ZambaService
  ) {
    iconSrv.addIcon(...ICONS_AUTO, ...ICONS);
  }

  load(): Observable<void> {

    if (environment.cliente == "zamba") {
      return this.ZambaService.GetinfoSideBar()
    } else {
      // TODO: CUANDO NO SEA ZAMBA
      return of();
    }
  }
}
