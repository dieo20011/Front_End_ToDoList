import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PromodoManagementComponent } from './promodo-management.component';

describe('PromodoManagementComponent', () => {
  let component: PromodoManagementComponent;
  let fixture: ComponentFixture<PromodoManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PromodoManagementComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PromodoManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
