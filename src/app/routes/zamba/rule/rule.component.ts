import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SharedService } from '../../../services/zamba/shared.service';

import { ZambaService } from '../../../services/zamba/zamba.service'

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
    public sharedService: SharedService) {

  }



  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {

      console.log("los parametros son", params);

      //convertir el objeto params en un array de objetos
      const genericRequest = {
        UserId: this.sharedService.userid,
        Params: params
      };

      this.ZambaService.executeRule(genericRequest).subscribe(
        (data) => {

          debugger;
          switch (params["typeRule"]) {
            case "executeViewTask":
              console.log('Datos recibidos:', data);

              let result = JSON.parse(data);
              let urlTask = result.Vars.scripttoexecute.split("'")[3].replace("..", "");

              const nuevaUrl = `${this.WebUrl}${urlTask}`

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
