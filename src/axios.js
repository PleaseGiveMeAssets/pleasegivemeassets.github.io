import axios from "axios";
import { useLoadingStore } from "./stores/loadingStore";

const axiosInstance = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}`,
  timeout: 10000,
});

// 요청 인터셉터
axiosInstance.interceptors.request.use(
  (config) => {
    const loadingStore = useLoadingStore();
    loadingStore.startLoading(); // 요청 시 로딩 시작

    console.log("Response received:", config);
    return config;
  },
  (error) => {
    const loadingStore = useLoadingStore();
    loadingStore.stopLoading(); // 에러 발생 시 로딩 중단

    console.error("Error occurred:", error);
    return Promise.reject(error);
  },
);

// 응답 인터셉터
axiosInstance.interceptors.response.use(
  (response) => {
    const loadingStore = useLoadingStore();
    loadingStore.stopLoading(); // 응답 성공 시 로딩 중단

    console.log("Response received:", response);
    return response;
  },
  (error) => {
    const loadingStore = useLoadingStore();
    loadingStore.stopLoading(); // 에러 발생 시 로딩 중단

    console.error("Error occurred:", error);
    return Promise.reject(error);
  },
);

export default axiosInstance;
