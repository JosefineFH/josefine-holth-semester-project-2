import { displayMessage } from "../components/errorMessages.js";
import { baseUrl } from "../data/api.js";

export async function createCategoryList(){
  const categorySelect = document.querySelector("#category");

    try {
    const categoriesUrl = baseUrl + "categories";
    const response = await fetch (categoriesUrl);
    const json = await response.json(); 

    json.data.forEach(category => {
      categorySelect.innerHTML += `
      <option value='${category.id}'>${category.attributes.category_title}</option>
      `
    });

  } catch (error) {
    displayMessage("error", "The category are missing", "message__container")
  }
}