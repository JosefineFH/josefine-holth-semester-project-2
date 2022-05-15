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
const productImageInputTwo = document.querySelector("#productImage__two");
const productImageAltTextInputTwo = document.querySelector(
  "#productImage__two--altText"
);

form.addEventListener("submit", getFormValue);

async function getFormValue(event) {
  event.preventDefault();

  const title = titleInput.value.trim();
  const description = descriptionInput.value.trim();
  const featured = featuredItemValue.checked;
  const free = freeItemValue.checked;
  let price = priceValue.value.trim();
  const category = selectedCategories.value.trim();
  const cover_img_url = coverInput.value.trim();
  const cover_image_alt_text = coverInputAltText.value.trim();
  const product_image_1 = productImageInput.value.trim();
  const product_image_1_altText = productImageAltTextInput.value.trim();
  const product_image_2 = productImageInputTwo.value.trim();
  const product_image_2_altText = productImageAltTextInputTwo.value.trim(); 
  const messageContainer = document.querySelector(".message__container ul")
  
  // price = parseInt(price)
  const data = JSON.stringify({ title, description, featured, free, price, category, cover_img_url, cover_image_alt_text, product_image_1, product_image_1_altText, product_image_2, product_image_2_altText })

  messageContainer.innerHTML = ""

  if(title.length < 3 ){
    messageContainer.innerHTML += `<li class="error"><p>The title is to short</p></li>`
  }
  if(description.length < 10 ){
    messageContainer.innerHTML += `<li class="error"><p>The title is to short. It has to contain 10 character or more</p></li>`
  }
  if(price.length < 2 ){
    messageContainer.innerHTML += `<li class="error"><p>The price most be mor then 1 character end most be number</p></li>`
  }
  if(category.length < 1 ){
    messageContainer.innerHTML += `<li class="error"><p>You most have a category</p></li>`
  }
  if(cover_img_url.length < 1 ){
    messageContainer.innerHTML += `<li class="error"><p>There most be a cover images her</p></li>`
  }
  if(cover_image_alt_text.length < 5 ){
    messageContainer.innerHTML += `<li class="error"><p>The alt text most be more then 5 characters</p></li>`
  }

  form.addEventListener("submit", () => {
    addProduct(data)
  })
  
}

async function addProduct(data) {
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

    if (json.error) {
      displayMessage("error", "There is something wrong her. You can contact admin.", ".message__container")
    }

  } catch (error) {
    console.log(error)
  }
}