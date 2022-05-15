import { baseUrl } from "../data/api.js";
import { getToken } from "../utils/storage.js";

export async function removeProduct(id){
  const doDelete = confirm("Do you want to delete this product?");
  const errorMessage = document.querySelector(".message");

  if(doDelete){
    const url = baseUrl + "products/" + id;
    const token = getToken();

    const options = {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    
    try {
      const response = await fetch(url, options);
      window.location.replace("/admin/adminDashboard.html")
    } catch (error) {
      errorMessage.innerHTML = "<p>Something whent wrong when you ware trying to delete this.</p>"
    }

  }

}