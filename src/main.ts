import { Api } from "./components/base/Api";
import { Buyer } from "./components/base/Models/Buyer";
import { Cart } from "./components/base/Models/Cart";
import { Catalog } from "./components/base/Models/Catalog";
import { Communication } from "./components/base/Models/Communication";
import "./scss/styles.scss";
import { API_URL } from "./utils/constants";

async function Test() {
  try {
    const catalog = new Catalog(); // Экземпляр Catalog
    const url = new Api(API_URL); // Экземпляр Api
    const communication = new Communication(url); //Экземпляр Communication
    const productsApi = await communication.getApi(); // Метод Communication для получения данных с сервера
    catalog.setItems(productsApi.items); // Метод Catalog для добавления данных
    console.log(catalog.getItems()); // Метод Catalog для получения хранящихся данных
  } catch (e) {
    console.error(e);
  }
}

Test();
