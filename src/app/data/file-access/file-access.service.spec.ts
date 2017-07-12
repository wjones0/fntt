import { TestBed, inject, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';

import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';

import { Firemocksvc } from '../../testing/firemock';
import { FileAccessService } from './file-access.service';

describe('FileAccessService', () => {

  let service: FileAccessService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: AngularFireAuth, useClass: Firemocksvc },
        { provide: AngularFireDatabase, useClass: Firemocksvc },
        FileAccessService
      ]
    });

  });

  beforeEach(inject([FileAccessService], (svc: FileAccessService) => {
    service = svc;
  }));


  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should emit file list when app is set', (done) => {

    let fileListSpy: jasmine.Spy;

    fileListSpy = spyOn(service.db, 'list').and.returnValue(new Observable((observer) => {
      observer.next([
        { path: 'hi', name: 'hey' },
        { path: '/here', name: 'there' }
      ]);
      observer.complete();
    }));

    service.setApp('testApp');


    service.fileList.subscribe((value) => {
      expect(value[0].path).toBe('hi');
      expect(value[0].name).toBe('hey');
      expect(value[1].path).toBe('/here');
      expect(value[1].name).toBe('there');
      done();
    });
  });

  it('should emit a file after selection', (done) => {

    let fileSpy: jasmine.Spy;

    fileSpy = spyOn(service.db, 'object').and.returnValue(new Observable((observer) => {
      observer.next(
        { path: '/dir', name: 'file', contents: 'this is some file content' }
      );
      observer.complete();
    }));

    service.selectFile({
      name: '',
      path: '',
      contents: ''
    });


    service.selectedFile.subscribe((value) => {
      expect(value.path).toBe('/dir');
      expect(value.name).toBe('file');
      expect(value.contents).toBe('this is some file content');
      done();
    });
  });

  it('should calculate the file path correctly', (done) => {
    // setup app
    let fileListSpy: jasmine.Spy;

    fileListSpy = spyOn(service.db, 'list').and.callFake((arg) => {

      expect(arg).toBe('/useridfake/testApp/filelist');

      return new Observable((observer) => {
        observer.next([
          { path: 'hi', name: 'hey' },
          { path: '/here', name: 'there' }
        ]);
        observer.complete();
        done();
      });
    });

    service.setApp('testApp');

  });

});
