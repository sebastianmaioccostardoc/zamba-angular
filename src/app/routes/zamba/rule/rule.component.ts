import { Location } from '@angular/common';
import { ChangeDetectorRef, Component, Inject, Injectable, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { DA_SERVICE_TOKEN, ITokenService } from '@delon/auth';
import { NZ_I18N, es_ES } from 'ng-zorro-antd/i18n';
import { environment } from '../../../../environments/environment';
import { SharedService } from '../../../services/zamba/shared.service';
import { ZambaService } from '../../../services/zamba/zamba.service';

@Component({
  selector: 'app-rule',
  templateUrl: './rule.component.html',
  styles: [
    `
      #ruleComponentIframe {
        width: 100%;
        height: 100%;
      }

      #main-spinner {
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
      }
    `
  ]
})
export class RuleComponent implements OnInit {
  WebUrl = environment['zambaWeb'];
  result: boolean;

  navigateUrl: SafeResourceUrl;
  constructor(
    private location: Location,
    private router: Router,
    private ZambaService: ZambaService,
    private route: ActivatedRoute,
    public sharedService: SharedService,
    @Inject(DA_SERVICE_TOKEN) private tokenService: ITokenService,
    private sanitizer: DomSanitizer,
    private cdr: ChangeDetectorRef
  ) {
    this.navigateUrl = '';
    this.result = false;
  }

  ngOnInit(): void {
    this.navigateUrl = '';
    this.result = false;
    this.cdr.detectChanges();

    this.route.queryParams.subscribe(params => {
      const tokenData = this.tokenService.get();
      let genericRequest = {};
      if (tokenData != null) {
        console.log('Imprimo los valores en tokenService en el service', tokenData);

        genericRequest = {
          UserId: tokenData['userid'],
          Params: params
        };
      }

      this.ZambaService.executeRule(genericRequest).subscribe({
        next: data => {
          switch (params['typeRule']) {
            case 'executeViewTask':
              console.log('Datos recibidos:', data);

              let result = JSON.parse(data);
              let urlTask = result.Vars.taskurl;

              let newUrl = `${this.WebUrl}${urlTask}`;
              // Encode string to Base64
              const encodedString = this.encodeStringToBase64(JSON.stringify(tokenData));

              newUrl = `${newUrl}&modalmode=true&t=${encodedString}`;

              //this.router.navigate(['#', 'zamba', 'rule'], { replaceUrl: true });

              this.navigateUrl = this.sanitizer.bypassSecurityTrustResourceUrl(newUrl);
              this.result = true;
              this.cdr.detectChanges();

              break;
          }
        },
        error: error => {
          console.error('Error al obtener datos:', error);
          this.result = true;
          this.cdr.detectChanges();
        }
      });


    });
  }

  encodeStringToBase64(str: string): string {
    return btoa(str);
  }

  // Function to decode base64 to string
  decodeBase64ToString(base64: string): string {
    return atob(base64);
  }
}
