import mongoose from "mongoose";

const tecnicoSchema = new mongoose.Schema(
    {
      nombre: {
        type: String,
        required: true,
      },
      apellido: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        require: true,
        trim: true,
        unique:true,
      },
      password: {
        type: String,
        require: true,
    },
    especialidad: { 
        type: String,
        require: true,
    }
},{
      timestamps: true,
    }
  );
  
  export default mongoose.model("Tecnico", tecnicoSchema);