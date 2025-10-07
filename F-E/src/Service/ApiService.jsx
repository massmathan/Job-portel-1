import axios from "axios";
import { useAuthHelpers } from "../AuthContext/useAuthHelpers";

const API_BASE_URL = "http://localhost:8080/api";


const Header = {
  'Content-Type': 'application/json'
};

const ApiService = {
  

  async get(endpoint, customHeaders = Header) {
    try {
      
      const response = await axios.get(`${API_BASE_URL}${endpoint}`, {
        headers: customHeaders
      });
      return response;
    } catch (error) {
      console.error(`GET ${endpoint} failed:`, error);
      throw error;
    }
  },

  async post(endpoint, data = {}, customHeaders = Header) {
    try {
      console.log(endpoint);
      console.log(data);

     const response = await axios.post(`${API_BASE_URL}${endpoint}`, data, {
        headers: customHeaders,
      });


      console.log(response);
      return response;
    } catch (error) {
      console.error(`POST ${endpoint} failed:`, error);
      throw error;
    }
  },

  async put(endpoint, data = {}, customHeaders = Header) {
    try {
      const response = await axios.put(`${API_BASE_URL}${endpoint}`, data, {
        headers: customHeaders,
      });
      return response;
    } catch (error) {
      console.error(`PUT ${endpoint} failed:`, error);
      throw error;
    }
  },

  async delete(endpoint, customHeaders = Header) {
    try {
      const response = await axios.delete(`${API_BASE_URL}${endpoint}`, {
        headers: customHeaders,
      });
      return response;
    } catch (error) {
      console.error(`DELETE ${endpoint} failed:`, error);
      throw error;
    }
  },
};



export default ApiService;
