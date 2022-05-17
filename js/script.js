import createMenu from "./components/common/createMenu.js";
import createHtml from "./components/common/createHTML.js";
import { searchForProduct } from "./utils/serchForProduct.js";
import { baseUrl } from "./data/api.js";
import { createFeatureProduct } from "./components/featuredProduct.js";
import { freeProducts } from "./components/common/freeProducts.js";
import { getHomeBanner } from "./components/getHomeBanner.js";
import { displayMessage } from "./components/common/displayMessage.js";
const messageContainer = document.querySelector(".message__container");
const aboutUs = document.querySelector(".about__us");
const featuredItems = document.querySelector(".featured__Items h2");

(async () => {
    const productsUrl = baseUrl + "products?populate=*";
    
    const response = await fetch (productsUrl);
    const products = await response.json();
    
    if(products.error){
      displayMessage("error", "<p>Something went wrong her when loading the page</p>", ".message__container");
      aboutUs.style.display = "none";
      featuredItems.style.display = "none";
    }
    
    if(products.data.length === 0){
      messageContainer.innerHTML = `<p class="bg-info" style="padding: 20px; text-align:center;">There is noe product her.</p>`
    } 
    if(products.length < 1){
      messageContainer.innerHTML = ""
    }
  
    createHtml(products);
    searchForProduct(products)
    createFeatureProduct(products)
    freeProducts(products)
    getHomeBanner()
})();

createMenu();