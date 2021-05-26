
import React , {useEffect, useState} from 'react';
import UserService from '../../services/user.services';

const BoardCliente = () =>{
    const [content, setContent] = useState("");
    
    useEffect(() =>{
        UserService.getClienteContent()
        .then((response) =>{
            setContent(response.data.message);
        },
        (error) =>{
            const _content = (
                error.response && 
                error.response.data &&
                error.response.data.message) ||
                error.message || 
                error.toString();
    
                setContent(_content);
        });
    },[]);

    return(
        <div className="container">
            <header className="jumbotron">
                <h3>{content}</h3>
            </header>
        </div>
    );
}

export default BoardCliente;