import axios from 'axios';
import authHeader from './auth-header';

const API_URL ="https://compra-libros-online.herokuapp.com/api/";

class UserService {
    getPublicContent = () =>{
        return axios.get(API_URL +"all");
    }

    getClienteContent = () =>{
        return axios.get(API_URL+ "cliente", {headers:authHeader()});
    }

    getAdminContent = () =>{
        return axios.get(API_URL+"admin", {headers:authHeader()});
    }
  }

  export default new UserService();
