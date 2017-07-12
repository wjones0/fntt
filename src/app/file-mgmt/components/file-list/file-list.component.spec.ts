import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {
  MdListModule,
} from '@angular/material';

import { click } from '../../../testing/click';
import { FileAccessService } from '../../../data/file-access/file-access.service';
import { FileAccessMockService } from '../../../data/file-access/file-access.mock';
import { FileListComponent } from './file-list.component';

describe('FileListComponent', () => {
  let component: FileListComponent;
  let fixture: ComponentFixture<FileListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        FormsModule,
        MdListModule,
      ],
      declarations: [FileListComponent],
      providers: [
        { provide: FileAccessService, useClass: FileAccessMockService },
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FileListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should show all the paths', () => {
    let des = fixture.debugElement.queryAll(By.css('md-list-item'));

    expect(des[0].nativeElement.innerHTML).toContain('/path1');
    expect(des[1].nativeElement.innerHTML).toContain('/path2');
  });

  it('should show the files under a path ', () => {
    let des = fixture.debugElement.queryAll(By.css('md-list-item'));

    // open first directory
    click(des[0]);

    fixture.detectChanges();

    let files = fixture.debugElement.queryAll(By.css('md-list-item'));

    // files[0] will be the path
    expect(files[1].nativeElement.innerHTML).toContain('file1');
    expect(files[2].nativeElement.innerHTML).toContain('file2');
    expect(files[3].nativeElement.innerHTML).toContain('file4');

    // open second directory
    click(des[1]);

    fixture.detectChanges();

    files = fixture.debugElement.queryAll(By.css('md-list-item'));

    // files[0..1] will be the paths
    expect(files[2].nativeElement.innerHTML).toContain('file3');
  });

  it('should select a file when clicked', () => {
    let svc = fixture.debugElement.injector.get(FileAccessService);
    let fileSvcSpy: jasmine.Spy;

    let selectedFile = false;

    fileSvcSpy = spyOn(svc, 'selectFile').and.callFake((arg) => {
      selectedFile = true;
    });

    let des = fixture.debugElement.queryAll(By.css('md-list-item'));

    // open first directory
    click(des[0]);

    fixture.detectChanges();

    let files = fixture.debugElement.queryAll(By.css('md-list-item'));
    click(files[1]);

    fixture.whenStable().then(() => {
      expect(selectedFile).toBeTruthy();
    }, () => {
      expect('didnt save').toBeFalsy();
    });
  });

});

