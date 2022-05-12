import addToShoppingCart from "./addToShoppingCart.js";

const featureProductContainer = document.querySelector(".feature__products")

export function createFeatureProduct(data){
const products = data.data

 for (let i = 0; i < products.length; i++) {
   let isFeatured = products[i].attributes.featured

   if(featureProductContainer){
    if(isFeatured === true){
      featureProductContainer.innerHTML += `
      <li class="card">
      <div class="card__item image" style="background-image: url('${products[i].attributes.cover_img_url}')" aria-label="${products[i].attributes.cover_image_alt_text}">
      <p class="product__mark">Featured</p>
      </div>
      <div class="card__item  p-1">
      <h2>${products[i].attributes.title}</h2>
      </div>
      <div class="card__subtext  p-1">
      <p>${products[i].attributes.price} €</p>
      </div>
      <div class="card__item flex  p-1">
      <p>${products[i].attributes.description}</p>
      </div>
        <div class="card__footer justify-space-between p-1">
          <a class="btn-secondary text-white" href="/productDetails.html?id=${products[i].id}">View Product</a>
          
          <button class="btn-secondary text-white" data-id="${products[i].id}" data-img="${products[i].attributes.cover_img_url}" data-price="${products[i].attributes.price}" data-title="${products[i].attributes.title}">Buy</button>
        </div>
      </li>
      `;
    }
  }
 }
 const addToCartbutton = document.querySelectorAll(".buy__product")

    addToCartbutton.forEach(button => {
      button.addEventListener("click", addToShoppingCart)

    });
}
