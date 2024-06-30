import axios from "axios";

const isDev = process.env.NODE_ENV === 'development';

axios.defaults.withCredentials = true


axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem('userData');
    }
    return Promise.reject(error);
  }
);

export const Axios  = axios ;

export const EF_DOMAIN = isDev
  ? 'http://localhost:8000'
  : 'https://backend-deno-sjdz3b63yq-du.a.run.app';


export const getSessionId = () => {
    const session = localStorage.getItem('session_id');
    if (!session) return null;
    const parse = JSON.parse(session);
    return parse.session_id || null;
};