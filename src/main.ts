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
  email: "string",
  phone: "string",
  address: "string",
  products: ["string"],
  total: 1,
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
    console.log(productsApi); // Вывод в консоль метода getApi()
    console.log(await communication.postApi("", testOrder)); // Метод Communication для отправки данных на сервер
    catalog.setItems(productsApi.items); // Метод Catalog для добавления данных
    console.log(catalog.getItems()); // Метод Catalog для получения хранящихся данных
    console.log(catalog.getProductsId(productsApi.items[0].id)); // Метод Catalog для получения товара по id
    catalog.setThisProduct(productsApi.items[0]); // Метод Catalog для сохранения выбранного товара
    console.log(catalog.getThisProduct()); // Метод для получения хранящегося выбранного товара
    cart.addItem(productsApi.items[0]); // Метод добавления выбранного товара в массив
    console.log(cart.getItems()); // Метод получения массива выбранных товаров
    console.log(cart.sumItems()); // Метод получения суммы стоимости всех товаров в массиве
    console.log(cart.maxItems()); // Метод получения общего количества товаров в массиве
    console.log(cart.searchItem(productsApi.items[0].id)); // Метод поиска товара в массиве по id
    console.log(cart.clearItem(productsApi.items[0])); // Метод удаления товара из массива
    console.log(cart.clearCart()); // Метод очистки всего массива
    buyer.setModel(testBuyer); // Метод заполнения новыми данными
    console.log(buyer.getBuyer); // Метод получения хранящихся данных
    console.log(buyer.validate()); // Метод проверки на пустые поля
    console.log(buyer.clearBuyer()); // Метод удаления всех данных
  } catch (e) {
    console.error(e);
  }
}

test();
