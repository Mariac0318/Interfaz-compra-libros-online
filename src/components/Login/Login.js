import React, {Component} from 'react';
import Form from 'react-validation/build/form';
import Input from 'react-validation/build/input';
import CheckButton from 'react-validation/build/button';
import AuthService from '../../services/auth.services';

const required = (value) =>{
    if(!value){
        return(
            <div className="alert alert-danger" role="alert">
                Este campo es requerido
            </div>
        )
    }
}

export default class Login extends Component {
    constructor(props) {
        super(props);
        this.handleLogin = this.handleLogin.bind(this);
        this.onChangeCorreo = this.onChangeCorreo.bind(this);
        this.onChangeContraseña = this.onChangeContraseña.bind(this);
    
        this.state = {
          correo: "",
          contraseña: "",
          loading: false,
          message: ""
        };
      }


    onChangeCorreo = (e) =>{
        this.setState({
            correo: e.target.value
          });
    }

    onChangeContraseña = (e) =>{
        this.setState({
            contraseña: e.target.value
          });
    }

    handleLogin(e) {
        e.preventDefault();
    
        this.setState({
          message: "",
          loading: true
        });
//Validamos que no este vacia la informacion - si no esta vacio se autentica el usuario    
        this.form.validateAll();
    
        if (this.checkBtn.context._errors.length === 0) {
          AuthService.login(this.state.correo, this.state.contraseña).then(
            () => {
              this.props.history.push("/profile");
              window.location.reload();
            },
            error => {
              const resMessage =
                (error.response &&
                  error.response.data &&
                  error.response.data.message) ||
                error.message ||
                error.toString();
    
              this.setState({
                loading: false,
                message: resMessage
              });
            }
          );
        } else {
          this.setState({
            loading: false
          });
        }
    }
    render(){
        return(
            <div className="col-md-12">
            <div className="card card-container">
              <img
                src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
                alt="profile-img"
                className="profile-img-card"
              />
    
              <Form
                onSubmit={this.handleLogin}
                ref={c => {
                  this.form = c;
                }}
              >
                <div className="form-group">
                  <label htmlFor="correo">Correo</label>
                  <Input
                    type="text"
                    className="form-control"
                    name="correo"
                    value={this.state.correo}
                    onChange={this.onChangeCorreo}
                    validations={[required]}
                  />
                </div>
    
                <div className="form-group">
                  <label htmlFor="contraseña">Contraseña</label>
                  <Input
                    type="password"
                    className="form-control"
                    name="contraseña"
                    value={this.state.contraseña}
                    onChange={this.onChangeContraseña}
                    validations={[required]}
                  />
                </div>
    
                <div className="form-group">
                  <button
                    className="btn btn-primary btn-block"
                    disabled={this.state.loading}
                  >
                    {this.state.loading && (
                      <span className="spinner-border spinner-border-sm"></span>
                    )}
                    <span>Login</span>
                  </button>
                </div>
{/* Muestra error que se puedan presentar dentro de la api*/}
                {this.state.message && (
                  <div className="form-group">
                    <div className="alert alert-danger" role="alert">
                      {this.state.message}
                    </div>
                  </div>
                )}
                <CheckButton
                  style={{ display: "none" }}
                  ref={c => {
                    this.checkBtn = c;
                  }}
                />
              </Form>
            </div>
          </div>
        )
    }

} 
