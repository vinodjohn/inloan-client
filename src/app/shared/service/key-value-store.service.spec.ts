import { TestBed } from '@angular/core/testing';

import { KeyValueStoreService } from './key-value-store.service';

describe('KeyStoreService', () => {
  let service: KeyValueStoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(KeyValueStoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
