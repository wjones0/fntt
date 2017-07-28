import { TestBed, inject } from '@angular/core/testing';

import { ChipBuilderService } from './chip-builder.service';

describe('ChipBuilderService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ChipBuilderService]
    });
  });

  it('should be created', inject([ChipBuilderService], (service: ChipBuilderService) => {
    expect(service).toBeTruthy();
  }));
});
