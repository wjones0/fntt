import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { Subscription } from 'rxjs/Subscription';

import { File } from '../models/file';
import { ProjectFiles } from '../models/project-files';

@Injectable()
export class ProjectTemplatesMockService {

    constructor() { }

    getProjects(): Observable<ProjectFiles[]> {
        return new Observable((observer) => {
            observer.next([
            ]);
            observer.complete();
        });
    }

    copyTemplate(projectFiles: ProjectFiles) {
    }

}
