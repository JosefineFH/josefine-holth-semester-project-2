const dropdownMenu = document.querySelector(".fa-bars");
const menu = document.querySelector(".dropdown__items");

dropdownMenu.addEventListener("click", () => {
  if (menu.style.display === "none") {
    
    menu.style.display = "block";
  } else {
    menu.style.display = "none";
  }
});
menu.addEventListener("click", () => {
  menu.style.display = "none";
});

export default function createMenu() {
  const { pathname } = document.location;

  const menuContainer = document.querySelector(".menu-container");

  menuContainer.innerHTML += `
  <li class="dashboard__button" style="display: none">
    <a href="/admin/adminDashboard.html">Dashboard</a>
  </li>
  <li>
    <a href="/">Home</a>
  </li>
  <li>
    <a href="/productPage.html" >Shope</a>
  </li>
  <li class="login__button"><a href="/login.html">login</a></li>
    `;

  const loginButton = document.querySelector(".login__button");
  const backToDashboard = document.querySelector(".dashboard__button");

  switch (pathname) {
    case "/login.html":
      loginButton.style.display = "none";
      break;
    case "/admin/adminDashboard.html":
      loginButton.style.display = "none";
      break;
    case "/admin/editProduct.html":
      loginButton.style.display = "none";
      backToDashboard.style.display = "block";
      break;
    case "/admin/addProduct.html":
      loginButton.style.display = "none";
      backToDashboard.style.display = "block";
      break;
    default:
      break;
  }
}
