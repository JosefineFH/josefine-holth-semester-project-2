import createHtml from "../components/common/createHTML.js";

const search = document.querySelector('#search');

export function searchForProduct(products){
  if(search){
    search.onkeyup = () => {
      const searchValue = event.target.value.trim().toLowerCase();
      const filterProducts = products.filter((product) => {
        if(product.attributes.title.toLowerCase().includes(searchValue)){
          return true;
        }
      })
      createHtml(filterProducts)
    }
  }
}