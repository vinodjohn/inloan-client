export class SignUp {
  firstName: string;
  lastName: string;
  personalIdCode: string;
  password: string;

  constructor(firstName: string, lastName: string, personalIdCode: string, password: string) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.personalIdCode = personalIdCode;
    this.password = password;
  }
}
