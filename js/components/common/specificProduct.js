import { baseUrl } from "../../data/api.js";
import addToShoppingCart from "../addToShoppingCart.js";
import createMenu from "./createMenu.js";
import { displayMessage } from "./displayMessage.js";

createMenu();

const queryString = document.location.search;
const params = new URLSearchParams(queryString);
const id = params.get("id");
if (!id) {
  document.location.href = "/";
}

const productTitle = document.querySelector(".product__title");
const coverImage = document.querySelector(".cover__Image");
const description = document.querySelector(".description__container");
const imageContainer = document.querySelector(".image__container ul");
const buyProductContainer = document.querySelector(".buy__product");

(async () => {
    const productsUrl = baseUrl + `products/${id}`;
  
    const response = await fetch(productsUrl);
    const data = await response.json();
    const product = data.data.attributes;
  
    productTitle.innerHTML = `<h1 >${product.title}</h1>`;
    coverImage.innerHTML = `<img src="${product.cover_img_url}" alt="${product.cover_image_alt_text}">`
    description.innerHTML = product.description;
  
    // find out of how to check images... maby a switch statement?
  
    if(product.product_image_1.length !== 0){
      imageContainer.innerHTML += `<li><img src="${product.product_image_1}" alt="${product.product_image_1_altText}"></li>`
    }
    if(product.product_image_2 !== null){
      imageContainer.innerHTML += `<li><img src="${product.product_image_2}" alt="${product.product_image_2_altText}"></li>`
    }
  
    buyProductContainer.innerHTML = ` <button class="btn-secondary text-white" data-id="${product.id}" data-img="${product.cover_img_url}" data-price="${product.price}" data-title="${product.title}">Buy</button>`
  
    const addToCartbutton = document.querySelectorAll(".buy__product")
  
    addToCartbutton.forEach(button => {
      button.addEventListener("click", addToShoppingCart)
      
    });

    // displayMessage("error", "couldn't find the product you are looking for", "message__container")
  
})();

