import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { MdDialogRef } from '@angular/material';

import { File } from '../../../data/models/file';
import { FileAccessService } from '../../../data/file-access/file-access.service';
import { FileTypesService } from '../../../data/file-types/file-types.service';

@Component({
  selector: 'fntt-modal-new-file',
  templateUrl: './modal-new-file.component.html',
  styleUrls: ['./modal-new-file.component.css']
})
export class ModalNewFileComponent implements OnInit, OnDestroy {

  file: File = {
    path: '',
    name: '',
    contents: '',
    type: ''
  }

  fileTypeSub: Subscription;
  fileTypes: string[] = [];

  constructor(private fileSvc: FileAccessService, public fileTypesSvc: FileTypesService, private dialog: MdDialogRef<ModalNewFileComponent>) { }

  ngOnInit() {
    this.fileTypeSub = this.fileTypesSvc.getFileTypes().subscribe((value) => {
      this.fileTypes = value;
    });
  }

  ngOnDestroy() {
    this.fileTypeSub.unsubscribe();
  }

  close() {
    this.dialog.close();
  }

  create() {
    if (this.file.path[0] != '/')
      this.file.path = '/' + this.file.path;
    if (this.file.path[this.file.path.length - 1] == '/')
      this.file.path = this.file.path.substr(0, this.file.path.length - 1);

    this.fileSvc.newFile(this.file);
    this.close();
  }

}
