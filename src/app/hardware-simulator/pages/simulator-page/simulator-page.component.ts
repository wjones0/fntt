import { Component, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { MdDialog } from '@angular/material';

import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

import { File } from '../../../data/models/file';
import { FileAccessService } from '../../../data/file-access/file-access.service';

import { ModalNewFileComponent } from '../../components/modal-new-file/modal-new-file.component';

@Component({
  selector: 'app-simulator-page',
  templateUrl: './simulator-page.component.html',
  styleUrls: ['./simulator-page.component.css']
})
export class SimulatorPageComponent implements OnInit, OnDestroy {

  userSub: Subscription;

  fileList: File[];
  fileListSub: Subscription;

  constructor(public fileSvc: FileAccessService, public dialog: MdDialog, public afAuth: AngularFireAuth) {
    this.userSub = afAuth.authState.subscribe((value) => {
      this.fileSvc.setApp('hdwe');

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
    });
  }


  ngOnInit() {
  }

  ngOnDestroy() {
    this.userSub.unsubscribe();
    this.fileListSub.unsubscribe();
  }

  newFile() {
    let dialogRef = this.dialog.open(ModalNewFileComponent, {
      width: '75%',
      disableClose: false,
      data: null
    });
  }

}
