import { Api } from "./components/base/Api";
import { Buyer } from "./components/Models/Buyer";
import { Cart } from "./components/Models/Cart";
import { Catalog } from "./components/Models/Catalog";
import { Communication } from "./components/Models/Communication";
import "./scss/styles.scss";
import { IBuyer, Order } from "./types";
import { API_URL } from "./utils/constants";

const testOrder: Order = {
  payment: "card",
  email: "test@test.ru",
  phone: "+71234567890",
  address: "Spb Vosstania 1",
  items: ["854cef69-976d-4c2a-a18c-2aa45046c390"],
  total: 750,
};

const testBuyer: IBuyer = {
  payment: "",
  email: "string",
  phone: "string",
  address: "string",
};

async function test() {
  try {
    const url = new Api(API_URL); // Экземпляр Api
    const communication = new Communication(url); //Экземпляр Communication
    const catalog = new Catalog(); // Экземпляр Catalog
    const buyer = new Buyer(); // Экземпляр Buyer
    const cart = new Cart(); // Экземпляр Cart
    const productsApi = await communication.getApi(); // Метод Communication для получения данных с сервера
    console.log("Выводим в консоль данные полученные с сервера:", productsApi);
    console.log(
      "Выводим в консоль данные о товаре и покупателе отправенные на сервер:",
      await communication.postApi("/order/", testOrder),
    );
    catalog.setItems(productsApi.items); // Метод Catalog для добавления данных
    console.log("Выводим в консоль все товары:", catalog.getItems());
    console.log(
      "Выводим в консоль результат поиска товара по id",
      catalog.getProductsId(productsApi.items[0].id),
    );
    catalog.setThisProduct(productsApi.items[0]); // Метод Catalog для сохранения выбранного товара
    console.log("Выводим в консоль выбранный товар:", catalog.getThisProduct());
    cart.addItem(productsApi.items[0]); // Метод добавления выбранного товара в массив
    console.log(
      "Выводим в консоль товары хранящиеся в корзине:",
      cart.getItems(),
    );
    console.log(
      "Выводим в консоль общую стоимость товаров в корзине:",
      cart.sumItems(),
    );
    console.log(
      "Выводим в консоль количество товаров в корзине:",
      cart.maxItems(),
    );
    console.log(
      "Выводим в консоль результат поиска товара в корзине по id:",
      cart.searchItem(productsApi.items[0].id),
    );
    console.log(
      "Выводим в консоль результат удаления нужного товара из корзины:",
      cart.clearItem(productsApi.items[0]),
    );
    console.log(
      "Выводим в консоль результат очистки всей корзины",
      cart.clearCart(),
    );
    buyer.setModel(testBuyer); // Метод заполнения новыми данными покупателя
    console.log(
      "Выводим в консоль заполненную информацию о покупателе:",
      buyer.getBuyer,
    );
    console.log(
      "Выводим в консоль результат проверки на заполненные поля:",
      buyer.validate(),
    );
    console.log(
      "Выводим в консоль результат очистки данных покупателя",
      buyer.clearBuyer(),
    );
  } catch (e) {
    console.error(e);
  }
}

test();
