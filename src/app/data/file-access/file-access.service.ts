import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { ReplaySubject } from 'rxjs/ReplaySubject';
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

  private _internalFileList: FirebaseListObservable<File[]>;
  private _internalFileSub: Subscription;
  private _fileListSubject: ReplaySubject<File[]> = new ReplaySubject<File[]>();
  public fileList: Observable<File[]> = this._fileListSubject.asObservable();

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
    this._internalFileList = this.db.list(this.filePrefix() + '/filelist');

    if (!this._internalFileSub) {
      this._internalFileSub = this._internalFileList.subscribe((value) => {
        this._fileListSubject.next(value);
      });
    }
  }

  newFile(file: File) {
    this.saveFile(file);
    this._internalFileList.push({
      path: file.path,
      name: file.name
    });
  }

  saveFile(file: File) {
    const dbFile = this.db.object(this.filePrefix() + file.path + '/' + file.name);
    dbFile.set(file);
  }

}
