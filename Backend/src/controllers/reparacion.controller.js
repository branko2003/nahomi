import Reparacion from "../models/reparacion.model.js";
import multer from 'multer';


const storage = multer.diskStorage({
  filename: (req, file, cb) => {
      cb(null, file.originalname);
  },
  destination: (req, file, cb) => {
      cb(null, './public');
  },
  
  });

  export const upload = multer({ storage: storage }).array('fotos', 10);  // Acepta hasta 10 archivos

  export const getReparaciones = async (req, res) => {
    try {
      const reparaciones = await Reparacion.find({ user : req.user.id }).populate("user");
      res.json(reparaciones);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  };
  
  export const createReparacion = async (req, res) => {
    try {
      let fileNames; 
      if (req.files) {
        fileNames = req.files.map(file => file.originalname);  // Extrae los nombres de los archivos
        console.log(fileNames);  // Muestra los nombres de archivos en la consola
      }
      else{
        fileNames = [];
      }
      const {cliente,tecnico, fecha_devolucion,fecha_recepcion,accesorios_dejados,description_problema,garantia,costo,aceptacion_cambios} = req.body;
      //console.log(JSON.parse(fileNames));  // Muestra los nombres de archivos en la consola
      const newReparacion = new Reparacion({
        cliente,
        tecnico,
        fecha_recepcion,
        fecha_devolucion,
        accesorios_dejados: JSON.parse(accesorios_dejados), // Asegurándose de parsear el array
        description_problema,
        garantia,
        costo,
        fotos: fileNames,
        aceptacion_cambios,
      });
      await newReparacion.save();
      res.json(newReparacion);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: error.message });
    }
  };

  export const getReparacion = async (req, res) => {
    try {
      const reparacion = await Reparacion.findById(req.params.id);
      if (!reparacion) return res.status(404).json({ message: "Reparacion no encontrada" });
      return res.json(reparacion);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  };
  
  export const deleteReparacion = async (req, res) => {
    try {
      const deletedReparacion = await Reparacion.findByIdAndDelete(req.params.id);
      if (!deletedReparacion)
        return res.status(404).json({ message: "Reparacion no encontrada" });
  
      return res.sendStatus(204);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  };
  
  export const updateReparacion = async (req, res) => {
    try {
        const {cliente,tecnico, fecha_devolucion,fecha_recepcion,accesorios_dejados,description_problema,garantia,costo,fotos,aceptacion_cambios} = req.body;
        const reparacionUpdated = await Reparacion.findOneAndUpdate(
        { _id: req.params.id },
        { cliente,tecnico, fecha_devolucion,fecha_recepcion,accesorios_dejados,description_problema,garantia,costo,fotos,aceptacion_cambios },
        { new: true }
      );
      return res.json(reparacionUpdated);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  };
  
