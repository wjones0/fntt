import { Component, OnInit, OnDestroy } from '@angular/core';

import { Subscription } from 'rxjs/Subscription';

import { File } from '../../../data/models/file';
import { FileAccessService } from '../../../data/file-access/file-access.service';

@Component({
  selector: 'fntt-file-contents',
  templateUrl: './file-contents.component.html',
  styleUrls: ['./file-contents.component.css']
})
export class FileContentsComponent implements OnInit, OnDestroy {

  private _fileSub: Subscription;
  public file: File;

  constructor(private _fileSvc: FileAccessService) { }

  ngOnInit() {
    this._fileSub = this._fileSvc.selectedFile.subscribe((value) => this.file = value);
  }

  ngOnDestroy() {
    this._fileSub.unsubscribe();
  }

  saveFile() {
    this._fileSvc.saveFile(this.file);
  }
}
