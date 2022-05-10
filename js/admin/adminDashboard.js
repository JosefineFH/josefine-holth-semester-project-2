import { removeProduct } from "./deleteProduct.js";

export default function createProductList(products){

  const container = document.querySelector(".product__list")
  let productList = products.data;
  if(productList === undefined){
    productList = products
  } 
  if(container){
  container.innerHTML = ""
  
  productList.forEach(product => {
    let title = product.attributes.title
    let id = product.id
      container.innerHTML += `
      <li>
        <h2>${title}</h2>
        <a class="buttons" href="/admin/editProduct.html?id=${id}">Edit</a>
        <button class="delete__button" data-id="${id}">Delete</button>
      </li>
      `
    });
  }
  const removeButton = document.querySelectorAll(".delete__button");

  
  removeButton.forEach(button => {
    let postId = button.dataset.id;
    button.addEventListener("click", () => {
      removeProduct(postId)
    })
    
  });
}