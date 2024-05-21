import mongoose from "mongoose";

const clienteSchema = new mongoose.Schema(
    {
      nombre: {
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
    }
},{
      timestamps: true,
    }
  );
  
  export default mongoose.model("Cliente", clienteSchema);