// const logoutButton = document.querySelector(".logout__button");

export function logout(){
  localStorage.removeItem("token");
  localStorage.removeItem("user")

  window.location.href = "/login.html";
}
