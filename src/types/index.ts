export type ApiPostMethods = "POST" | "PUT" | "DELETE";

export type TPayment = "cash" | "card" | "";

export interface IApi {
  get<T extends object>(uri: string): Promise<T>;
  post<T extends object>(
    uri: string,
    data: object,
    method?: ApiPostMethods,
  ): Promise<T>;
}

export interface IProduct {
  id: string;
  title: string;
  description: string;
  image: string;
  category: string;
  price: number | null;
}

export interface IBuyer {
  payment: TPayment;
  email: string;
  phone: string;
  address: string;
}

export interface Order extends IBuyer {
  products: string[];
  total: number;
}

export type ValidError = Partial<Record<keyof IBuyer, string>>;
