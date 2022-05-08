// import getCategories from "../components/common/createCategory.js";
import { baseUrl } from "../data/api.js";
import getData from "../data/apiCall.js";
import { getToken, getUserInfo } from "../utils/storage.js";


const token = getToken();
const user = getUserInfo();
const queryString = document.location.search;
const params = new URLSearchParams(queryString);
const id = params.get("id");
const { pathname } = document.location;
const productName = document.querySelector(".product__name")


const message = document.querySelector(".message")
const form = document.querySelector("form");
const titleInput = document.querySelector("#title");
const descriptionInput = document.querySelector("#description");
const featuredItemValue = document.querySelector("#featured");
const freeItemValue = document.querySelector("#free__product")
const priceValue = document.querySelector("#price");

const coverInput = document.querySelector("#cover");
const productImageInput = document.querySelector("#product__images")
const selectedCategories = document.querySelector("#category")

const altTextValue = document.querySelector("#alt_text")
const idInput = document.querySelector("#id");
const loader = document.querySelector(".loader")

export default function getEditData(products) {
  getCategories();
  
  const productList = products.data;

  productList.forEach(product => {
    if (product.id == id) {      
      console.log(product)
      productName.innerHTML = product.attributes.title
      let featuredItem = product.attributes.featured;
      let freeItem = product.attributes.free

 

      titleInput.value = product.attributes.title;
      descriptionInput.value = product.attributes.description;
      priceValue.value = product.attributes.price;
      altTextValue.value = product.attributes.image_alt_text;
      idInput.value = product.id;
      
      let category = product.attributes.category.data
      if(category == null){
        message.innerHTML = "add category"
      } else {
        selectedCategories.value = product.attributes.category.data.id
      }

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

      let imageDoesNotExist = product.attributes.cover_image.data
      const coverImageContainer = document.querySelector(".cover__image")

      if(imageDoesNotExist === null){
        message.innerHTML = `<p>There is noe cover image here of the product, please add one.</p>`
      } else {
        coverImageContainer.style.display = "none"
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

  const data = JSON.stringify({ id, title, description, featured, free, price, altText, category })

  updateProduct(data, id, cover_image, productImages)
}

async function updateProduct(data, id, cover_image, productImages) {
  loader.innerHTML = "loading";
  console.log(loader)
  
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

  try {
    const response = await fetch(updateUrl, options);
    const json = await response.json();
    console.log(json)
    // window.location.href = "/admin/adminDashboard.html";
    if(json.error){
      message.innerHTML = `<p>There is an error. Pleas contact us to fix the problem</p>`
    }

  } catch (error) {
    message.innerHTML = `<p>There is an error. Pleas contact us to fix the problem</p>`
  }

}