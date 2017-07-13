import { TestBed, inject } from '@angular/core/testing';
import { AngularFireDatabase } from 'angularfire2/database';
import { Firemocksvc } from '../../testing/firemock';

import { FileTypesService } from './file-types.service';

describe('FileTypesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        FileTypesService,
        { provide: AngularFireDatabase, useClass: Firemocksvc },
      ]
    });
  });

  it('should be created', inject([FileTypesService], (service: FileTypesService) => {
    expect(service).toBeTruthy();
  }));
});
