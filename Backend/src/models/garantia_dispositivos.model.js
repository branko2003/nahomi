import mongoose from "mongoose";

const garantia_dispositivoSchema = new mongoose.Schema(
    {
      Nro_factura: {
        type: Number,
        required: true,
        unique:true,
      },
      equipo_comprado: {
        type: String,
        require: true,
      },
      nombre_cliente: {
        type: String,
        require: true,
      },
      apellido_cliente: {
        type: String,
        require: true,
      },
      nit_cliente: {
        type: Number,
        require: true,
    },
    garantia: {
        type: String,
        require: true,
    },
    tiempo_garantia: {
        type: String,
        require: false,
    },
    fecha_inicio_garantia: {
        type: Date,
        default: Date.now,
    },
},{
      timestamps: true,
    }
  );
  
  export default mongoose.model("Garantia_dispositivo", garantia_dispositivoSchema);