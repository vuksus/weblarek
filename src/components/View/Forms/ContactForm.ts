import { ensureElement } from "../../../utils/utils";
import { IEvents } from "../../base/Events";
import { Form } from "./Form";

interface IContactForm {
  email: string;
  phone: string;
}

export class ContactForm extends Form<IContactForm> {
  protected inputEmail: HTMLInputElement;
  protected inputPhone: HTMLInputElement;

  constructor(
    container: HTMLElement,
    protected event: IEvents,
  ) {
    super(container);

    this.inputEmail = ensureElement<HTMLInputElement>(
      ".form__input[name=email]",
      this.container,
    );
    this.inputPhone = ensureElement<HTMLInputElement>(
      ".form__input[name=phone]",
      this.container,
    );
    

    this.inputEmail.addEventListener("input", () => {
      this.event.emit("input:email", { value: this.inputEmail.value });
    });
    this.inputPhone.addEventListener("input", () => {
      this.event.emit("input:phone", { value: this.inputPhone.value });
    });
    this.container.addEventListener("submit", (e) => {
      e.preventDefault();
      this.event.emit("contact:submit")
    })
  }

  set email(value: string) {
    this.inputEmail.value = value;
  }

  set phone(value: string) {
    this.inputPhone.value = value;
  }

  set valid(value: boolean) {
    this.formButton.disabled = value;
  }
}
