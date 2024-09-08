export class KvStoreExtended {
  id: string;
  key: string;
  value: number;
  isActive: boolean;

  constructor(id: string, key: string, value: number, isActive: boolean) {
    this.id = id;
    this.key = key;
    this.value = value;
    this.isActive = isActive;
  }
}
