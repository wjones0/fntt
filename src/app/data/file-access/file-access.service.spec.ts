import { TestBed, inject } from '@angular/core/testing';

import { FileAccessService } from './file-access.service';

describe('FileAccessService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FileAccessService]
    });
  });

  it('should be created', inject([FileAccessService], (service: FileAccessService) => {
    expect(service).toBeTruthy();
  }));
});
