import { TestBed } from '@angular/core/testing';

import { CreateTaskService } from './create-task.service';

describe('CreateTaskService', () => {
  let service: CreateTaskService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CreateTaskService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
