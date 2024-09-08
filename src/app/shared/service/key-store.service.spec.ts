import { TestBed } from '@angular/core/testing';

import { KeyStoreService } from './key-store.service';

describe('KeyStoreService', () => {
  let service: KeyStoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(KeyStoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
