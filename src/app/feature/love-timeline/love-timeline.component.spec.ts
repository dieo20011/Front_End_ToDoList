import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoveTimelineComponent } from './love-timeline.component';

describe('LoveTimelineComponent', () => {
  let component: LoveTimelineComponent;
  let fixture: ComponentFixture<LoveTimelineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoveTimelineComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoveTimelineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
