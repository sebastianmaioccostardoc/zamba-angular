import { Component } from '@angular/core';
import { ZambaService } from '../../../services/zamba/zamba.service'

@Component({
  selector: 'app-empleado',
  templateUrl: './rule.component.html',
})


export class RuleComponent {
  constructor(private ZambaService: ZambaService) { }


  ngOnInit(): void {
    this.ZambaService.executeRule().subscribe(
      (data) => {
        console.log('Datos recibidos:', data);
        // Puedes hacer más cosas con los datos si es necesario
      },
      (error) => {
        console.error('Error al obtener datos:', error);
      }
    );
  }
}
