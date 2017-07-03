import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import {
  MdButtonModule,
  MdDialogModule,
  MdIconModule,
  MdInputModule,
  MdListModule,
  MdMenuModule,
  MdSidenavModule,
  MdToolbarModule,
} from '@angular/material';

import { DataModule } from '../data/data.module';
import { HardwareSimulatorRoutingModule } from './hardware-simulator-routing.module';
import { SimulatorPageComponent } from './pages/simulator-page/simulator-page.component';
import { HdweTopbarComponent } from './components/hdwe-topbar/hdwe-topbar.component';
import { ModalNewFileComponent } from './components/modal-new-file/modal-new-file.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MdButtonModule,
    MdDialogModule,
    MdIconModule,
    MdInputModule,
    MdListModule,
    MdMenuModule,
    MdSidenavModule,
    MdToolbarModule,
    HardwareSimulatorRoutingModule,
    DataModule,
  ],
  declarations: [
    SimulatorPageComponent,
    HdweTopbarComponent,
    ModalNewFileComponent,
  ],
  entryComponents: [
    ModalNewFileComponent
  ],
  exports: [
    SimulatorPageComponent,
  ]
})
export class HardwareSimulatorModule { }
