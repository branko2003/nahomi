import mongoose from "mongoose";

const reparacionSchema = new mongoose.Schema(
    {
      cliente: {
        type: mongoose.Types.ObjectId,
        ref: "Cliente",
        required: true
      },
      tecnico: {
        type: mongoose.Types.ObjectId,
        ref: "Tecnico",
        required: true
      },
      fecha_recepcion: {
        type: Date,
        default: Date.now,
      },
      fecha_devolucion: {
        type: Date,
        required: true
      },
      accesorios_dejados: [{
        type: String,
        required: true,
      }],
      description_problema: {
        type: String,
        required: true,
      },
      garantia: {
        type: Number,
        required: true,
      },
      costo: {
        type: Number,
        required: true,
      },
      fotos: [{
        type: String,
        required: true,
      }],
      aceptacion_cambios: {
        type: Boolean,
        required: true,
      },
      calificacion: {
        type: Number,
        required: false,
      },
    },
    {
      timestamps: true,
    }
  );
  
  export default mongoose.model("Reparacion", reparacionSchema);