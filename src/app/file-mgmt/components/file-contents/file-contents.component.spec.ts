import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {
  MdInputModule,
} from '@angular/material';

import { click } from '../../../testing/click';
import { FileAccessService } from '../../../data/file-access/file-access.service';
import { FileAccessMockService } from '../../../data/file-access/file-access.mock';
import { FileContentsComponent } from './file-contents.component';

describe('FileContentsComponent', () => {
  let component: FileContentsComponent;
  let fixture: ComponentFixture<FileContentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        FormsModule,
        MdInputModule,
      ],
      declarations: [FileContentsComponent],
      providers: [
        { provide: FileAccessService, useClass: FileAccessMockService },
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FileContentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should show the file name', () => {
    let de = fixture.debugElement.query(By.css('h3'));
    let ne: Element = de.nativeElement;
    expect(ne.innerHTML).toContain('file');
  });

  it('should show the file contents', () => {
    let ne: Element = fixture.debugElement.nativeElement;
    expect(ne.innerHTML).toContain('this is some file content');
  });

  it('should be call save function when save clicked', () => {

    let svc = fixture.debugElement.injector.get(FileAccessService);
    let fileListSpy: jasmine.Spy;

    let saved = false;

    fileListSpy = spyOn(svc, 'saveFile').and.callFake((arg) => {
      saved = true;
    });

    let de = fixture.debugElement.query(By.css('button'));
    expect(saved).toBeFalsy();
    click(de);

    fixture.whenStable().then(() => {
      expect(saved).toBeTruthy();
    }, () => {
      expect('didnt save').toBeFalsy();
    });
  });

});
