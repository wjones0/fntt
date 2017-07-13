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
    FileContentsComponent
  ],
  entryComponents: [
    ModalNewFileComponent,
  ],
  exports: [
    FileListComponent,
    ModalNewFileComponent,
    FileContentsComponent,
  ]
})
export class FileMgmtModule { }
