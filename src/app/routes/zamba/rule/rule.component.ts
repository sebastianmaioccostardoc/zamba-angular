import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SharedService } from '../../../services/zamba/shared.service';
import { Inject, Injectable } from '@angular/core';
import { ZambaService } from '../../../services/zamba/zamba.service'
import { DA_SERVICE_TOKEN, ITokenService } from '@delon/auth';
import { environment } from '../../../../environments/environment';


@Component({
  selector: 'app-empleado',
  templateUrl: './rule.component.html',
})


export class RuleComponent {

  WebUrl = environment["apiWebViews"];

  constructor(
    private ZambaService: ZambaService,
    private route: ActivatedRoute,
    public sharedService: SharedService,
    @Inject(DA_SERVICE_TOKEN) private tokenService: ITokenService) {

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

              let nuevaUrl = `${this.WebUrl}${urlTask}`
              nuevaUrl = nuevaUrl + "&t=" + tokenData?.token

              // Abre una nueva ventana o pestaña con la URL especificada
              window.open(nuevaUrl, '_blank');

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
