import { Component } from '@angular/core';
import { ZambaService } from '../../../services/zamba/zamba.service'

import { environment } from '../../../../environments/environment';


@Component({
  selector: 'app-empleado',
  templateUrl: './rule.component.html',
})


export class RuleComponent {

  WebUrl = environment["apiWebViews"];

  constructor(private ZambaService: ZambaService) { }


  ngOnInit(): void {
    this.ZambaService.executeRule().subscribe(
      (data) => {
        console.log('Datos recibidos:', data);

        let result = JSON.parse(data);
        let urlTask = result.Vars.scripttoexecute.split("'")[3].replace("..", "");

        const nuevaUrl = `${this.WebUrl}${urlTask}`

        // Abre una nueva ventana o pestaña con la URL especificada
        window.open(nuevaUrl, '_blank');

        // Puedes hacer más cosas con los datos si es necesario
      },
      (error) => {

        console.error('Error al obtener datos:', error);
      }
    );
  }
}
