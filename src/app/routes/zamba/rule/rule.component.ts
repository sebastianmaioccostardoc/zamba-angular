import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SharedService } from '../../../services/zamba/shared.service';
import { Inject, Injectable } from '@angular/core';
import { ZambaService } from '../../../services/zamba/zamba.service'
import { DA_SERVICE_TOKEN, ITokenService } from '@delon/auth';
import { environment } from '../../../../environments/environment';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';



@Component({
  selector: 'app-rule',
  templateUrl: './rule.component.html',
  styles: [`    
  #ruleComponentIframe {
      width: 100%;
      height: 100%;
  }`
  ],
})


export class RuleComponent {

  WebUrl = environment["apiWebViews"];
  navigateUrl: SafeResourceUrl;
  constructor(
    private ZambaService: ZambaService,
    private route: ActivatedRoute,
    public sharedService: SharedService,
    @Inject(DA_SERVICE_TOKEN) private tokenService: ITokenService,
    private sanitizer: DomSanitizer) {
    this.navigateUrl = "";
  }



  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {

      const tokenData = this.tokenService.get();
      let genericRequest = {}
      debugger
      if (tokenData != null) {
        console.log("Imprimo los valores en tokenService en el service", tokenData);

        genericRequest = {
          UserId: tokenData["userid"],
          Params: params
        };
      }

      this.ZambaService.executeRule(genericRequest).subscribe(
        (data) => {

          switch (params["typeRule"]) {
            case "executeViewTask":
              console.log('Datos recibidos:', data);

              let result = JSON.parse(data);
              let urlTask = result.Vars.scripttoexecute.split("'")[3].replace("..", "");

              let newUrl = `${this.WebUrl}${urlTask}`
              newUrl = newUrl + "&t=" + tokenData?.token

              this.navigateUrl = this.sanitizer.bypassSecurityTrustResourceUrl(newUrl);
              // Abre una nueva ventana o pestaña con la URL especificada
              //window.open(newUrl, '_blank');

              break;

          }


        },
        (error) => {

          console.error('Error al obtener datos:', error);
        }
      );
    }
    )
  }
}
