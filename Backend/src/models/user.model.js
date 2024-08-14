// crea estructura fija esto no da consultas definimos objetos de lo que queremos validar 

import mongoose from "mongoose";
import Reparacion from "./reparacion.model.js"; // Ajusta la ruta según la ubicación de tu archivo reparacionModel


const userSchema = new mongoose.Schema({
    username: {
        type: String,
        require: true,
        trim: true,
    },
    email: {
        type: String,
        require: true,
        trim: true,
        unique:true,
    },
    telefono:{
        type: Number,
        require: true,
    },
    password: {
        type: String,
        require: true,
    },
    rol: {
        type: String,
        require: true,
    },
},{
    timestamps: true
})


// Middleware de eliminación en cascada
userSchema.pre('findOneAndDelete', async function(next) {
    try {
        const user = await this.model.findOne(this.getFilter());
        await Reparacion.deleteMany({ 
            $or: [
                { cliente: user._id }, 
                { tecnico: user._id }
            ] 
        });
        next();
    } catch (error) {
        next(error);
    }
});

export default mongoose.model('User', userSchema)