import { IProduct, Order } from "../../types";
import { Api } from "../base/Api";

export interface Product {
  items: IProduct[];
  total: number;
}

export interface OrderApi {
  id: string;
  total: number;
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
  async postApi(endpoint: string = "/order/", order: Order): Promise<OrderApi> {
    try {
      const res = await this.api.post<OrderApi>(endpoint, order);
      return res;
    } catch (e) {
      console.error(e);
      throw e;
    }
  }
}
