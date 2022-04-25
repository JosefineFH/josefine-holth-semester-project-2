import { baseUrl } from "../data/api.js";

const form = document.querySelector("form");
const email = document.querySelector("#email");
const password = document.querySelector("#password");
const messageContainer = document.querySelector(".message__container");

form.addEventListener("submit", login);

function login(event) {
  event.preventDefault();
  const emailValue = email.value.toLowerCase().trim();
  const passwordValue = password.value.trim();

  loginUser(emailValue, passwordValue)
}

async function loginUser(email, password) {
  const loginUrl = baseUrl + "auth/local"
 
  const data = JSON.stringify({ identifier: email, password: password });

  console.log(data)

  const option = {
    method: "POST",
    body: data,
    headers: {
      "Content-Type": "application/json",
    },
  };
  console.log(data)

  try {
    const response = await fetch(loginUrl, option)
    const json = await response.json()
    console.log(json)
    
  } catch (error) {
    console.log(error)
  }
}