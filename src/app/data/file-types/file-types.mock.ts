import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class FileTypesMockService {

    constructor() { }

    getFileTypes(): Observable<string[]> {
        return new Observable((observer) => {
            observer.next([
                'HDL',
                'TST'
            ]);
            observer.complete();
        });
    }

}
