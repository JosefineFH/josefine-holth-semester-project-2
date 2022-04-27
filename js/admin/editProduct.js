import getCategories from "../components/common/createCategorys.js";
import { baseUrl } from "../data/api.js";
import getData from "../data/apiCall.js";
import { getToken, getUserInfo } from "../utils/storage.js";

getCategories();

const token = getToken();
const user = getUserInfo();
if(user.length === 0 && token.length === 0){
  document.location.href = "/login.html";
}

const queryString = document.location.search;
const params = new URLSearchParams(queryString);
const id = params.get("id");


const message = document.querySelector(".message")
const form = document.querySelector("form");
const titleInput = document.querySelector("#title");
const descriptionInput = document.querySelector("#description");
const featuredItemValue = document.querySelector("#featured");
const freeItemValue = document.querySelector("#free__product")
const priceValue = document.querySelector("#price");

const coverInput = document.querySelector("#cover");
const productImageInput = document.querySelector("#product__images")

const altTextValue = document.querySelector("#alt_text")
const idInput = document.querySelector("#id");
const selectedCategories = document.querySelector("#category")
const productHeading = document.querySelector(".product__name")

export default function getEditData(products) {
  const productList = products.data;
  
  productList.forEach(product => {
    if (product.id == id) {      
      productHeading.innerHTML = `${product.attributes.title}`;

      let featuredItem = product.attributes.featured;
      let freeItem = product.attributes.free

      titleInput.value = product.attributes.title;
      descriptionInput.value = product.attributes.description;
      priceValue.value = product.attributes.price;
      altTextValue.value = product.attributes.image_alt_text;
      idInput.value = product.id;


      for (let i = 0; i < selectedCategories.options.length; i++) {
        let optionsId = selectedCategories.options[i].value;

        if (product.attributes.category.data == null) {
          message.innerHTML = ""
          message.innerHTML += `<p>Category is missing</p>`;

        } else {
          if (optionsId == product.attributes.category.data.id) {
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
    }
  });
  form.addEventListener("submit", submitChanges);
}

function submitChanges(event) {
  event.preventDefault();

  message.innerHTML = "";

  const id = idInput.value
  const title = titleInput.value.trim();
  const description = descriptionInput.value.trim();
  const featured = featuredItemValue.checked;
  const free = freeItemValue.checked;
  const price = priceValue.value.trim();
  const cover_image = coverInput.files;
  const productImages = productImageInput.files
  const altText = altTextValue.value.trim();
  const category = selectedCategories.value.trim();
  console.log(category)
console.log(productImages)
  console.log(cover_image)

  const data = JSON.stringify({ id, title, description, featured, free, price, altText, category })


  updateProduct(data, id, cover_image, productImages)
}

async function updateProduct(data, id, cover_image, productImages) {
  
  const updateUrl = baseUrl + "products/" + id + "?populate=*"
  const formData = new FormData();

  formData.append("files.cover_image", cover_image[0]);
  formData.append("files.images", productImages[0])
  formData.append("data", data);

  const options = {
    method: "PUT",
    body: formData,
    headers: {
      // "Content-Type": "application/json",
      
      Authorization: `Bearer ${token}`,
    },
  };
  console.log(options)

  try {
    const response = await fetch(updateUrl, options);
    const json = await response.json();

    console.log(json)
    window.location.href = "/login.html";

  } catch (error) {
    console.log(error)
  }

}