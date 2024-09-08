import { TestBed } from '@angular/core/testing';

import { CreditModifierService } from './credit-modifier.service';

describe('CreditModifierService', () => {
  let service: CreditModifierService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CreditModifierService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
