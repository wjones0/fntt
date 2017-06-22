import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SimulatorPageComponent } from './simulator-page.component';

describe('SimulatorPageComponent', () => {
  let component: SimulatorPageComponent;
  let fixture: ComponentFixture<SimulatorPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SimulatorPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SimulatorPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
