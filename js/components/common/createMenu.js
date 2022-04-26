import { getUserInfo, getToken } from "../../utils/storage.js";

const dropdownMenu = document.querySelector(".fa-bars");
const menu = document.querySelector(".dropdown__items");

dropdownMenu.addEventListener("click",() => {
  if(menu.style.display === "none"){
    menu.style.display = "block";
  } else {
    menu.style.display = "none"
  }
})
menu.addEventListener("click", () => {
  menu.style.display = "none"
})

export default function createMenu() {
  console.log("creating menu")

  const { pathname } = document.location;

  const menuContainer = document.querySelector(".menu-container");

  let username = getUserInfo();
  let token = getToken();
  console.log(token.length)
  console.log(username.length)

  let authLink;

  if(username.length &&  token.length === 0){
    authLink = `<a href="/">logout</a>`;
  } else {
    authLink = `<a href="/login.html">login</a>`;
  }
  console.log(authLink)

  // let logout = `<a class="logout__button">Logout</a>`

  menuContainer.innerHTML += `
    <li>
      <a href="/">Home</a>
    </li>
    <li>
      <a href="/productPage.html" >Shope</a>
    </li>
    <li>${authLink}</li>
    
    `;

}

https://github.com/NoroffFEU/frontend-for-strapi-api/blob/step-9-protected-routes/js/components/common/createMenu.js