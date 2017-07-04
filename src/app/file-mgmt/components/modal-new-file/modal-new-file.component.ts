import { Component, OnInit } from '@angular/core';
import { MdDialogRef } from '@angular/material';

import { File } from '../../../data/models/file';
import { FileAccessService } from '../../../data/file-access/file-access.service';

@Component({
  selector: 'fntt-modal-new-file',
  templateUrl: './modal-new-file.component.html',
  styleUrls: ['./modal-new-file.component.css']
})
export class ModalNewFileComponent implements OnInit {

  file: File = {
    path: '',
    name: '',
    contents: ''
  }

  constructor(private fileSvc: FileAccessService, private dialog: MdDialogRef<ModalNewFileComponent>) { }

  ngOnInit() {
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
