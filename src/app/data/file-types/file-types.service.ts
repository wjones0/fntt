import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

@Injectable()
export class FileTypesService {

  constructor(private _db: AngularFireDatabase) { }

  getFileTypes(): Observable<string[]> {
    return this._db.list('/filetypes')
      .map((values) => {
        let stringVersion = [];

        for (let t of values) {
          stringVersion.push(t.$value);
        }

        return stringVersion;
      });
  }

}
