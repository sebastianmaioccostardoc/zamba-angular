import { ChangeDetectionStrategy, Component } from '@angular/core';
import { _HttpClient } from '@delon/theme';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-account-settings-binding',
  templateUrl: './binding.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProAccountSettingsBindingComponent {
  constructor(public msg: NzMessageService) { }

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
    ProcentajeDeduccionGanancia: 0,

    piso: 1
  };
}
