import { baseUrl } from "../../data/api.js";

export default async function getCategories(){
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
    console.log(error)
  }
}