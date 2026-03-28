import { ensureElement } from "../../../utils/utils";
import { Component } from "../../base/Component";

interface ICard {
  title: string;
  price: number | null;
}

export class Card<T> extends Component<T & ICard> {
  protected cardTitle: HTMLElement;
  protected cardPrice: HTMLElement;

  constructor(container: HTMLElement) {
    super(container);

    this.cardTitle = ensureElement<HTMLElement>(".card__title", this.container);
    this.cardPrice = ensureElement<HTMLElement>(".card__price", this.container);
  }

  set title(value: string) {
    this.cardTitle.textContent = value;
  }

  set price(value: number | null) {
    this.cardPrice.textContent = `${value} синапсов`;
    if (value === null) {
      this.cardPrice.textContent = "Бесценно";
    }
  }
}
