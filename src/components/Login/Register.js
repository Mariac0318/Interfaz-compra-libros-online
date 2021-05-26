import React, {useRef, useState} from 'react';
import Form from 'react-validation/build/form';
import Input from 'react-validation/build/input';
import CheckButton from 'react-validation/build/button';
import AuthService from '../../services/auth.services';
import { isEmail} from 'validator';

const required = (value) =>{
    if(!value){
        return(
            <div className="alert alert-danger" role="alert">
                Este campo es requerido
            </div>
        )
    }
}

const validEmail = (value) =>{
    if(!isEmail(value)){
        return(
            <div className="alert alert-danger" role="alert">
                Esto no es un correo
            </div>
        );
    }
}

const isNombre_usuario = (value) =>{
    if(value.length < 3 || value.length > 20){
        return(
            <div className="alert alert-danger" role="alert">
                El nombre de usuario debe ser por lo menos 20 caracteres
            </div>
        )
    }
}

const isContraseña = (value) =>{
    if(value.length < 6 || value.length > 20){
        return(
            <div className="alert alert-danger" role="alert">
                La contraseña debe ser por lo menos de 6 caracteres y maximo 20
            </div>
        )
    }
}


const Register = (props) =>{
    const form = useRef();
    const checkBtn = useRef();

    const [nombre_usuario, setNombre_usuario] = useState("");
    const [cedula, setCedula] = useState(0);
    const [direccion_casa, setDireccion_casa] = useState("");
    const [correo, setCorreo] = useState("");
    const [fecha_nacimiento, setFecha_nacimiento] = useState("");
    const [noticias, setNoticias] = useState(false);
    const [libros_pendiente, setLibros_pendientes] = useState(0);
    const [contraseña, setContraseña] = useState("");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);

    const onChangeNombre_usuario = (e) =>{
        const nombre_usuario = e.target.value;
        setNombre_usuario(nombre_usuario);
    }
    const onChangeCedula = (e) =>{
        const cedula = e.target.value;
        setCedula(cedula);
    }
    const onChangeDireccion_casa = (e) =>{
        const direccion_casa = e.target.value;
        setDireccion_casa(direccion_casa);
    }
    const onChangeCorreo = (e) =>{
        const correo = e.target.value;
        setCorreo(correo);
    }
    const onChangeFecha_nacimiento = (e) =>{
        const fecha_nacimiento = e.target.value;
        setFecha_nacimiento(fecha_nacimiento);
    }
    const onChangeNoticias = (e) =>{
        const noticias = e.target.value;
        setNoticias(noticias);
    }

    const onChangeContraseña = (e) =>{
        const contraseña = e.target.value;
        setContraseña(contraseña);
    }

    const handleRegister = (e) =>{
        e.preventDefault();
        setMessage("");
        setLoading(false);

        form.current.validateAll();
        if(checkBtn.current.context_errors.length === 0){
            AuthService.register(
                nombre_usuario, 
                cedula,
                direccion_casa,
                fecha_nacimiento,
                noticias,
                libros_pendiente,
                contraseña)
            .then((response)=>{
                setMessage(response.data.message);
                setLoading(true);
            }, (error)=>{
                const resMessage = (
                    error.response && 
                    error.response.data &&
                    error.response.data.message) ||
                    error.message ||
                    error.toString();

                    setMessage(resMessage);
                    setLoading(false);
                                
                }     
            );
        } else{
            setLoading(false);
        }
    }

    return(
        <div className="col-md-12">
            <div className="card card-container">
                <img 
                src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
                alt="profile-image"
                className="profile-img-card"
                />

                <Form onSubmit={handleRegister} ref={form}>
                    {!loading && (
                        <div>
                            <div className="form-group">
                                <label htmlFor="nombre_usuario">Nombre usuario</label>
                                <Input 
                                type="text"
                                className="form-control"
                                name="nombre_usuario"
                                value={nombre_usuario}
                                onChange={onChangeNombre_usuario}
                                validations={[required, isNombre_usuario]}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="cedula">Cedula</label>
                                <Input 
                                type="number"
                                className="form-control"
                                name="cedula"
                                value={cedula}
                                onChange={onChangeCedula}
                                validations={[required]}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="direccion_casa">Direccion casa</label>
                                <Input 
                                type="text"
                                className="form-control"
                                name="direccion_casa"
                                value={direccion_casa}
                                onChange={onChangeDireccion_casa}
                                validations={[required]}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="correo">Correo</label>
                                <Input 
                                type="text"
                                className="form-control"
                                name="correo"
                                value={correo}
                                onChange={onChangeCorreo}
                                validations={[required, validEmail]}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="fecha_nacimiento">Fecha nacimiento</label>
                                <Input 
                                type="date"
                                className="form-control"
                                name="fecha_nacimiento"
                                value={fecha_nacimiento}
                                onChange={onChangeFecha_nacimiento}
                                validations={[required]}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="noticias">Noticias</label>
                                <Input 
                                type="text"
                                className="form-control"
                                name="noticias"
                                value={noticias}
                                onChange={onChangeNoticias}
                                validations={[required]}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="contraseña">Contraseña</label>
                                <Input 
                                type="text"
                                className="form-control"
                                name="contraseña"
                                value={contraseña}
                                onChange={onChangeContraseña}
                                validations={[required, isContraseña
                                ]}
                                />
                            </div>

                            <div className="form-group">
                                <button className="btn btn-primary btn-block">Registro</button>
                            </div>
                        </div>
                    )}

            {message && (
                <div className="form-group">
                    <div 
                        className={loading ? "alert alert-success" : "alert alert-danger"}
                        role="alert">                        
                        {message}        
                    </div>
                </div>
            )}
            <CheckButton style={{ display: "none" }} ref={checkBtn} />
                </Form>
            </div>
        </div>
    )
}

export default Register;