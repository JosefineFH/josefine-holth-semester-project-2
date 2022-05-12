import { getToken, getUserInfo } from "../utils/storage.js";
import { baseUrl } from "../data/api.js";
import { createCategoryList } from "./createCategory.js";
import { displayMessage } from "../components/common/displayMessage.js";

createCategoryList();

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

// Inputs for the images
const coverInput = document.querySelector("#cover");
const coverInputAltText = document.querySelector("#cover__altText");
const productImageInput = document.querySelector("#product__images");
const productImageAltTextInput = document.querySelector("#cover__altText");
const selectedCategories = document.querySelector("#category");

form.addEventListener("submit", getFormValue);

async function getFormValue(event) {
  event.preventDefault();

  const title = titleInput.value.trim();
  const description = descriptionInput.value.trim();
  const featured = featuredItemValue.checked;
  const free = freeItemValue.checked;
  const price = priceValue.value.trim();
  const category = selectedCategories.value.trim();
  const cover_img_url = coverInput.value.trim();
  const cover_image_alt_text = coverInputAltText.value.trim();
  const product_image_1 = productImageInput.value.trim();
  const product_image_1_altText = productImageAltTextInput.value.trim();

  const data = JSON.stringify({ title, description, featured, free, price, category, cover_img_url, cover_image_alt_text, product_image_1, product_image_1_altText })
  console.log(data)
  if (title.length < 3 || description.length < 10 || price.length < 2 || category.length === 1 || cover_img_url.length === 1 || cover_image_alt_text.length < 5 ) {
  console.log("error")
  displayMessage("error", "There is something missing in the form for adding products", ".message__container")
  
}


  addProduct(data)
  form.addEventListener("submit", addProduct)
}


async function addProduct(data){
  const formData = new FormData();
  formData.append("data", data);

  const updateUrl = baseUrl + "products";

  const options = {
    method: "POST",
    body: formData,
    headers: {
      // "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };


  try {
    const response = await fetch(updateUrl, options);
    const json = await response.json();

    console.log(json)
    window.location.replace("/admin/adminDashboard.html")
    
    if(json.error){
      console.log("error")
    }

  } catch (error) {
    console.log(error)
  }
}