import {Person} from "./Person";

export class LoanApplication {
  id: string;
  requestAmount: number;
  requestPeriod: number;
  person: Person;
  isActive: boolean;

  constructor(id: string, requestAmount: number, requestPeriod: number, person: Person, isActive: boolean) {
    this.id = id;
    this.requestAmount = requestAmount;
    this.requestPeriod = requestPeriod;
    this.person = person;
    this.isActive = isActive;
  }
}
