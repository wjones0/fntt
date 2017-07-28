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

import { CompilerModule } from '../compiler/compiler.module';
import { DataModule } from '../data/data.module';
import { FileMgmtModule } from '../file-mgmt/file-mgmt.module';
import { HardwareSimulatorRoutingModule } from './hardware-simulator-routing.module';
import { SimulatorPageComponent } from './pages/simulator-page/simulator-page.component';
import { HdweTopbarComponent } from './components/hdwe-topbar/hdwe-topbar.component';
import { ChipBuilderService } from './services/chip-builder/chip-builder.service';

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
    CompilerModule,
    DataModule,
    FileMgmtModule,
  ],
  declarations: [
    SimulatorPageComponent,
    HdweTopbarComponent,
  ],
  entryComponents: [
  ],
  exports: [
    SimulatorPageComponent,
  ],
  providers: [
    ChipBuilderService,
  ]
})
export class HardwareSimulatorModule { }
