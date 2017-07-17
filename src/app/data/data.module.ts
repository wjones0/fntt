import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { environment } from '../../environments/environment';

import { FileAccessService } from './file-access/file-access.service';
import { FileTypesService } from './file-types/file-types.service';
import { ProjectTemplatesService } from './project-templates/project-templates.service';

@NgModule({
  imports: [
    CommonModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
  ],
  exports: [
  ],
  providers: [
    FileAccessService,
    FileTypesService,
    ProjectTemplatesService,
  ]
})
export class DataModule { }
