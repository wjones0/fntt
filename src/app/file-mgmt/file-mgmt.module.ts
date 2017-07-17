import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import {
  MdButtonModule,
  MdDialogModule,
  MdInputModule,
  MdListModule,
  MdSelectModule,
} from '@angular/material';

import { ModalNewFileComponent } from './components/modal-new-file/modal-new-file.component';
import { FileListComponent } from './components/file-list/file-list.component';
import { FileContentsComponent } from './components/file-contents/file-contents.component';
import { ModalProjectTemplatesComponent } from './components/modal-project-templates/modal-project-templates.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MdButtonModule,
    MdDialogModule,
    MdInputModule,
    MdListModule,
    MdSelectModule,
  ],
  declarations: [
    ModalNewFileComponent,
    FileListComponent,
    FileContentsComponent,
    ModalProjectTemplatesComponent
  ],
  entryComponents: [
    ModalNewFileComponent,
    ModalProjectTemplatesComponent,
  ],
  exports: [
    FileListComponent,
    ModalNewFileComponent,
    FileContentsComponent,
    ModalProjectTemplatesComponent,
  ]
})
export class FileMgmtModule { }
