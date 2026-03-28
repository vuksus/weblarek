import { ensureElement } from "../../../utils/utils";
import { Component } from "../../base/Component";

interface IForm {
  error: string;
}

export class Form<T> extends Component<T & IForm> {
  protected formButton: HTMLButtonElement;
  protected formError: HTMLElement;

  constructor(container: HTMLElement) {
    super(container);

    this.formButton = ensureElement<HTMLButtonElement>(
      ".button[type=submit]",
      this.container,
    );
    this.formError = ensureElement<HTMLElement>(
      ".form__errors",
      this.container,
    );

    this.formButton.addEventListener("click", (e) => {
      e.preventDefault();
    });
  }

  set error(value: string) {
    this.formError.textContent = value;
  }
}
