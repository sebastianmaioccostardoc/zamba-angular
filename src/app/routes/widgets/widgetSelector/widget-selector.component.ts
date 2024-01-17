import { NgIf } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  ViewEncapsulation
} from '@angular/core';
import { GridsterItem } from 'angular-gridster2';
/* Agregar los otros widgets
import { WidgetAComponent } from './widgetA.component';
import { WidgetBComponent } from './widgetB.component';
import { WidgetCComponent } from './widgetC.component';
*/
@Component({
  selector: 'widget-selector',
  templateUrl: './widget-selector.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  standalone: true,
  //imports: [NgIf, WidgetAComponent, WidgetBComponent, WidgetCComponent]
})
export class WidgetSelectorComponent {
  @Input()
  widget: BaseWidgetComponent = {};
  @Input()
  resizeEvent: EventEmitter<GridsterItem> = new EventEmitter<GridsterItem>();
}

export interface BaseWidgetComponent {
}