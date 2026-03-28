import { ensureElement } from "../../../utils/utils";
import { IEvents } from "../../base/Events";
import { Form } from "./Form";

interface IOrderForm {
  payment: "card" | "cash";
  address: string;
}

export class OrderForm extends Form<IOrderForm> {
  protected buttonCard: HTMLButtonElement;
  protected buttonCash: HTMLButtonElement;
  protected inputAddress: HTMLInputElement;

  constructor(
    container: HTMLElement,
    protected event: IEvents,
  ) {
    super(container);

    this.buttonCard = ensureElement<HTMLButtonElement>(
      ".button[name=card]",
      this.container,
    );
    this.buttonCash = ensureElement<HTMLButtonElement>(
      ".button[name=cash]",
      this.container,
    );
    this.inputAddress = ensureElement<HTMLInputElement>(
      ".form__input[name=address]",
      this.container,
    );

    this.buttonCard.addEventListener("click", () => {
      this.event.emit("buyer:card");
    });
    this.buttonCash.addEventListener("click", () => {
      this.event.emit("buyer:cash");
    });

    this.inputAddress.addEventListener("input", () => {
      this.event.emit("input:address", { value: this.inputAddress.value });
    });
    this.formButton.addEventListener("click", (e) => {
      e.preventDefault();
      this.event.emit("order:submit");
    });
  }

  set payment(value: "card" | "cash") {
    this.buttonCard.classList.toggle("button_alt-active", value === "card");
    this.buttonCash.classList.toggle("button_alt-active", value === "cash");
  }

  set address(value: string) {
    this.inputAddress.value = value;
  }

  set valid(value: boolean) {
    this.formButton.disabled = value;
  }
}
