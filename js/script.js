import createMenu from "./components/common/createMenu.js";
import createHtml from "./components/common/createHTML.js";
import getData from "./data/apiCall.js";

const productData = getData();
createMenu();
createHtml(productData);