
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { NgLocalization } from '@angular/common';
import { ALAIN_I18N_TOKEN, MenuService, SettingsService, TitleService } from '@delon/theme';
import { Observable, zip, catchError, map } from 'rxjs';
import { NzSafeAny } from 'ng-zorro-antd/core/types';
import { NzIconService } from 'ng-zorro-antd/icon';
import { ACLService } from '@delon/acl';
import { Inject, Injectable } from '@angular/core';

import { ICONS } from '../../../style-icons';
import { ICONS_AUTO } from '../../../style-icons-auto';
import { I18NService } from '../../core/i18n/i18n.service';



@Injectable({
    providedIn: 'root'
})
export class ZambaService {

    LOGIN_URL = environment.apiRestBasePath

    constructor(
        iconSrv: NzIconService,
        private menuService: MenuService,
        @Inject(ALAIN_I18N_TOKEN) private i18n: I18NService,
        private settingService: SettingsService,
        private aclService: ACLService,
        private titleService: TitleService,
        private httpClient: HttpClient,
        private router: Router
    ) {
        iconSrv.addIcon(...ICONS_AUTO, ...ICONS);
    }

    public getThumbsPathHome(data: any) {
        data = JSON.stringify(data);
        var url = this.LOGIN_URL + "search/GetThumbsPathHome";
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            })
        };
        return this.httpClient.post(url, data, httpOptions);
    }

    public GetUserInfoForName(data: any) {
        var url = this.LOGIN_URL + "search/GetUserInfoForName?UserName=" + data;
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            })
        };
        return this.httpClient.post(url, httpOptions);
    }

    public GetinfoSideBar() {


        const genericRequest = {
            UserId: 0,
            Params: ""
        };

        const defaultLang = this.i18n.defaultLang;

        return zip(this.i18n.loadLangData(defaultLang), this.httpClient.post(this.LOGIN_URL + '/getinfoSideBar', genericRequest)).pipe(

            catchError(res => {
                console.warn(`StartupService.load: Network request failed`, res);
                setTimeout(() => this.router.navigateByUrl(`/exception/500`));
                return [];
            }),
            map(([langData, appData]: [Record<string, string>, NzSafeAny]) => {
                // setting language data
                this.i18n.use(defaultLang, langData);


                this.settingService.setApp(appData.app);
                this.settingService.setUser(appData.user);
                this.aclService.setFull(true);
                this.menuService.add(appData.menu);
                this.titleService.default = '';
                this.titleService.suffix = appData.app.name;
            })
        );
    }

}
