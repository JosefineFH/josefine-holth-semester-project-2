import createMenu from "./components/common/createMenu.js";
import createHtml from "./components/common/createHTML.js";
import { searchForProduct } from "./utils/serchForProduct.js";
import { baseUrl } from "./data/api.js";
import { createFeatureProduct } from "./components/featuredProduct.js";
import createProductList from "./admin/adminDashboard.js";

getData()
export default async function getData(){
  try {
    const productsUrl = baseUrl + "products?populate=*";
    
    const response = await fetch (productsUrl);
    const products = await response.json();

    createHtml(products);
    searchForProduct(products)
    createFeatureProduct(products)

    
    createFeatureProduct(json)
  } catch (error) {
    console.log(error)
  }
}

createMenu();
// searchForProduct()