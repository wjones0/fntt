import { TestBed, inject } from '@angular/core/testing';
import { AngularFireDatabase } from 'angularfire2/database';
import { Firemocksvc } from '../../testing/firemock';

import { ProjectTemplatesService } from './project-templates.service';
import { FileAccessMockService } from '../file-access/file-access.mock';
import { FileAccessService } from '../file-access/file-access.service';

describe('ProjectTemplatesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ProjectTemplatesService,
        { provide: AngularFireDatabase, useClass: Firemocksvc },
        { provide: FileAccessService, useClass: FileAccessMockService }
      ]
    });
  });

  it('should be created', inject([ProjectTemplatesService], (service: ProjectTemplatesService) => {
    expect(service).toBeTruthy();
  }));
});
