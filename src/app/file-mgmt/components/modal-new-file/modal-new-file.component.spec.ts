import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {
  MdDialogRef,
  MdInputModule,
} from '@angular/material';

import { click } from '../../../testing/click';
import { FileAccessService } from '../../../data/file-access/file-access.service';
import { FileAccessMockService } from '../../../data/file-access/file-access.mock';

import { ModalNewFileComponent } from './modal-new-file.component';

describe('ModalNewFileComponent', () => {
  let component: ModalNewFileComponent;
  let fixture: ComponentFixture<ModalNewFileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        FormsModule,
        MdInputModule,
      ],
      declarations: [ModalNewFileComponent],
      providers: [
        { provide: FileAccessService, useClass: FileAccessMockService },
        { provide: MdDialogRef, useClass: MDDialogMock },
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalNewFileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should disable the create button if required fields arent entered', () => {
    fixture.whenStable().then(() => {
      fixture.detectChanges();

      let des = fixture.debugElement.queryAll(By.css('button'));
      //des[0] is cancel and des[1] is create

      // check button state (disabled);
      let ne: HTMLElement = des[1].nativeElement;
      expect(ne.innerHTML).toBe('Create');
      expect(des[1].properties.disabled).toBeTruthy();
    });
  });

  it('should enable the create button if required fields are entered', () => {
    fixture.whenStable().then(() => {
      fixture.detectChanges();

      // enter data
      let inputs = fixture.debugElement.queryAll(By.css('input'));
      inputs[0].nativeElement.value = 'hey';
      inputs[0].nativeElement.dispatchEvent(new Event('input'));
      inputs[1].nativeElement.value = 'hi';
      inputs[1].nativeElement.dispatchEvent(new Event('input'));

      fixture.detectChanges();
      let des = fixture.debugElement.queryAll(By.css('button'));
      //des[0] is cancel and des[1] is create

      // check initial state (disabled);
      let ne: HTMLElement = des[1].nativeElement;
      expect(ne.innerHTML).toBe('Create');
      expect(des[1].properties.disabled).toBeFalsy();
    });
  });

  it('should call newFile on the file svc', () => {
    let createCalled = false;
    let svc = fixture.debugElement.injector.get(FileAccessService);
    let fileSvcSpy: jasmine.Spy;

    fileSvcSpy = spyOn(svc, 'newFile').and.callFake((arg) => {
      createCalled = true;
    });

    fixture.detectChanges();

    // enter data
    let inputs = fixture.debugElement.queryAll(By.css('input'));
    inputs[0].nativeElement.value = 'hey';
    inputs[0].nativeElement.dispatchEvent(new Event('input'));
    inputs[1].nativeElement.value = 'hi';
    inputs[1].nativeElement.dispatchEvent(new Event('input'));

    fixture.detectChanges();
    let des = fixture.debugElement.queryAll(By.css('button'));
    //des[0] is cancel and des[1] is create
    let ne: HTMLElement = des[1].nativeElement;

    click(ne);

    fixture.whenStable().then(() => {
      expect(createCalled).toBeTruthy();
    });
  });

  it('should correct the first character on the path if needed', () => {
    let createFile;
    let svc = fixture.debugElement.injector.get(FileAccessService);
    let fileSvcSpy: jasmine.Spy;

    fileSvcSpy = spyOn(svc, 'newFile').and.callFake((arg) => {
      createFile = arg;
    });

    let comp = fixture.componentInstance;
    comp.file = {
      name: 'name',
      path: 'path',
      contents: ''
    }

    comp.create();

    fixture.whenStable().then(() => {
      expect(createFile.path).toBe('/path');
    });

  });

  it('should not correct the first character on the path if needed', () => {
    let createFile;
    let svc = fixture.debugElement.injector.get(FileAccessService);
    let fileSvcSpy: jasmine.Spy;

    fileSvcSpy = spyOn(svc, 'newFile').and.callFake((arg) => {
      createFile = arg;
    });

    let comp = fixture.componentInstance;
    comp.file = {
      name: 'name',
      path: '/path',
      contents: ''
    }

    comp.create();

    fixture.whenStable().then(() => {
      expect(createFile.path).toBe('/path');
    });

  });

  it('should correct the last character on the path if needed', () => {
    let createFile;
    let svc = fixture.debugElement.injector.get(FileAccessService);
    let fileSvcSpy: jasmine.Spy;

    fileSvcSpy = spyOn(svc, 'newFile').and.callFake((arg) => {
      createFile = arg;
    });

    let comp = fixture.componentInstance;
    comp.file = {
      name: 'name',
      path: '/path/',
      contents: ''
    }

    comp.create();

    fixture.whenStable().then(() => {
      expect(createFile.path).toBe('/path');
    });

  });

  it('should not correct the last character on the path if needed', () => {
    let createFile;
    let svc = fixture.debugElement.injector.get(FileAccessService);
    let fileSvcSpy: jasmine.Spy;

    fileSvcSpy = spyOn(svc, 'newFile').and.callFake((arg) => {
      createFile = arg;
    });

    let comp = fixture.componentInstance;
    comp.file = {
      name: 'name',
      path: '/path',
      contents: ''
    }

    comp.create();

    fixture.whenStable().then(() => {
      expect(createFile.path).toBe('/path');
    });

  });

});


class MDDialogMock {
  close() { }
}