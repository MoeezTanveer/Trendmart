import axios from "axios";
// const productsURL = process.env.REACT_APP_PRODUCTS_URL;
const productsURL = "http://localhost:8001";
export const getSingleProduct = async (pId) => {
  try {
    let res = await axios.post(`${productsURL}/api/product/single-product`, {
      pId: pId,
    });
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const postAddReview = async (formData) => {
  try {
    let res = await axios.post(`${productsURL}/api/product/add-review`, formData);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const postDeleteReview = async (formData) => {
  try {
    let res = await axios.post(`${productsURL}/api/product/delete-review`, formData);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
