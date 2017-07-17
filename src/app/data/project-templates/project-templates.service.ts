import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { Subscription } from 'rxjs/Subscription';

import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import * as firebase from 'firebase/app';

import { FileAccessService } from '../file-access/file-access.service';

import { File } from '../models/file';
import { ProjectFiles } from '../models/project-files';

@Injectable()
export class ProjectTemplatesService {

  constructor(private _db: AngularFireDatabase, private _fileSvc: FileAccessService) { }

  getProjects(): Observable<ProjectFiles[]> {
    return this._db.list('/templates/project-templates');
  }

  copyTemplate(projectFiles: ProjectFiles) {
    for (let f of projectFiles.files) {
      if (f) {
        this.copyFiles(f);
      }
    }
  }

  private copyFiles(filePath: string) {
    let sub: Subscription = this._db.object('/templates/' + filePath).subscribe((value) => {
      this._fileSvc.newFile(value);
      sub.unsubscribe();
    });
  }
}
