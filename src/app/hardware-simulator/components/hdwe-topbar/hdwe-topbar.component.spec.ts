import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {
  MdButtonModule,
  MdIconModule,
  MdMenuModule,
} from '@angular/material';

import { FileAccessService } from '../../../data/file-access/file-access.service';
import { FileAccessMockService } from '../../../data/file-access/file-access.mock';
import { AngularFireAuth } from 'angularfire2/auth';
import { Firemocksvc } from '../../../testing/firemock';
import { HdweTopbarComponent } from './hdwe-topbar.component';

describe('HdweTopbarComponent', () => {
  let component: HdweTopbarComponent;
  let fixture: ComponentFixture<HdweTopbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        FormsModule,
        MdButtonModule,
        MdIconModule,
        MdMenuModule,
      ],
      declarations: [HdweTopbarComponent],
      providers: [
        { provide: FileAccessService, useClass: FileAccessMockService },
        { provide: AngularFireAuth, useClass: Firemocksvc },
      ],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HdweTopbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
