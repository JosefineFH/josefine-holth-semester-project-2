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
      let coverImageAltText = products[i].attributes.cover_image_alt_text
      let price = products[i].attributes.price

        productContainer.innerHTML += `
        <li class="card">
        <div class="card__item image" style="background-image: url('${coverImage}')" aria-label="${coverImageAltText}" >
        <div class="product__mark"></div>
        </div>
        <div class="card__item  p-1">
        <h2>${title}</h2>
        </div>
        <div class="card__subtext  p-1">
        <p>${price} €</p>
        </div>
        <div class="card__item flex  p-1">
        <p>${description}</p>
        </div>
          <div class="card__footer justify-space-between p-1">
            <a class="btn-secondary text-white" href="/productDetails.html?id=${id}">View Product</a>
            
            <button class="btn-secondary text-white" data-id="${id}" data-img="${coverImage}" data-price="${price}" data-title="${title}">Buy</button>
          </div>
        </li>
        `;
        const productMark = document.querySelectorAll(".product__mark")

        for (let i = 0; i < productMark.length; i++) {
          if(products[i].attributes.free == true){
            productMark[i].innerHTML = '<p>Free</p>'
          }
          if(products[i].attributes.featured === true){
            productMark[i].innerHTML = '<p>Featured</p>'
          }
        }
      }
    }

    const addToCartbutton = document.querySelectorAll(".buy__product")

    addToCartbutton.forEach(button => {
      button.addEventListener("click", addToShoppingCart)

    });
}