import { getFromStorage, saveProduct } from "./storage.js"

export function buyProduct(data){
  const currentShoppingCart = getFromStorage("shopping__card");
  const shoppingCartCount = document.querySelector(".cart__counter")

  currentShoppingCart.forEach(items => {
  });


  let count = currentShoppingCart.length

  if(currentShoppingCart.length === 0){
    currentShoppingCart.push(data)

    saveProduct(currentShoppingCart)
  } else {
    currentShoppingCart.push(data)
    saveProduct(currentShoppingCart)
  }

  count++
  shoppingCartCount.innerHTML = count

}