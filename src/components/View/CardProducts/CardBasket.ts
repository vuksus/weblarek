import { ICardAction } from "../../../types";
import { ensureElement } from "../../../utils/utils";
import { Card } from "./Card";

interface ICardBusket {
  index: string;
}

export class CardBasket extends Card<ICardBusket> {
  protected itemId: HTMLElement;
  protected buttonClose: HTMLButtonElement;

  constructor(
    container: HTMLElement,
    protected action?: ICardAction,
  ) {
    super(container);

    this.itemId = ensureElement<HTMLElement>(
      ".basket__item-index",
      this.container,
    );
    this.buttonClose = ensureElement<HTMLButtonElement>(
      ".card__button",
      this.container,
    );

    if (action?.onClick) {
      this.container.addEventListener("click", action.onClick);
    }
  }

  set index(value: number) {
    this.itemId.textContent = String(value);
  }
}
