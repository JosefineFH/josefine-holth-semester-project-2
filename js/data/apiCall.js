import createProductList from "../admin/adminDashboard.js";
// import getEditData from "../admin/editProduct.js";
import { baseUrl } from "../data/api.js";

export default async function getData(){
  
  const { pathname } = document.location;

  try {
    const productsUrl = baseUrl + "products?populate=*";
    const response = await fetch (productsUrl);
    const json = await response.json();

    if(pathname === "/admin/adminDashboard.html"){
      createProductList(json);
    }
    // if(pathname === "/admin/editProduct.html"){
    //   getEditData(json)
    // }

  } catch (error) {
    console.log(error)
  }
}