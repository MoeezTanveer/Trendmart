import axios from "axios";
// const productsURL = process.env.REACT_APP_PRODUCTS_URL;
const productsURL = "http://localhost:8001";
export const wishListProducts = async () => {
  let productArray = JSON.parse(localStorage.getItem("wishList"));
  try {
    let res = await axios.post(`${productsURL}/api/product/wish-product`, {
      productArray,
    });
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
