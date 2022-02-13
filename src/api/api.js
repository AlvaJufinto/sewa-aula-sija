import axios from "axios";
import { baseUrl } from "./interceptor";

export const clientDataApi = {
  allPackets: () => {
    return axios.get(`${baseUrl}/client/getalldata?q=paket`);
  },
  packet: ({ params }) => {
    return axios.get(`${baseUrl}/client/getpaket/${params}`);
  },
  addOrder: ({ params }, detail) => {
    return axios.post(`${baseUrl}/client/order/${params}`, detail);
  }
};

export const authApi = {
  login: (body) => {
    return axios.post(`${baseUrl}/auth/login`, body);
  },
  logout: (body) => {
    return axios.delete(`${baseUrl}/auth/logout`, body);
  },
  loggedIn: (body) => {
    return axios.post(`${baseUrl}/auth/loggedIn`, body);
  },
};

;