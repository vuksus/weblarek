import { IProduct } from "../../types";

export class Cart {
  private items: IProduct[] = [];
  constructor() {}
  getItems(): IProduct[] {
    return this.items;
  }
  addItem(item: IProduct): void {
    this.items.push(item);
  }
  clearItem(item: IProduct) {
    this.items = this.items.filter((el) => el.id !== item.id);
  }
  clearCart(): void {
    this.items = [];
  }
  sumItems(): number {
    return this.items.reduce((acc, el) => acc + (el.price ?? 0), 0);
  }
  maxItems(): number {
    return this.items.length;
  }
  searchItem(id: string) {
    return this.items.some((el) => el.id === id);
  }
}
