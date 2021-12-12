import axios from "axios";

export const Axios = axios.create({
  baseURL:
    process.env.REACT_APP_AXIOS === "development"
      ? "http://localhost:3001/api"
      : "/api",
  timeout: 50000,
});

export const axiosErrorMessage = (e) => {
  if (e.response) {
    let errorMessage = e.response.data.message;

    return errorMessage;
  }
};
