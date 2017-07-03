import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { environment } from '../../environments/environment';

import { FileAccessService } from './file-access/file-access.service';

@NgModule({
  imports: [
    CommonModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
  ],
  exports: [
    AngularFireModule,
    AngularFireAuthModule,
    AngularFireDatabaseModule,
  ],
  providers: [
    FileAccessService,
  ]
})
export class DataModule { }
