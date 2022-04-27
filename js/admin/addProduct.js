import { getToken, getUserInfo } from "../utils/storage.js";
import { baseUrl } from "../data/api.js";

const user = getUserInfo();
const token = getToken();

if (user.length === 0 && token.length === 0) {
  document.location.href = "/login.html";
}

const message = document.querySelector(".message");
const form = document.querySelector("form");

const titleInput = document.querySelector("#title");
const descriptionInput = document.querySelector("#description");
const featuredItemValue = document.querySelector("#featured");
const freeItemValue = document.querySelector("#free__product");
const priceValue = document.querySelector("#price");
const coverInput = document.querySelector("#cover");
const productImageInput = document.querySelector("#product__images");
const altTextValue = document.querySelector("#alt_text");
const selectedCategories = document.querySelector("#category");

export function getFormValue(event) {
  event.preventDefault();

  console.log("add product");

  const title = titleInput.value.trim();
  const description = descriptionInput.value.trim();
  const featured = featuredItemValue.checked;
  const free = freeItemValue.checked;
  const price = priceValue.value.trim();
  const cover_image = coverInput.files;
  const productImages = productImageInput.files
  const altText = altTextValue.value.trim();
  const category = selectedCategories.value.trim();

  const data = JSON.stringify({ title, description, featured, free, price, altText, category })

  addProduct(data, cover_image, productImages)
}

form.addEventListener("submit", getFormValue);

async function addProduct(data, cover_image, productImages){

  const updateUrl = baseUrl + "products"
  const formData = new FormData();

  formData.append("files.cover_image", cover_image[0]);
  formData.append("files.images", productImages[0])
  formData.append("data", data);

  const options = {
    method: "POST",
    body: formData,
    headers: {
      // "Content-Type": "application/json",
      
      Authorization: `Bearer ${token}`,
    },
  };

  console.log(options)
  console.log(data)

  try {
    const response = await fetch(updateUrl, options);
    const json = await response.json();

    console.log(json)

    if(json.error){
      console.log("error")
    }

  } catch (error) {
    console.log(error)
  }
}