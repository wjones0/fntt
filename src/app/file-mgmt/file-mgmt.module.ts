import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import {
  MdButtonModule,
  MdDialogModule,
  MdInputModule,
  MdListModule,
} from '@angular/material';

import { ModalNewFileComponent } from './components/modal-new-file/modal-new-file.component';
import { FileListComponent } from './components/file-list/file-list.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MdButtonModule,
    MdDialogModule,
    MdInputModule,
    MdListModule,
  ],
  declarations: [
    ModalNewFileComponent,
    FileListComponent
  ],
  entryComponents: [
    ModalNewFileComponent,
  ],
  exports: [
    FileListComponent,
    ModalNewFileComponent
  ]
})
export class FileMgmtModule { }
