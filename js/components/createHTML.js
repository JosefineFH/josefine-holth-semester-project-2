import { baseUrl } from "../data/api.js";

  console.log("submenu is running");
  let productList = document.querySelector(".product__list");
  
  try {
    const productsUrl = baseUrl + "products?populate=*";
    const response = await fetch (productsUrl);
    const json = await response.json();
    const products = json.data
    
    products.forEach(product => {
      // console.log(product.attributes);
      let title = product.attributes.title;
      let coverImage = product.attributes.cover_image.data.attributes.url
      console.log(coverImage)

      productList.innerHTML += `
      <div class="card">
      <img class="card__image" src="${coverImage}" alt="Italian Trulli">
      <h2>${title}</h2>
      </div>
      `
      
    });

  } catch (error) {
    console.log(error)
  }