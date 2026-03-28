import { IProduct } from "../../types";
import { IEvents } from "../base/Events";

export class Catalog {
  private products: IProduct[] = [];
  private thisProduct: IProduct | null = null;
  constructor(protected event: IEvents) {}
  setItems(products: IProduct[]): void {
    this.products = products;
    this.event.emit("catalog:set");
  }
  getItems(): IProduct[] {
    return this.products;
  }
  getProductsId(id: string): IProduct | undefined {
    return this.products.find((el) => el.id === id);
  }
  setThisProduct(Product: IProduct): void {
    this.thisProduct = Product;
    this.event.emit("thisProduct:set");
  }
  getThisProduct(): IProduct | null {
    return this.thisProduct;
  }
}
