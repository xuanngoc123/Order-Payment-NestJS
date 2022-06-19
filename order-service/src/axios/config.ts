import axios from 'axios';

const axiosPayment = axios.create({
  baseURL: process.env.PAYMENT_SERVICE,
  headers: {
    'content-type': 'application/json',
  },
});

axiosPayment.interceptors.request.use(async (config) => {
  // Handle token here...
  return config;
});

axiosPayment.interceptors.response.use(
  (response) => {
    if (response && response.data) {
      return response;
    }
    return response;
  },
  (error) => {
    return error;
  },
);

export default axiosPayment;
