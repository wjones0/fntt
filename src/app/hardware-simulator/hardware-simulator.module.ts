import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { FormsModule } from '@angular/forms';

import {
  MdButtonModule,
  MdDialogModule,
  MdIconModule,
  MdListModule,
  MdMenuModule,
  MdSidenavModule,
  MdToolbarModule,
} from '@angular/material';

import { DataModule } from '../data/data.module';
import { FileMgmtModule } from '../file-mgmt/file-mgmt.module';
import { HardwareSimulatorRoutingModule } from './hardware-simulator-routing.module';
import { SimulatorPageComponent } from './pages/simulator-page/simulator-page.component';
import { HdweTopbarComponent } from './components/hdwe-topbar/hdwe-topbar.component';

@NgModule({
  imports: [
    CommonModule,
    // FormsModule,
    MdButtonModule,
    MdDialogModule,
    MdIconModule,
    MdListModule,
    MdMenuModule,
    MdSidenavModule,
    MdToolbarModule,
    HardwareSimulatorRoutingModule,
    FileMgmtModule,
    DataModule,
  ],
  declarations: [
    SimulatorPageComponent,
    HdweTopbarComponent,
  ],
  entryComponents: [
  ],
  exports: [
    SimulatorPageComponent,
  ]
})
export class HardwareSimulatorModule { }
