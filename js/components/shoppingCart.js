import { getFromStorage } from "../utils/storage.js"

shoppingCart()
export function shoppingCart(){
  const existingShoppingCart =   getFromStorage("shopping__card")
  const errorMessageContainer = document.querySelector(".error__message")
  if(existingShoppingCart.length === 0){
    errorMessageContainer.innerHTML = `
    <p>You dont have any items her yeat</p>
    <p>You can have a look <a href="/productPage.html">her</a></p>
    `
  }
  const shoppingCartContainer = document.querySelector(".shopping__cart--list")
  const count = {}
  
  
  existingShoppingCart.forEach(items => {
    const itemId = items.id
    const cart = existingShoppingCart.filter((item) => item.id === itemId).length

      shoppingCartContainer.innerHTML +=  `
      <div class="card">
      <img src="${items.image}">
        <h2 class="card-title">${items.title}</h2>
       <p>${items.price}</p>
       <a href="/productDetails.html?id${items.id}">View Product</a> 
       <p>${cart}</p>
      </div>
      `
  });

  // add more to shopping cart
  // remove from shopping cart
  // count items with same id in the shopping cart
}