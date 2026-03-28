import { IBuyer, ValidError } from "../../types";
import { IEvents } from "../base/Events";

export class Buyer {
  private payment: IBuyer["payment"] = "card";
  private email: string = "";
  private phone: string = "";
  private address: string = "";
  constructor(protected event: IEvents) {}
  setModel(buyer: Partial<IBuyer>) {
    if (buyer.payment !== undefined) {
      this.payment = buyer.payment;
      this.event.emit("buyer:payment");
    }
    if (buyer.email !== undefined) {
      this.email = buyer.email;
      this.event.emit("buyer:email");
    }
    if (buyer.phone !== undefined) {
      this.phone = buyer.phone;
      this.event.emit("buyer:phone");
    }
    if (buyer.address !== undefined) {
      this.address = buyer.address;
      this.event.emit("buyer:address");
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
    this.payment = "card";
    this.email = "";
    this.phone = "";
    this.address = "";
    this.event.emit("buyer:clear");
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
