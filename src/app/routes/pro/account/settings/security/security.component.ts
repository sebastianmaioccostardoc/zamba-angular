import { ChangeDetectionStrategy, Component } from '@angular/core';
import { _HttpClient } from '@delon/theme';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-account-settings-security',
  templateUrl: './security.component.html',
  styles: [`
  nz-select {
    margin: 0 8px 10px 0;
    width: 100%;
  }

    `],
  changeDetection: ChangeDetectionStrategy.OnPush
})

// export class FamilyData {
//   private _CuitEmpresa: number;
//   private _Legajo: string;
//   private _ApellidoNombre: string;
//   private _CuilCuit: string;
//   private _Nombre: string;
//   private _Apellido: string;
//   private _FechaNacimiento: Date;
//   private _Nacionalidad: string;
//   private _TipoDocumento: string;
//   private _NumeroDocumento: string;
//   private _Genero: string;
//   private _EstadoCivil: string;
//   private _Pais: string;
//   private _Provincia: string;
//   private _Localidad: string;
//   private _Barrio: string;
//   private _Municipio: string;
//   private _DepartamentoProvincial: string;
//   private _Calle: string;
//   private _Altura: string;
//   private _BeneficioSeguroDeVida: string;
//   private _PersonaACargo: string;
//   private _ProcentajeDeduccionGanancia: number;

//   constructor() {
//   }
// }

export class ProAccountSettingsSecurityComponent {
  constructor(public msg: NzMessageService) { }
  // MyFamilyData = new FamilyData();

  Family: any = {
    CuitEmpresa: 0,
    Legajo: "",
    ApellidoNombre: "",
    CuilCuit: "",
    Nombre: "",
    Apellido: "",
    FechaNacimiento: Date.now(),
    Nacionalidad: "",
    TipoDocumento: "",
    NumeroDocumento: "",
    Genero: "Male",
    EstadoCivil: "Single",
    Pais: "Argentina",
    Provincia: "Buenos Aires",
    Localidad: "",
    Barrio: "",
    Municipio: "",
    DepartamentoProvincial: "",
    Calle: "",
    Altura: 0,
    BeneficioSeguroDeVida: "",
    PersonaACargo: "",
    ProcentajeDeduccionGanancia: 0
  };
}
