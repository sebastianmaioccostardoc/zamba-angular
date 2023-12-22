import { Component } from '@angular/core';
import { ZambaService } from '../../../services/zamba/zamba.service'
<<<<<<< HEAD
import { environment } from '../../../../environments/environment';
=======
>>>>>>> 1d339bf0dbfab69267b5a85ac15e877b5db814e1

@Component({
  selector: 'app-empleado',
  templateUrl: './rule.component.html',
})


export class RuleComponent {
<<<<<<< HEAD

  WebUrl = environment.apiWebViews

=======
>>>>>>> 1d339bf0dbfab69267b5a85ac15e877b5db814e1
  constructor(private ZambaService: ZambaService) { }


  ngOnInit(): void {
    this.ZambaService.executeRule().subscribe(
      (data) => {
<<<<<<< HEAD
        debugger
        console.log('Datos recibidos:', data);

        let result = JSON.parse(data);
        let urlTask = result.Vars.scripttoexecute.split("'")[3].replaplace("..", "");

        const nuevaUrl = `${this.WebUrl}${urlTask}`

        // Abre una nueva ventana o pestaña con la URL especificada
        window.open(nuevaUrl, '_blank');

        // Puedes hacer más cosas con los datos si es necesario
      },
      (error) => {
        debugger
=======
        console.log('Datos recibidos:', data);
        // Puedes hacer más cosas con los datos si es necesario
      },
      (error) => {
>>>>>>> 1d339bf0dbfab69267b5a85ac15e877b5db814e1
        console.error('Error al obtener datos:', error);
      }
    );
  }
}
