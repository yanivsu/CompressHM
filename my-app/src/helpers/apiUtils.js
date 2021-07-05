import axios from "axios";

export async function getApi(api, obj = {}) {
  // Load async data.
  try {
    return await axios.get(api, obj);
  } catch (error) {
    // console.error(error);
    if (error.response) {
      // Request made and server responded
      console.log(error.response.data);
      console.log(error.response.status);
      console.log(error.response.headers);
    } else if (error.request) {
      // The request was made but no response was received
      console.log(error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.log("Error", error.message);
    }
  }
}

export async function putApi(api, obj) {
  // Load async data.
  try {
    return await axios.put(api, obj);
  } catch (error) {
    // console.error(error);
    if (error.response) {
      // Request made and server responded
      console.log(error.response.data);
      console.log(error.response.status);
      console.log(error.response.headers);
    } else if (error.request) {
      // The request was made but no response was received
      console.log(error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.log("Error", error.message);
    }
  }
}
export async function postApi(api) {
  // Load async data.
  try {
    return await axios.post(api, { timeout: 8000 });
  } catch (error) {
    // console.error(error);
    if (error.response) {
      // Request made and server responded
      console.log(error.response.data);
      console.log(error.response.status);
      console.log(error.response.headers);
    } else if (error.request) {
      alert(`Error with post send`);
    } else if (error.message === "timeout of 8000ms exceeded") {
      // Something happened in setting up the request that triggered an Error
      console.log("Error", error.message);
    }
  }
}
