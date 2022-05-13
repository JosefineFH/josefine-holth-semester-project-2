import { buyProduct } from "../utils/addToCart.js"


export default function addToShoppingCart() {
  const button = event.target

      const buttonId = button.dataset.id
      const buttonCoverImage = button.dataset.img
      const buttonPrice = button.dataset.price
      const buttonTitle = button.dataset.title

      const data = {
        id: buttonId,
        image: buttonCoverImage,
        price: buttonPrice,
        title: buttonTitle,
      }

      buyProduct(data)
}