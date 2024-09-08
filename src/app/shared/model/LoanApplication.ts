export class LoanApplication {
  id: string;
  requestAmount: number;
  requestPeriod: number;
  isActive: boolean;

  constructor(id: string, requestAmount: number, requestPeriod: number, isActive: boolean) {
    this.id = id;
    this.requestAmount = requestAmount;
    this.requestPeriod = requestPeriod;
    this.isActive = isActive;
  }
}
