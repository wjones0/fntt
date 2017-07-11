import { Component, OnInit, OnDestroy } from '@angular/core';

import { Subscription } from 'rxjs/Subscription';

import { File } from '../../../data/models/file';
import { FileAccessService } from '../../../data/file-access/file-access.service';

@Component({
  selector: 'fntt-file-list',
  templateUrl: './file-list.component.html',
  styleUrls: ['./file-list.component.css']
})
export class FileListComponent implements OnInit, OnDestroy {

  fileList: File[];
  fileListSub: Subscription;

  constructor(public fileSvc: FileAccessService) { }

  ngOnInit() {
    this.fileListSub = this.fileSvc.fileList.subscribe((value) => {
      this.fileList = value.sort((a: File, b: File) => {
        if (a.path < b.path) {
          return -1;
        }
        if (a.path > b.path) {
          return 1;
        }
        if (a.name < b.name) {
          return -1;
        }
        if (a.name > b.name) {
          return 1;
        }
        return 0;
      });
    });

  }

  ngOnDestroy() {
    this.fileListSub.unsubscribe();
  }

  selectFile(file: File) {
    this.fileSvc.selectFile(file);
  }

}
