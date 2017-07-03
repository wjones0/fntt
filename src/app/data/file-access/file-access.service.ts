import { Injectable } from '@angular/core';

import { Subscription } from 'rxjs/Subscription';

import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

import { File } from '../models/file';

@Injectable()
export class FileAccessService {

  private user: firebase.User;
  private userSub: Subscription;

  private appName: string;
  fileList: FirebaseListObservable<File[]>;

  constructor(public afAuth: AngularFireAuth, public db: AngularFireDatabase) {
    this.userSub = afAuth.authState.subscribe((value) => {
      if (value) {
        this.user = value;
      }
    });
  }

  private filePrefix() {
    return '/' + this.user.uid + '/' + this.appName;
  }

  setApp(appName: string) {
    this.appName = appName;
    this.fileList = this.db.list(this.filePrefix() + '/filelist');
  }

  newFile(file: File) {
    this.saveFile(file);
    this.fileList.push({
      path: file.path,
      name: file.name
    });
  }

  saveFile(file: File) {
    const dbFile = this.db.object(this.filePrefix() + file.path + '/' + file.name);
    dbFile.set(file);
  }

}
