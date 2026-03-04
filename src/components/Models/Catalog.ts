import { IProduct } from "../../types";

export class Catalog {
  private products: IProduct[] = [];
  private thisProduct: IProduct | null = null;
  constructor() {}
  setItems(products: IProduct[]): void {
    this.products = products;
  }
  getItems(): IProduct[] {
    return this.products;
  }
  getProductsId(id: string): IProduct | undefined {
    return this.products.find((el) => el.id === id);
  }
  setThisProduct(Product: IProduct): void {
    this.thisProduct = Product;
  }
  getThisProduct(): IProduct | null {
    return this.thisProduct;
  }
}
