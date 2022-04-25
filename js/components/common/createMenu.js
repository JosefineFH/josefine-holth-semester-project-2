export default function createMenu() {
  console.log("creating menu")

  const { pathname } = document.location;

  const menuContainer = document.querySelector(".menu-container");

  let username;

  let authLink = `<a href="login.html" class="${pathname === "/login.html" ? "hide" : ""}">Login</a>`

  menuContainer.innerHTML += `<li>
      <a href="/" class="${pathname === "/" || pathname === "/index.html" ? "active" : ""}">Home</a>
    </li>
    <li>
      <a href="/productPage.html" class="${pathname === "/login.html" ? "hide" : ""}">Shope</a>
    </li>
    <li>${authLink}</li>
    `;

}