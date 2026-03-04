import { IProduct } from "../../../types";

export class Catalog {
    Products: IProduct[];
    ThisProduct: IProduct | null;
    constructor(products : IProduct[] = []) {
        this.Products = products
        this.ThisProduct = null;
    }
    setItems(Products: IProduct[]): void {
        this.Products = Products;
    }
    getItems():  IProduct[] {
        return this.Products;
    }
    getProductsId(id: string): IProduct | undefined {
        return this.Products.find((el) => el.id === id);
    }
    setThisProduct(Product: IProduct): void {
        this.ThisProduct = Product;
    }
    getThisProduct(): IProduct | null {
        return this.ThisProduct;
    }
}