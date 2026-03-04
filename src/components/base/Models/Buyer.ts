import { IBuyer, ValidError } from "../../../types";

export class Buyer {
  payment: IBuyer["payment"];
  email: string;
  phone: string;
  address: string;
  constructor(buyers?: IBuyer) {
    this.payment = buyers?.payment || "";
    this.email = buyers?.email || "";
    this.phone = buyers?.phone || "";
    this.address = buyers?.address || "";
  }
  setModel(buyers: IBuyer) {
    if (buyers.payment !== undefined) {
      this.payment = buyers.payment;
    }
    if (buyers.email !== undefined) {
      this.email = buyers.email;
    }
    if (buyers.phone !== undefined) {
      this.phone = buyers.phone;
    }
    if (buyers.address !== undefined) {
      this.address = buyers.address;
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
