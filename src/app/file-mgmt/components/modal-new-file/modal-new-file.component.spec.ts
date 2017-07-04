import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalNewFileComponent } from './modal-new-file.component';

describe('ModalNewFileComponent', () => {
  let component: ModalNewFileComponent;
  let fixture: ComponentFixture<ModalNewFileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalNewFileComponent ]
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
});
