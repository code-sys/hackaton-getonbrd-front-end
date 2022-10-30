import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalJobDetailComponent } from './modal-job-detail.component';

describe('ModalJobDetailComponent', () => {
  let component: ModalJobDetailComponent;
  let fixture: ComponentFixture<ModalJobDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalJobDetailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalJobDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
