import axios from 'axios';

const API_URL = 'https://compra-libros-online.herokuapp.com/api/auth/';

// Registro de usuarios

class AuthService {

    login(correo, contraseña) {
      return axios
        .post(API_URL + "signin", {
          correo,
          contraseña
        })
        .then(response => {
          if (response.data.accessToken) {
            localStorage.setItem("user", JSON.stringify(response.data));
          }
  
          return response.data;
        });
    }
  
    logout() {
      localStorage.removeItem("user");
    }
  
    register(nombre_usuario, cedula, direccion_casa, correo, fecha_nacimiento,noticias, libros_pendiente, contraseña) {
      return axios.post(API_URL + "signup", {
        nombre_usuario,
        cedula,
        direccion_casa,
        correo,
        fecha_nacimiento,
        noticias,
        libros_pendiente,
        contraseña
    });
    }
  
    getCurrentUser() {
      return JSON.parse(localStorage.getItem('user'));;
    }
  }
  
  export default new AuthService();