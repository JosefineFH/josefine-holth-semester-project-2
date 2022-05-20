import { getFromStorage, saveProduct } from "../utils/storage.js";

shoppingCart();

export function shoppingCart() {
  const totalShoppingSum = document.querySelector(
    ".total__shopping--sum"
  );



  let existingShoppingCart = getFromStorage("shopping__card");
  const errorMessageContainer = document.querySelector(".error__message");
  if (existingShoppingCart.length === 0) {
    totalShoppingSum.style.display = "none"
    errorMessageContainer.innerHTML = `
    <p>You dont have any items her yeat</p>
    <p>You can have a look <a href="/productPage.html" style="text-decoration: underline;">her</a></p>
    `;
  }
  const shoppingCartContainer = document.querySelector(".shopping__cart--list");

  let resultFromLocalStorage = [
    ...existingShoppingCart
      .reduce((preVal, currVal) => {
        if (!preVal.has(currVal.id))
          preVal.set(currVal.id, {
            ...currVal,
            count: 0,
          });

        preVal.get(currVal.id).count++;
        return preVal;
      }, new Map())
      .values(),
  ];

  let cart;
  let sumPrProduct;
  resultFromLocalStorage.forEach((item) => {
    const itemId = item.id;
    cart = existingShoppingCart.filter((item) => item.id === itemId).length;

    shoppingCartContainer.innerHTML += `
      <div class="card">
      <img src="${item.image}">
      <h2 class="card-title">${item.title}</h2>
      <p class="single__price"><span>${item.price}</span> €</p>
      <a href="/productDetails.html?id=${item.id}">View Product</a> 
      <div class="shopping__cart--options">
      <button class="btn-primary minus__button" data-id="${item.id}" data-price="${item.price}">-</button>
      <p class="product__count" data-id="${item.id}" >${cart}</p>
      <button class="btn-primary plus__button" data-id="${item.id}" data-img="${item.image}" data-price="${item.price}" data-title="${item.title}">+</button>
      </div>
      
      <p class="total__sum">Total sum: <span data-id="${item.id}"></span> €</p>
      </div>
      `;

    const totalSumProducts = document.querySelectorAll(".total__sum span");

    const productCount = document.querySelectorAll(".product__count");
    const minusButton = document.querySelectorAll(".minus__button");
    const plusButton = document.querySelectorAll(".plus__button");

    sumPrProduct = item.price;
    totalSumProducts.forEach((element) => {
      if (element.dataset.id === item.id) {
        element.innerText = cart * sumPrProduct;
      }
    });

    let sum = 0;
    totalSumProducts.forEach((sumPrProduct) => {
      let sumsPrProduct = parseInt(sumPrProduct.innerHTML);
      sum += sumsPrProduct;
    });
    totalShoppingSum.innerHTML = `<p>Total sum: ${sum} €</p>`;

    minusButton.forEach((button) => {
      button.addEventListener("click", () => {
        const deleteThisItem = button.dataset.id;
        const singleProPrice = button.dataset.price;

        for (let i in existingShoppingCart) {
          const id = existingShoppingCart[i].id;

          if (deleteThisItem == existingShoppingCart[i].id) {
            existingShoppingCart.findIndex((i) => i.id === deleteThisItem);
            existingShoppingCart.splice(i, 1);

            productCount.forEach((count) => {
              if (count.dataset.id === id) {
                const countHTML = parseInt(count.innerText);
                count.innerHTML = countHTML - 1;
                
                totalSumProducts.forEach((element) => {
                  if (element.dataset.id === count.dataset.id) {
                    element.innerText = element.innerHTML - singleProPrice;
                    
                    let lastSum = (sum -= singleProPrice);
                    totalShoppingSum.innerHTML = `${lastSum} €`;
                  }
                });

                if(countHTML === 1){
                  location.reload();

                }
              }
            });
            break;
          }
        }

        saveProduct(existingShoppingCart);
      });
    });

    plusButton.forEach((button) => {
      button.addEventListener("click", () => {
        let singleProPrice = button.dataset.price;

        let item = {
          id: button.dataset.id,
          image: button.dataset.img,
          price: button.dataset.price,
          title: button.dataset.title,
        };
        productCount.forEach((count) => {
          if (count.dataset.id === item.id) {
            const countHTML = parseInt(count.innerText);
            count.innerHTML = countHTML + 1;

            totalSumProducts.forEach((element) => {
              if (element.dataset.id === count.dataset.id) {
                let totalSumPrProduct = element.innerHTML;

                singleProPrice = parseInt(singleProPrice);
                totalSumPrProduct = parseInt(totalSumPrProduct);
                element.innerText = totalSumPrProduct + singleProPrice;

                let lastSum = (sum += singleProPrice);
                totalShoppingSum.innerHTML = `${lastSum} €`;
              }
            });
          }
        });

        existingShoppingCart.push(item);
        saveProduct(existingShoppingCart);
      });
    });
  });
}
