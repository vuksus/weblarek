import { IProduct } from "../../types";
import { IEvents } from "../base/Events";

export class Cart {
  private items: IProduct[] = [];
  constructor(protected event: IEvents) {}
  getItems(): IProduct[] {
    return this.items;
  }
  addItem(item: IProduct): void {
    this.items.push(item);
    this.event.emit("basket:change");
  }
  clearItem(item: IProduct) {
    this.items = this.items.filter((el) => el.id !== item.id);
    this.event.emit("basket:change");
  }
  clearCart(): void {
    this.items = [];
    this.event.emit("carts:clear");
  }
  sumItems(): number {
    return this.items.reduce((acc, el) => acc + (el.price ?? 0), 0);
  }
  maxItems(): number {
    return this.items.length;
  }
  searchItem(id: string): boolean {
    return this.items.some((el) => el.id === id);
  }
}
