import axios from "axios";

const API_BASE_URL = "http://localhost:8080/api";
    const Header = {
        'Content-Type': 'application/json'
    }

const ApiService = {

    

  async get(endpoint, params, Header) {
    try {
        console.log(endpoint);
        console.log(params);
        console.log(Header);
        const response  = {};
        if(params){
            response = await axios.get(`${API_BASE_URL}${endpoint}${ params }`, Header);
        }else{
            response = await axios.get(`${API_BASE_URL}${endpoint}`, Header);
        }
      console.log(response);
      return response.data;
    } catch (error) {
      console.error(`GET ${endpoint} failed:`, error);
      throw error;
    }
  },

  async post(endpoint, data = {}) {
    try {
      const response = await axios.post(`${API_BASE_URL}/${endpoint}`, data);
      return response.data;
    } catch (error) {
      console.error(`POST ${endpoint} failed:`, error);
      throw error;
    }
  },

  async put(endpoint, data = {}) {
    try {
      const response = await axios.put(`${API_BASE_URL}/${endpoint}`, data);
      return response.data;
    } catch (error) {
      console.error(`PUT ${endpoint} failed:`, error);
      throw error;
    }
  },

  async delete(endpoint) {
    try {
      const response = await axios.delete(`${API_BASE_URL}/${endpoint}`);
      return response.data;
    } catch (error) {
      console.error(`DELETE ${endpoint} failed:`, error);
      throw error;
    }
  },
};

export default ApiService;
