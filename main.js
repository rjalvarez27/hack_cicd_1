const jwt = require("jsonwebtoken"); // verificar token
const userModel = require("../models/user"); // base de datos

const verifyRole = async (req, res, next) => { 
    try{
        // id: Administrador
        const { id } = req.params;
        const user = await userModel.findById(id);
        console.log(user)
        if(!user){
            return res.status(404).json({ message: "User no found" });
        }
        if(user.rol == "admin"){
            next()
        }else{
            return res.status(403).json({message: "Usuario no autorizado"});
        }

    } catch(error){
        return res.status(401).json({ message: "Usuario no autorizado" });
    }
}

module.exports = { verifyRole }
