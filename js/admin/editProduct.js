import { baseUrl } from "../data/api.js";
// import getData from "../data/apiCall.js";
import { getToken, getUserInfo } from "../utils/storage.js";
import { createCategoryList } from "./createCategory.js";

createCategoryList();

const user = getUserInfo();
const token = getToken();

if (user.length === 0 && token.length === 0) {
  document.location.href = "/login.html";
}

const queryString = document.location.search;
const params = new URLSearchParams(queryString);
const id = params.get("id");
const { pathname } = document.location;
const productName = document.querySelector(".product__name");

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

// console.log(coverInput)
// console.log(productImageInput)
const idInput = document.querySelector("#id");
// const loader = document.querySelector(".loader")

(async function () {
  const url = baseUrl + "products/" + id + "?populate=*";
  const response = await fetch(url);
  const json = await response.json();
  const editData = json.data;

  productName.innerHTML = editData.attributes.title;
  let featuredItem = editData.attributes.featured;
  let freeItem = editData.attributes.free;

  titleInput.value = editData.attributes.title;
  descriptionInput.value = editData.attributes.description;
  priceValue.value = editData.attributes.price;
  idInput.value = editData.id;

  coverInput.value = editData.attributes.cover_img_url;
  coverInputAltText.value = editData.attributes.cover_image_alt_text;
  productImageInput.value = editData.attributes.product_image_1;
  productImageAltTextInput.value = editData.attributes.product_image_1_altText;

  let category = editData.attributes.category.data;

  if (category == null) {
    message.innerHTML = "add category";
  } else {
    selectedCategories.value = editData.attributes.category.data.id;
    selectedCategories.classList.add  = "chosenCategory"
  }

  for (let i = 0; i < selectedCategories.options.length; i++) {
    let optionsId = selectedCategories.options[i].value;

    if (editData.attributes.category.data == null) {
      message.innerHTML = "";
      message.innerHTML += `<p>Category is missing</p>`;
    } else {
      if (optionsId == editData.attributes.category.data.id) {
        selectedCategories.options[i].classList.add("chosenCategory");
      }
    }
  }
      if (featuredItem === true) {
        featuredItemValue.checked = true
      }

      if (freeItem === true) {
        freeItemValue.checked = true
      }

  form.addEventListener("submit", submitChanges);
  
})();


function submitChanges(event) {
  event.preventDefault();

  message.innerHTML = "";

  const id = idInput.value
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

  const data = JSON.stringify({ id, title, description, featured, free, price, category, cover_img_url, cover_image_alt_text, product_image_1, product_image_1_altText })
  console.log(data)

  updateProduct(data, id)
}

async function updateProduct(data, id) {
  // loader.innerHTML = "loading";
  // console.log(loader)
  
  const updateUrl = baseUrl + "products/" + id + "?populate=*"
  const formData = new FormData();
  
  formData.append("data", data);
  console.log(formData)
  const options = {
    method: "PUT",
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
      message.innerHTML = `<p>There is an error. Pleas contact us to fix the problem</p>`
    }

  } catch (error) {
    message.innerHTML = `<p>There is an error. Pleas contact us to fix the problem</p>`
  }

}
