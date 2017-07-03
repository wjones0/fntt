import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  MdButtonModule,
  MdIconModule,
  MdMenuModule,
  MdSidenavModule,
  MdToolbarModule,
} from '@angular/material';

import { DataModule } from '../data/data.module';
import { HardwareSimulatorRoutingModule } from './hardware-simulator-routing.module';
import { SimulatorPageComponent } from './pages/simulator-page/simulator-page.component';
import { HdweTopbarComponent } from './components/hdwe-topbar/hdwe-topbar.component';

@NgModule({
  imports: [
    CommonModule,
    MdButtonModule,
    MdIconModule,
    MdMenuModule,
    MdSidenavModule,
    MdToolbarModule,
    HardwareSimulatorRoutingModule,
    DataModule,
  ],
  declarations: [
    SimulatorPageComponent,
    HdweTopbarComponent,
  ],
  exports: [
    SimulatorPageComponent,
  ]
})
export class HardwareSimulatorModule { }
