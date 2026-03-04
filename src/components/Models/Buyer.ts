import { IBuyer, ValidError } from "../../types";

export class Buyer {
  private payment: IBuyer["payment"] = "";
  private email: string = "";
  private phone: string = "";
  private address: string = "";
  constructor() {}
  setModel(buyer: Partial<IBuyer>) {
    if (buyer.payment !== undefined) {
      this.payment = buyer.payment;
    }
    if (buyer.email !== undefined) {
      this.email = buyer.email;
    }
    if (buyer.phone !== undefined) {
      this.phone = buyer.phone;
    }
    if (buyer.address !== undefined) {
      this.address = buyer.address;
    }
  }
  getBuyer(): IBuyer {
    return {
      payment: this.payment,
      email: this.email,
      phone: this.phone,
      address: this.address,
    };
  }
  clearBuyer(): void {
    this.payment = "";
    this.email = "";
    this.phone = "";
    this.address = "";
  }

  validate(): ValidError {
    const res: ValidError = {};
    if (this.payment === "") {
      res.payment = "Необходимо указать способ оплаты";
    }
    if (this.email === "") {
      res.email = "Необходимо указать почту";
    }
    if (this.phone === "") {
      res.phone = "Необходимо указать телефон";
    }
    if (this.address === "") {
      res.address = "Необходимо указать адрес";
    }
    return res;
  }
}
