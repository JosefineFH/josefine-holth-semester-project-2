import { baseUrl } from "../data/api.js";
import createProductList from "../admin/adminDashboard.js";

export default async function getData(){
  try {
    const productsUrl = baseUrl + "products?populate=*";
    const response = await fetch (productsUrl);
    const json = await response.json();

    const { pathname } = document.location;
  
    if( pathname === "/adminDashboard.html" ){
      createProductList(json)
    }


  } catch (error) {
    console.log(error)
  }
}