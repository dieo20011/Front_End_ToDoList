import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HolidayAddOrUpdateComponent } from './holiday-add-or-update.component';

describe('HolidayAddOrUpdateComponent', () => {
  let component: HolidayAddOrUpdateComponent;
  let fixture: ComponentFixture<HolidayAddOrUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HolidayAddOrUpdateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HolidayAddOrUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
