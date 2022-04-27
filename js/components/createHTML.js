import { baseUrl } from "../data/api.js";
export default async function createHtml(){  
  try {
    const productsUrl = baseUrl + "products?populate=*";
    const response = await fetch (productsUrl);
    const json = await response.json();
    const products = json.data

    for (let i = 0; i < products.length; i++) {
      let title = products[i].attributes.title;
      let id = products[i].id
      
      productList.innerHTML += `
      <li>
      <a>
      <h2>${title}</h2>
      </a>
      </li>
      `

    }

  } catch (error) {
    console.log(error)
  }
}