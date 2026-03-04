import { IProduct, Order } from "../../types";
import { Api } from "../base/Api";

export interface Product {
  items: IProduct[];
  total?: number;
}

export class Communication {
  api: Api;
  constructor(api: Api) {
    this.api = api;
  }
  async getApi(endpoint: string = "/product/"): Promise<Product> {
    try {
      const res = await this.api.get<Product>(endpoint);
      return res;
    } catch (e) {
      console.error(e);
      throw e;
    }
  }
  async postApi(endpoint: string = "/order/", order: Order): Promise<Order> {
    try {
      const res = await this.api.post<Order>(endpoint, order);
      return res;
    } catch (e) {
      console.error(e);
      throw e;
    }
  }
}
