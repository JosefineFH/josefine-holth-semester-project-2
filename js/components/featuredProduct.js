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
        <img src="${products[i].attributes.cover_img_url}">
        <div class="card__body row justify-space-around">
          <h2 class="card-tile">${products[i].attributes.title}</h2>
          <a href="/productDetails.html?id=${products[i].id}">View Product</a>
          <p>${products[i].attributes.description}</p>
          <button class="buy__product btn-primary" data-id="${products[i].id}" data-img="${products[i].attributes.cover_img_url}" data-price="${products[i].attributes.price}" data-title="${products[i].attributes.title}">Buy</button>
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
