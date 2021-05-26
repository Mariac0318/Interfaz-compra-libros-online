exports.allAccess = (req,res) =>{
    res.status(200).send({message:'Contenido para todos'});
}

exports.Admin = (req,res) =>{
    res.status(200).send({message:'Contenido para admin'});
}

exports.Clientes = (req,res) =>{
    res.status(200).send({message:'Contenido para clientes'});  
}