import addToShoppingCart from "../addToShoppingCart.js";

export function freeProducts(data){
  
  const freeProductsContainer = document.querySelector(".free__products")

  const products = data.data

  products.forEach(product => {
    const isFree = product.attributes.free
    if(freeProductsContainer){
      if(isFree === true){
        freeProductsContainer.innerHTML += `
        <li class="card">
          <img src="${product.attributes.cover_img_url}">
          <div class="card__body row justify-space-around">
            <h2 class="card-tile">${product.attributes.title}</h2>
            <a href="/productDetails.html?id=${product.id}">View Product</a>
            <p>${product.attributes.description}</p>
            <button class="buy__product btn-primary" data-id="${product.id}" data-img="${product.attributes.cover_img_url}" data-price="${product.attributes.price}" data-title="${product.attributes.title}">Buy</button>
          </div>
        </li>
        `;
      }
    }
    
  });


  const addToCartbutton = document.querySelectorAll(".buy__product")

  addToCartbutton.forEach(button => {
    button.addEventListener("click", addToShoppingCart)

  });
}