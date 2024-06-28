// import { useState, useEffect, useRef } from "react";
// import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";

// export const axiosInstance = axios.create({
//     baseURL: "http://localhost:8000/",
//     timeout: 60000,
//     withCredentials: true,
// });


// export const useAxios = <D = any>(axiosParams: AxiosRequestConfig<D>) => {
//   const [response, setResponse] = useState<AxiosResponse | null | any>(null);
//   const [error, setError] = useState<AxiosError | any | unknown>(null);
//   const [loading, setLoading] = useState(true);
//   const [trigger, setTrigger] = useState(0);
//   const controllerRef = useRef(new AbortController());

//   const refetch = () => {
//     setResponse([...response]);
//     setError(error);
//     setLoading(true);
//     setTrigger(Date.now());
//   };

//   const axiosData = async (params: AxiosRequestConfig<D>) => {
//     try {
//       const result = await axiosInstance.request({
//         ...params,
//         signal: controllerRef.current.signal,
//       });
//       setResponse(result.data.data);
//     } catch (error: AxiosError | any | unknown) {
//       setError(error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     axiosData(axiosParams);
//   }, [trigger]);

//   return {
//     response,
//     error,
//     loading,
//     setResponse,
//     refetch,
//   };
// };