import { logout } from "./logout.js";
import { getToken, getUserInfo } from "../utils/storage.js";
import createProductList from "./adminDashboard.js";
import createMenu from "../components/common/createMenu.js";
import { baseUrl } from "../data/api.js";
import { searchForProduct } from "../utils/serchForProduct.js";

createMenu();

const user = getUserInfo();
const token = getToken();

if (user.length === 0 && token.length === 0) {
  document.location.href = "/login.html";
}

getData();
export default async function getData() {
  try {
    const productsUrl = baseUrl + "products?populate=*";
    const response = await fetch(productsUrl);
    const products = await response.json();

    createProductList(products);

    const search = document.querySelector("#search");
    if (search) {
      search.onkeyup = () => {
        const searchValue = event.target.value.trim().toLowerCase();
        const filterProducts = products.data.filter((product) => {
          if (product.attributes.title.toLowerCase().includes(searchValue)) {
            return true;
          }
        });
        createProductList(filterProducts);
      }
    };
  } catch (error) {
    console.log(error);
  }
}

const { pathname } = document.location;

if (pathname === "/admin/adminDashboard.html") {
  const logoutButton = document.querySelector(".logout__button");
  logoutButton.addEventListener("click", logout);
}
