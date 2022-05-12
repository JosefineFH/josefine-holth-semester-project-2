import { baseUrl } from "../../data/api.js";
import createMenu from "./createMenu.js";
createMenu();

const queryString = document.location.search;
const params = new URLSearchParams(queryString);
const id = params.get("id");
if (!id) {
  document.location.href = "/";
}

const productTitle = document.querySelector(".product__title");
const coverImage = document.querySelector(".cover__Image");
const description = document.querySelector(".description__container");
try {
  const productsUrl = baseUrl + `products/${id}`;

  const response = await fetch(productsUrl);
  const data = await response.json();
  const product = data.data.attributes;
  console.log(product)

  productTitle.innerHTML = product.title;
  coverImage.innerHTML = `<img src="${product.cover_img_url}" style="width: 200px">`
  description.innerHTML = product.description;

} catch (error) {
  console.log(error);
}
