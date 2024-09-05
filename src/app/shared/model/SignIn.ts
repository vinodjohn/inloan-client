export class SignIn {
  personalIdCode: string;
  password: string;

  constructor(personalIdCode: string, password: string) {
    this.personalIdCode = personalIdCode;
    this.password = password;
  }
}
