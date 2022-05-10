import createHtml from "../components/common/createHTML.js";

const search = document.querySelector('#search');

export function searchForProduct(products){
  console.log(products)
  if(search){
    search.onkeyup = () => {
      const searchValue = event.target.value.trim().toLowerCase();
      console.log(searchValue)
      const filterProducts = products.data.filter((product) => {
        if(product.attributes.title.toLowerCase().includes(searchValue)){
          return true;
        }
      })
      console.log(filterProducts)
      createHtml(filterProducts)
    }
  }
}