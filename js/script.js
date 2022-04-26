
import { baseUrl } from "./data/api.js";
import createProductList from "./admin/adminDashboard.js";
import getData from "./data/apiCall.js";
import createMenu from "./components/common/createMenu.js";

createMenu();

getData();
