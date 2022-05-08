import { getFromStorage } from "./storage.js"

export function shoppingCartCounter(){
  let currentShoppingCart = getFromStorage("shopping__card")
  const shoppingCartCount = document.querySelector(".cart__counter")
  console.log(currentShoppingCart.length)

  if(currentShoppingCart.length === 0){
    console.log("there is noting her")
  } else {
    shoppingCartCount.innerHTML += currentShoppingCart.length
  }
}