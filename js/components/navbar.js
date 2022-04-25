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

