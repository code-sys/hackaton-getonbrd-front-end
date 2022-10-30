import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobsListCardsComponent } from './jobs-list-cards.component';

describe('JobsListCardsComponent', () => {
  let component: JobsListCardsComponent;
  let fixture: ComponentFixture<JobsListCardsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JobsListCardsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JobsListCardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
