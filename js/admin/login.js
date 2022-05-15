import { displayMessage } from "../components/errorMessages.js";
import { baseUrl } from "../data/api.js";
import { getToken, getUserInfo, saveToken, saveUserInfo } from "../utils/storage.js";

const form = document.querySelector("form");
const email = document.querySelector("#email");
const password = document.querySelector("#password");
const message = document.querySelector(".message__container");

const user = getUserInfo();
const token = getToken();

if(user.length && token.length){
  document.location.href = "/admin/adminDashboard.html";
}

form.addEventListener("submit", login);

function login(event) {
  event.preventDefault();
  const emailValue = email.value.toLowerCase().trim();
  const passwordValue = password.value.trim();

  loginUser(emailValue, passwordValue);

  message.innerHTML = ""
  if (emailValue.length < 3) {
    displayMessage("error", "There is something wrong with your email", ".message__container" )
  }
  if (passwordValue.length < 4) {
    displayMessage("error", "There is something wrong with your password", ".message__container" )
  }
}

async function loginUser(email, password) {
  const loginUrl = baseUrl + "auth/local"
 
  const data = JSON.stringify({ identifier: email, password: password });

  const option = {
    method: "POST",
    body: data,
    headers: {
      "Content-Type": "application/json",
    },
  };
 
  try {
    const response = await fetch(loginUrl, option)
    const json = await response.json()
    if(json.user){
      const jwt = json.jwt;
      const username = json.user.username
      saveToken(jwt);
      saveUserInfo(username);

      location.href = "/admin/adminDashboard.html"
    }
    if(json.error){
        
        displayMessage("error", "Your username and/or password is wrong", ".message__container" )
    }
    
  } catch (error) {
    displayMessage("error", "There is something wrong with the login. Plies comeback later and try again.", ".message__container" )
  
  }
}