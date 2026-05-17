import { TestBed } from '@angular/core/testing';

import { UserDataList } from './user-data-list';

describe('UserDataList', () => {
  let service: UserDataList;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserDataList);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
