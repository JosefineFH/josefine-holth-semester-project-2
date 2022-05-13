import addToShoppingCart from "../addToShoppingCart.js";

export function freeProducts(data){
  
  const freeProductsContainer = document.querySelector(".free__products")
  const freeContainer = document.querySelector(".free__header")

  const products = data.data

  products.forEach(product => {
    const isFree = product.attributes.free

    if(freeProductsContainer){
      if(isFree === true){
        freeContainer.innerHTML = `<h2>Free items</h2>`
        freeProductsContainer.innerHTML += `
        <li class="card">
        <div class="card__item image" style="background-image: url('${product.attributes.cover_img_url}')" aria-label="${product.attributes.cover_image_alt_text}">
        <p class="product__mark">Free</p>
        </div>
        <div class="card__item  p-1">
        <h2>${product.attributes.title}</h2>
        </div>
        <div class="card__item flex  p-1">
        <p>${product.attributes.description}</p>
        </div>
          <div class="card__footer justify-space-between p-1">
            <a class="btn-secondary text-white" href="/productDetails.html?id=${product.id}">View Product</a>
            
            <button class="btn-secondary text-white" data-id="${product.id}" data-img="${product.attributes.cover_img_url}" data-price="${product.attributes.price}" data-title="${product.attributes.title}">Buy</button>
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