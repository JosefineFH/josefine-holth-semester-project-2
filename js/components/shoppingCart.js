import { getFromStorage, saveProduct } from "../utils/storage.js"

shoppingCart()
export function shoppingCart() {
  let existingShoppingCart = getFromStorage("shopping__card")
  const errorMessageContainer = document.querySelector(".error__message")
  if (existingShoppingCart.length === 0) {
    errorMessageContainer.innerHTML = `
    <p>You dont have any items her yeat</p>
    <p>You can have a look <a href="/productPage.html">her</a></p>
    `
  }
  const shoppingCartContainer = document.querySelector(".shopping__cart--list")

  let resultFromLocalStorage = [...existingShoppingCart.reduce(
    (preVal, currVal) => {
      if (!preVal.has(currVal.id))
        preVal.set(currVal.id, {
          ...currVal,
          count: 0
        });

      preVal.get(currVal.id).count++;
      return preVal;
    },
    new Map
  ).values()];

  let cart;
  resultFromLocalStorage.forEach(item => {
    const itemId = item.id
    cart = existingShoppingCart.filter((item) => item.id === itemId).length

    shoppingCartContainer.innerHTML += `
      <div class="card">
      <img src="${item.image}">
        <h2 class="card-title">${item.title}</h2>
       <p class="single__price">${item.price}</p>
       <a href="/productDetails.html?id${item.id}">View Product</a> 
       <button class="btn-primary minus__button" data-id="${item.id}">-</button>
       <p class="product__count" data-id="${item.id}">${cart}</p>
       <button class="btn-primary plus__button" data-id="${item.id}" data-img="${item.image}" data-price="${item.price}" data-title="${item.title}">+</button>

       <p class="total__sum">Total sum: <span></span></p>
      </div>
      `
  });

  const productCount = document.querySelectorAll(".product__count")
  
  // get the total sum
  // get the sum for total of one product if you have more then one 


  const minusButton = document.querySelectorAll(".minus__button")
  minusButton.forEach(button => {
    button.addEventListener("click", () => {
      const deleteThisItem = button.dataset.id
      for(let i in existingShoppingCart){
        const id = existingShoppingCart[i].id
        if(deleteThisItem == existingShoppingCart[i].id){
          existingShoppingCart.findIndex( i => i.id === deleteThisItem);
          existingShoppingCart.splice(i, 1)

          productCount.forEach(count => {
            if(count.dataset.id === id){
              const countHTML = parseInt(count.innerText)
              count.innerHTML = countHTML - 1
            }
          });

          break
        }
      }
      saveProduct(existingShoppingCart)
      
    })
  });

  const plusButton = document.querySelectorAll(".plus__button")

  plusButton.forEach(button => {
    button.addEventListener("click", () => {    
        let item = {
          id: button.dataset.id,
          image: button.dataset.img,        
          price: button.dataset.price,
          title: button.dataset.title
        }  
        productCount.forEach(count => {
          if(count.dataset.id === item.id){
            const countHTML = parseInt(count.innerText)
            count.innerHTML = countHTML + 1
          }
        });
        
      existingShoppingCart.push(item)
      saveProduct(existingShoppingCart)
      
    })
  });
}