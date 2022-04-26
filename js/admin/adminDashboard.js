import getData from "../data/apiCall.js";
import { getToken, getUserInfo } from "../utils/storage.js";

const user = getUserInfo();
const token = getToken();

if(!user.length || !token.length){
  document.location.href = "/login.html";
}

const container = document.querySelector(".product__list")

export default function createProductList(products){
  const productList = products.data;
  
  productList.forEach(product => {
    let title = product.attributes.title
    let id = product.id

    container.innerHTML += `
    <li>
      <h2>${title}</h2>

      <a class="buttons" href="/editProduct.html?id=${id}">Edit</a>
    </li>
    `
  });
  

}