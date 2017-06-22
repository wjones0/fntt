import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import 'hammerjs';
import {
  MdToolbarModule
} from '@angular/material';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { HardwareSimulatorModule } from './hardware-simulator/hardware-simulator.module';
import { LandingPageComponent } from './pages/landing-page/landing-page.component';

@NgModule({
  declarations: [
    AppComponent,
    LandingPageComponent
  ],
  imports: [
    BrowserModule,
    MdToolbarModule,
    AppRoutingModule,
    HardwareSimulatorModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
