import { categoryMap, CDN_URL } from "../../../utils/constants";
import { ensureElement } from "../../../utils/utils";
import { IEvents } from "../../base/Events";
import { Card } from "./Card";

interface ICardPreview {
  category: string;
  image: string;
  button: string;
  text: string;
}

export class CardPreview extends Card<ICardPreview> {
  protected cardCategory: HTMLElement;
  protected cardImage: HTMLImageElement;
  protected cardButton: HTMLButtonElement;
  protected cardText: HTMLElement;

  constructor(
    container: HTMLElement,
    protected event: IEvents,
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
    this.cardButton = ensureElement<HTMLButtonElement>(
      ".card__button",
      this.container,
    );
    this.cardText = ensureElement<HTMLElement>(".card__text", this.container);

    this.cardButton.addEventListener("click", () => {
      this.event.emit("product:choose");
    });
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

  set text(value: string) {
    this.cardText.textContent = value;
  }

  set button(value: string) {
    this.cardButton.textContent = value;
  }
}
