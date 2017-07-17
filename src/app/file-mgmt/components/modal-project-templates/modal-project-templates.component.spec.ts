import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {
  MdDialogRef,
  MdSelectModule,
} from '@angular/material';

import { click } from '../../../testing/click';
import { FileAccessService } from '../../../data/file-access/file-access.service';
import { FileAccessMockService } from '../../../data/file-access/file-access.mock';
import { ProjectTemplatesService } from '../../../data/project-templates/project-templates.service';
import { ProjectTemplatesMockService } from '../../../data/project-templates/project-templates.mock';

import { ModalProjectTemplatesComponent } from './modal-project-templates.component';

describe('ModalProjectTemplatesComponent', () => {
  let component: ModalProjectTemplatesComponent;
  let fixture: ComponentFixture<ModalProjectTemplatesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        FormsModule,
        MdSelectModule,
      ],
      declarations: [ModalProjectTemplatesComponent],
      providers: [
        { provide: ProjectTemplatesService, useClass: ProjectTemplatesMockService },
        { provide: FileAccessService, useClass: FileAccessMockService },
        { provide: MdDialogRef, useClass: MDDialogMock },
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalProjectTemplatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

class MDDialogMock {
  close() { }
}