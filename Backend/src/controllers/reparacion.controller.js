import Reparacion from "../models/reparacion.model.js";

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
      const {cliente,tecnico, fecha_devolucion,fecha_recepcion,accesorios_dejados,description_problema,garantia,costo,fotos,aceptacion_cambios} = req.body;
      const newReparacion = new Reparacion({
        cliente,
        tecnico,
        fecha_recepcion,
        fecha_devolucion,
        accesorios_dejados,
        description_problema,
        garantia,
        costo,
        fotos,
        aceptacion_cambios,
      });
      await newReparacion.save();
      res.json(newReparacion);
    } catch (error) {
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
  
