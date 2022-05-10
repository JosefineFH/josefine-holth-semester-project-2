import { shoppingCartCounter } from "../../utils/shoppingCartCount.js";
import addToShoppingCart from "../addToShoppingCart.js";
shoppingCartCounter();
const productContainer = document.querySelector(".products__container")

export default async function createHtml(data){  
  let products = data.data
  if(products === undefined){
    products = data
  }

    if(productContainer){
    productContainer.innerHTML = ""  
    for (let i = 0; i < products.length; i++) {
      let title = products[i].attributes.title;
      let id = products[i].id
      let description = products[i].attributes.description
      let coverImage = products[i].attributes.cover_img_url
      let price = products[i].attributes.price

        productContainer.innerHTML += `
        <li class="card">
        <img src="${coverImage}">
          <div class="card__body row justify-space-around">
            <h2 class="card-tile">${title}</h2>
            <a href="/productDetails.html?id=${id}">View Product</a>
            <p>${description}</p>
            <button class="buy__product btn-primary" data-id="${id}" data-img="${coverImage}" data-price="${price}" data-title="${title}">Buy</button>
          </div>
        </li>
        `;
      }
    }

    const addToCartbutton = document.querySelectorAll(".buy__product")

    addToCartbutton.forEach(button => {
      button.addEventListener("click", addToShoppingCart)

    });
}