import React, { Component } from "react";

import UserService from "../../services/user.services";
// declaro caracteristicas para la particion
export default class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      content: ""
    };
  }
//Trae informacion de la api
  componentDidMount() {
    UserService.getPublicContent().then(
      response => {
        console.log(response.data.message);
        this.setState({
          content: response.data.message
        });
      },
//
      error => {
        this.setState({
          content:
            (error.response && error.response.data) ||
            error.message ||
            error.toString()
        });
      }
    );
  }
// particion interfaz
  render() {
    return (
      <div className="container">
        <header className="jumbotron">
          <h3>{this.state.content}</h3>
        </header>
      </div>
    );
  }
}