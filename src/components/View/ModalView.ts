import { ensureElement } from "../../utils/utils";
import { Component } from "../base/Component";
import { IEvents } from "../base/Events";

interface IModal {
  content: HTMLElement;
}

export class Modal extends Component<IModal> {
  protected modalContent: HTMLElement;
  protected modalClose: HTMLButtonElement;

  constructor(
    container: HTMLElement,
    protected events: IEvents,
  ) {
    super(container);

    this.modalContent = ensureElement<HTMLElement>(
      ".modal__content",
      this.container,
    );
    this.modalClose = ensureElement<HTMLButtonElement>(
      ".modal__close",
      this.container,
    );

    this.modalClose.addEventListener("click", () => {
      this.close();
    });

    this.container.addEventListener("click", (e) => {
      if (e.target === this.container) {
        this.close();
      }
    });
  }

  set content(item: HTMLElement) {
    this.modalContent.replaceChildren(item);
  }

  open(): void {
    this.container.classList.add("modal_active");
  }

  close(): void {
    this.container.classList.remove("modal_active");
  }
}
