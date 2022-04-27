import { logout } from "./logout.js";
import { getToken, getUserInfo } from "../utils/storage.js";
import createProductList from "./adminDashboard.js";
import createMenu from "../components/common/createMenu.js";
import getData from "../data/apiCall.js";
const user = getUserInfo();
const token = getToken();

if(user.length === 0 && token.length === 0){
  document.location.href = "/login.html";
}
const { pathname } = document.location;

createMenu();

if(pathname === "/admin/adminDashboard.html"){
  const logoutButton = document.querySelector(".logout__button");
  logoutButton.addEventListener("click", logout);
}

getData();