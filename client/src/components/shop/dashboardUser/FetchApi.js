import axios from "axios";
// const registrationURL = process.env.REACT_APP_REGISTRATION_URL;
const registrationURL = "http://localhost:8002";
export const getUserById = async (uId) => {
  try {
    let res = await axios.post(`http://localhost:8000/api/user/signle-user`, { uId });
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const updatePersonalInformationFetch = async (userData) => {
  try {
    let res = await axios.post(`http://localhost:8000/api/user/edit-user`, userData);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const getOrderByUser = async (uId) => {
  try {
    let res = await axios.post(`${registrationURL}/api/order/order-by-user`, { uId });
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const updatePassword = async (formData) => {
  try {
    let res = await axios.post(`http://localhost:8000/api/user/change-password`, formData);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
