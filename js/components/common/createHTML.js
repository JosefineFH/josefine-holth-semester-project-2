import { baseUrl } from "../../data/api.js";
import { buyProduct } from "../../utils/addToCart.js";
import { shoppingCartCounter } from "../../utils/shoppingCartCount.js";
shoppingCartCounter()

const featureProductContainer = document.querySelector(".feature__products")
export default async function createHtml(products){  

  try {
    const productsUrl = baseUrl + "products?populate=*";
    const response = await fetch (productsUrl);
    const json = await response.json();
    const products = json.data

    for (let i = 0; i < products.length; i++) {
      let title = products[i].attributes.title;
      let id = products[i].id
      let isFeatured = products[i].attributes.featured
      let description = products[i].attributes.description
      let coverImage = products[i].attributes.cover_img_url
      let price = products[i].attributes.price
      
      if(isFeatured === true){
        featureProductContainer.innerHTML += `
        <li class="card">
        <img src="${coverImage}">
        <div class="card__body">
        <h2 class="card-tile">${title}</h2>
        <p>${description}</p>
        <button class="buy__product btn-primary" data-id="${id}" data-img="${coverImage}" data-price="${price}" data-title="${title}">Buy</button>
        <a href="/productDetails.html?${id}">View Product</a>
        </div>
        </li>
        `;
      }
    }

    const addToCartbutton = document.querySelectorAll(".buy__product")

    addToCartbutton.forEach(button => {
      console.log(button)
      button.addEventListener("click", () => {
        const buttonId = button.dataset.id
        const buttonCoverImage = button.dataset.img
        const buttonPrice = button.dataset.price
        const buttonTitle = button.dataset.title
        console.log(buttonCoverImage)

        const data = {
          id: buttonId,
          image: buttonCoverImage,
          price: buttonPrice,
          title: buttonTitle,
        }
        buyProduct(data)
      })
    });

  } catch (error) {
    console.log(error)
  }
}