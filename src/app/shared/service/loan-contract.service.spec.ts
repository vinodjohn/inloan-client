import { TestBed } from '@angular/core/testing';

import { LoanContractService } from './loan-contract.service';

describe('LoanContractService', () => {
  let service: LoanContractService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoanContractService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
