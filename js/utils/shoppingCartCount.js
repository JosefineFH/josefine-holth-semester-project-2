import { getFromStorage } from "./storage.js"

export function shoppingCartCounter(){
  let currentShoppingCart = getFromStorage("shopping__card")
  const shoppingCartCount = document.querySelector(".cart__counter")

  if(currentShoppingCart.length === 0){
  } else {
    shoppingCartCount.innerHTML = currentShoppingCart.length
  }
}