import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SimulatorPageComponent } from './pages/simulator-page/simulator-page.component';

const routes: Routes = [
  { path: '', component: SimulatorPageComponent },
  // { path: '', redirectTo: 'sim', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HardwareSimulatorRoutingModule { }
