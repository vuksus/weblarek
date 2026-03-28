import { ensureElement } from "../../utils/utils";
import { Component } from "../base/Component";
import { IEvents } from "../base/Events";

interface IBasket {
  list: HTMLElement[];
  price: number;
}

export class Basket extends Component<IBasket> {
  protected basketList: HTMLElement;
  protected basketPrice: HTMLElement;
  protected basketButton: HTMLButtonElement;

  constructor(
    container: HTMLElement,
    protected events: IEvents,
  ) {
    super(container);

    this.basketList = ensureElement<HTMLElement>(
      ".basket__list",
      this.container,
    );
    this.basketPrice = ensureElement<HTMLElement>(
      ".basket__price",
      this.container,
    );
    this.basketButton = ensureElement<HTMLButtonElement>(
      ".basket__button",
      this.container,
    );

    this.basketButton.addEventListener("click", () => {
      this.events.emit("basket:submit");
    });
    this.basketButton.disabled = true;
  }

  set list(items: HTMLElement[]) {
    this.basketList.replaceChildren(...items);
    if (items.length === 0) {
      this.basketButton.disabled = true;
    } else {
      this.basketButton.disabled = false;
    }
  }

  set price(value: number) {
    this.basketPrice.textContent = `${value} синапсов`;
  }
}
