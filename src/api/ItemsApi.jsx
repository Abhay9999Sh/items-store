import axios from "axios";

const api = axios.create({
  baseURL: "https://item-store-backend.onrender.com/api",
});

//get list of all items
export const getAllItems = () => {
  return api.get("/items");
};

//get individual item
export const getItem = (id) => {
  return api.get(`/item/${id}`);
};

//add item post api
export const addItem = (post) => {
  return api.post("/items", post);
};

//enquiry email for item
export const enquiryItem = (post) => {
  return api.post("/enquire", post);
};
