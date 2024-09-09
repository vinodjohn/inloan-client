import {CreditModifier} from "./CreditModifier";
import {Role} from "./Role";

export class Person {
  id: number;
  firstName: string;
  lastName: string;
  personalIdCode: string;
  password: string;
  role: Role;
  creditModifier: CreditModifier;
  isActive: boolean;

  constructor(id: number, firstName: string, lastName: string, personalIdCode: string, password: string, role: Role, creditModifier: CreditModifier, isActive: boolean) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.personalIdCode = personalIdCode;
    this.password = password;
    this.role = role;
    this.creditModifier = creditModifier;
    this.isActive = isActive;
  }
}
