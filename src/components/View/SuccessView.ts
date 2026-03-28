import { ensureElement } from "../../utils/utils";
import { Component } from "../base/Component";
import { IEvents } from "../base/Events";

interface ISuccess {
  total: number;
}

export class Success extends Component<ISuccess> {
  protected orderSuccess: HTMLElement;
  protected buttonSuccess: HTMLButtonElement;

  constructor(
    container: HTMLElement,
    protected events: IEvents,
  ) {
    super(container);

    this.orderSuccess = ensureElement<HTMLElement>(
      ".order-success__description",
      this.container,
    );
    this.buttonSuccess = ensureElement<HTMLButtonElement>(
      ".order-success__close",
      this.container,
    );

    this.buttonSuccess.addEventListener("click", () => {
      this.events.emit("success:close");
    });
  }
  set total(value: number) {
    this.orderSuccess.textContent = `Списано ${value} синапсов`;
  }
}
