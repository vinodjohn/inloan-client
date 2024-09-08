export class CreditModifier{
  id: string;
  name: string;
  value: number;
  isActive: boolean;

  constructor(id: string, name: string, value: number, isActive: boolean) {
    this.id = id;
    this.name = name;
    this.value = value;
    this.isActive = isActive;
  }
}
