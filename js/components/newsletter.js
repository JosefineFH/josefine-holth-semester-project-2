const form = document.querySelector("form")
const nameInput = document.querySelector("#name")
const emailInput  =document.querySelector("#email")

form.addEventListener("submit", submitForm)

function submitForm(event){
  event.preventDefault();

  const name = nameInput.value.trim()
  const email = emailInput.value.trim()

  const doDelete = alert(`You are now subscribing to the news letter, ${name}.`);
  


}