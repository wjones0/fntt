import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HardwareSimulatorRoutingModule } from './hardware-simulator-routing.module';
import { SimulatorPageComponent } from './pages/simulator-page/simulator-page.component';

@NgModule({
  imports: [
    CommonModule,
    HardwareSimulatorRoutingModule
  ],
  declarations: [
    SimulatorPageComponent,
  ],
  exports: [
    SimulatorPageComponent,
  ]
})
export class HardwareSimulatorModule { }
