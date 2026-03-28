import { ICardAction } from "../../../types";
import { categoryMap, CDN_URL } from "../../../utils/constants";
import { ensureElement } from "../../../utils/utils";
import { Card } from "./Card";

interface ICardCatalog {
  category: string;
  image: string;
}

export class CardCatalog extends Card<ICardCatalog> {
  protected cardCategory: HTMLElement;
  protected cardImage: HTMLImageElement;

  constructor(
    container: HTMLElement,
    protected action?: ICardAction,
  ) {
    super(container);

    this.cardCategory = ensureElement<HTMLElement>(
      ".card__category",
      this.container,
    );
    this.cardImage = ensureElement<HTMLImageElement>(
      ".card__image",
      this.container,
    );

    if (action?.onClick) {
      this.container.addEventListener("click", action.onClick);
    }
  }

  set category(value: string) {
    this.cardCategory.textContent = value;
    this.cardCategory.className = "card__category";

    const resCategory = Object.entries(categoryMap).find(
      ([key]) => key === value,
    );
    if (resCategory) {
      this.cardCategory.classList.add(resCategory[1]);
    }
  }

  set image(src: string) {
    this.cardImage.src = CDN_URL + src;
  }
}
