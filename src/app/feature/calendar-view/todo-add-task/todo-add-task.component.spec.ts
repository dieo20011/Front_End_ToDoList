import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoAddTaskComponent } from './todo-add-task.component';

describe('TodoAddTaskComponent', () => {
  let component: TodoAddTaskComponent;
  let fixture: ComponentFixture<TodoAddTaskComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TodoAddTaskComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TodoAddTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
