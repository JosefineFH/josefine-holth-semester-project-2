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

  let username;

  let authLink = `<a href="login.html" class="${pathname === "/login.html" || "/adminDashboard" ? "hide" : ""}">Login</a>`
  let logout = `<a class="logout__button">Logout</a>`

  menuContainer.innerHTML += `<li>
      <a href="/" class="${pathname === "/" || pathname === "/index.html" ? "active" : ""}">Home</a>
    </li>
    <li>
      <a href="/productPage.html" class="${pathname === "/login.html" ? "hide" : ""}">Shope</a>
    </li>
    <li>${authLink}</li>
    
    `;

}