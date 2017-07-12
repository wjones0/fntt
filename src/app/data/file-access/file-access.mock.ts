import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { Subscription } from 'rxjs/Subscription';

import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

import { File } from '../models/file';

@Injectable()
export class FileAccessMockService {

    private user: firebase.User;
    private userSub: Subscription;

    private appName: string;

    private _internalFileList: FirebaseListObservable<File[]>;
    private _internalFileSub: Subscription;
    private _fileListSubject: ReplaySubject<File[]> = new ReplaySubject<File[]>();
    public fileList: Observable<File[]> = new Observable((observer) => {
        observer.next([
            { path: '/path1', name: 'file1', contents: '' },
            { path: '/path1', name: 'file2', contents: '' },
            { path: '/path2', name: 'file3', contents: '' },
            { path: '/path1', name: 'file4', contents: '' }
        ]);
        observer.complete();
    });

    private _internalSelectFileSub: Subscription;

    public selectedFile: Observable<File> = new Observable((observer) => {
        observer.next(
            { path: '/dir', name: 'file', contents: 'this is some file content' }
        );
        observer.complete();
    });

    constructor(/*public afAuth: AngularFireAuth, public db: AngularFireDatabase*/) {
    }

    setApp(appName: string) {
    }

    newFile(file: File) {
    }

    saveFile(file: File) {
    }

    selectFile(file: File) {
    }

}
