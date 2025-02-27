import axios from "axios";
// const ordersURL = process.env.REACT_APP_ORDERS_URL;
const ordersURL = "http://localhost:8002";
export const getAllOrder = async () => {
  try {
    let res = await axios.get(`${ordersURL}/api/order/get-all-orders`);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const editCategory = async (oId, status) => {
  let data = { oId: oId, status: status };
  console.log(data);
  try {
    let res = await axios.post(`${ordersURL}/api/order/update-order`, data);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const deleteOrder = async (oId) => {
  let data = { oId: oId };
  try {
    let res = await axios.post(`${ordersURL}/api/order/delete-order`, data);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
