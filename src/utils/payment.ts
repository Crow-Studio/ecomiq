import axios from "axios";
import { env } from "~/env/server";

export const payment = axios.create({
  baseURL: "https://api.paystack.co",
  headers: {
    Authorization: `Bearer ${env.PAYSTACK_SECRET_KEY}`,
    "Content-Type": "application/json",
  },
  timeout: 10000,
});

payment.interceptors.response.use(
  (response) => response.data,
  (error) => {
    console.error("Paystack API Error:", error.response?.data || error.message);
    return Promise.reject(error);
  },
);
