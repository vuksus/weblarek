import { Api } from "./components/base/Api";
import { EventEmitter } from "./components/base/Events";
import { Buyer } from "./components/Models/Buyer";
import { Cart } from "./components/Models/Cart";
import { Catalog } from "./components/Models/Catalog";
import { Communication } from "./components/Models/Communication";
import { Basket } from "./components/View/BasketView";
import { CardBasket } from "./components/View/CardProducts/CardBasket";
import { CardCatalog } from "./components/View/CardProducts/CardCatalog";
import { CardPreview } from "./components/View/CardProducts/CardPreview";
import { ContactForm } from "./components/View/Forms/ContactForm";
import { OrderForm } from "./components/View/Forms/OrderForm";
import { Gallery } from "./components/View/GalleryView";
import { Header } from "./components/View/HeaderView";
import { Modal } from "./components/View/ModalView";
import { Success } from "./components/View/SuccessView";
import "./scss/styles.scss";
import { Order, IProduct, IOrder } from "./types";
import { API_URL } from "./utils/constants";
import { cloneTemplate, ensureElement } from "./utils/utils";

async function run() {
  try {
    const events = new EventEmitter();

    const url = new Api(API_URL);
    const communication = new Communication(url);
    const catalog = new Catalog(events);
    const buyer = new Buyer(events);
    const cart = new Cart(events);

    const header = new Header(ensureElement(".header"), events);
    const gallery = new Gallery(ensureElement(".page__wrapper"), events);
    const basket = new Basket(cloneTemplate("#basket"), events);
    const success = new Success(cloneTemplate("#success"), events);
    const modal = new Modal(ensureElement(".modal"), events);
    const contactForm = new ContactForm(cloneTemplate("#contacts"), events);
    const orderForm = new OrderForm(cloneTemplate("#order"), events);

    const cardPreview = new CardPreview(cloneTemplate("#card-preview"), events);

    let total: number = 0;

    events.on("catalog:set", () => {
      const products = catalog.getItems();
      const cards = products.map((product) => {
        const card = new CardCatalog(
          cloneTemplate<HTMLTemplateElement>("#card-catalog"),
          {
            onClick: () => events.emit("product:select", product),
          },
        );
        return card.render(product);
      });
      gallery.catalog = cards;
    });

    events.on("basket:open", () => {
      modal.content = basket.render();
    });

    events.on("product:select", (product: IProduct) => {
      catalog.setThisProduct(product);
    });

    events.on("thisProduct:set", () => {
      const thisProduct = catalog.getThisProduct();
      if (!thisProduct) return;
      const inBasket = cart.isInBasket(thisProduct.id);
      cardPreview.button = inBasket ? "Удалить из корзины" : "Купить";
      if (thisProduct.price === null) {
        cardPreview.button = "Недоступно";
        cardPreview.valid(true);
      }
      else{
        cardPreview.valid(false);
      }
      modal.content = cardPreview.render(thisProduct);
    });

    events.on("product:choose", () => {
      const buyProduct = catalog.getThisProduct();
      if (!buyProduct) return;
      const inBasket = cart.isInBasket(buyProduct.id);
      if (inBasket) {
        cart.clearItem(buyProduct);
      } else {
        cart.addItem(buyProduct);
      }
      modal.close();
    });

    events.on("product:delete", (product: IProduct) => {
      const deleteProduct = catalog.getProductsId(product.id);
      if (!deleteProduct) return;
      cart.clearItem(deleteProduct);
    });

    events.on("basket:change", () => {
      const products = cart.getItems();
      let counter = 0;

      const arrProducts = products.map((product) => {
        const buyProduct = catalog.getProductsId(product.id);
        const basketCard = new CardBasket(
          cloneTemplate<HTMLElement>("#card-basket"),
          {
            onClick: () => events.emit("product:delete", product),
          },
        );
        const renderCard = basketCard.render(buyProduct);
        counter++;
        basketCard.index = counter;
        return renderCard;
      });
      header.counter = counter;
      basket.price = cart.sumItems();
      total = cart.sumItems();
      basket.list = arrProducts;
    });

    events.on("basket:submit", () => {
      modal.content = orderForm.render();
    });

    events.on("buyer:card", () => {
      buyer.setModel({
        payment: "card",
      });
    });

    events.on("buyer:cash", () => {
      buyer.setModel({
        payment: "cash",
      });
    });

    events.on("buyer:payment", () => {
      const thisPayment = buyer.getBuyer();
      const validPayments: ("card" | "cash")[] = ["card", "cash"];
      if (validPayments.includes(thisPayment.payment as "card" | "cash")) {
        orderForm.payment = thisPayment.payment as "card" | "cash";
      }
      const errors = buyer.validate();
      let valid: string = "";
      if (errors.payment && errors.address) {
        valid = `${errors.address}; ${errors.payment}`;
      } else if (errors.address) {
        valid = `${errors.address}`;
      } else if (errors.payment) {
        valid = `${errors.payment}`;
      }
      orderForm.error = valid;
      if (!errors.payment && !errors.address) {
        orderForm.valid = false;
      } else {
        orderForm.valid = true;
      }
    });

    events.on("input:address", (data: { value: string }) => {
      buyer.setModel({ address: data.value });
    });

    events.on("buyer:address", () => {
      const address = buyer.getBuyer().address;
      orderForm.address = address;
      const errors = buyer.validate();
      let valid: string = "";
      if (errors.payment && errors.address) {
        valid = `${errors.address}; ${errors.payment}`;
      } else if (errors.address) {
        valid = `${errors.address}`;
      } else if (errors.payment) {
        valid = `${errors.payment}`;
      }
      orderForm.error = valid;
      if (!errors.payment && !errors.address) {
        orderForm.valid = false;
      } else {
        orderForm.valid = true;
      }
    });

    events.on("order:submit", () => {
      modal.content = contactForm.render();
    });

    events.on("input:email", (data: { value: string }) => {
      buyer.setModel({ email: data.value });
    });

    events.on("buyer:email", () => {
      const email = buyer.getBuyer().email;
      contactForm.email = email;
      const errors = buyer.validate();
      let valid: string = "";
      if (errors.phone && errors.email) {
        valid = `${errors.email}; ${errors.phone}`;
      } else if (errors.phone) {
        valid = `${errors.phone}`;
      } else if (errors.email) {
        valid = `${errors.email}`;
      }
      contactForm.error = valid;
      if (!errors.email && !errors.phone) {
        contactForm.valid = false;
      } else {
        contactForm.valid = true;
      }
    });

    events.on("input:phone", (data: { value: string }) => {
      buyer.setModel({ phone: data.value });
    });

    events.on("buyer:phone", () => {
      const phone = buyer.getBuyer().phone;
      contactForm.phone = phone;
      const errors = buyer.validate();
      let valid: string = "";
      if (errors.phone && errors.email) {
        valid = `${errors.email}; ${errors.phone}`;
      } else if (errors.phone) {
        valid = `${errors.phone}`;
      } else if (errors.email) {
        valid = `${errors.email}`;
      };
      contactForm.error = valid;
      if (!errors.email && !errors.phone) {
        contactForm.valid = false;
      } else {
        contactForm.valid = true;
      }
    });

    events.on("contact:submit", async () => {
      const buyerInfo = buyer.getBuyer();
      const sum = cart.sumItems();
      const products = cart.getItems();
      const ids = products.map((elem) => elem.id);
      const orderRequest: Order = {
        payment: buyerInfo.payment,
        email: buyerInfo.email,
        address: buyerInfo.address,
        phone: buyerInfo.phone,
        total: sum,
        items: ids,
      };
      try {
        const response = await communication.postApi("/order/", orderRequest);
        events.emit("api:post", response);
      } catch (error) {
        throw error;
      }
    });

    events.on("carts:clear", () => {
      header.counter = 0;
      basket.price = 0;
      basket.list = [];
    });

    events.on("api:post", (response: IOrder) => {
      cart.clearCart();
      buyer.clearBuyer();
      success.total = response.total;
      modal.content = success.render();
    });

    events.on("basket:change", () => {
    const productsInBasket = basket.list;
    if(productsInBasket && productsInBasket.length) {
      const basketCounter = productsInBasket.length;

    header.counter = basketCounter;
    basket.price = cart.sumItems();
    basket.list = productsInBasket;
    }
    });

    events.on('buyer:changed', () => {
  const buyerInfo = buyer.getBuyer();
  const errors = buyer.validate();

  if (buyerInfo.payment === "card" || buyerInfo.payment === "cash") {
    orderForm.payment = buyerInfo.payment;
  }
  orderForm.address = buyerInfo.address;
  contactForm.email = buyerInfo.email;
  contactForm.phone = buyerInfo.phone;

  if (errors.payment || errors.address) {
    contactForm.error = `${errors.email || ''} ${errors.phone || ''}`.trim();
  } else {
    contactForm.error = '';
  }

  contactForm.valid = !errors.email && !errors.phone;
  if (errors.email || errors.phone) {
    contactForm.valid = true;
  } else {
    contactForm.valid = false;
  }
});

    events.on("success:close", () => {
      modal.close();
    });

    events.on("modal:close", () => {
      modal.close();
    });

    const response = await communication.getApi();
    catalog.setItems(response.items);
  } catch (e) {
    console.error(e);
  }
}

run();
