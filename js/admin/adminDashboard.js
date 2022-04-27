import getData from "../data/apiCall.js";
import { getToken, getUserInfo } from "../utils/storage.js";


export default function createProductList(products){

  const container = document.querySelector(".product__list")
  const productList = products.data;
  
  productList.forEach(product => {
    let title = product.attributes.title
    let id = product.id

    container.innerHTML += `
    <li>
      <h2>${title}</h2>

      <a class="buttons" href="/admin/editProduct.html?id=${id}">Edit</a>
    </li>
    `
  });
  

}