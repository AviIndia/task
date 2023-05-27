import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeletedTaskComponent } from './deleted-task.component';

describe('DeletedTaskComponent', () => {
  let component: DeletedTaskComponent;
  let fixture: ComponentFixture<DeletedTaskComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DeletedTaskComponent]
    });
    fixture = TestBed.createComponent(DeletedTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
