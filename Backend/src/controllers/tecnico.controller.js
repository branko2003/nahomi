import Tecnico from "../models/tecnico.model.js";

export const getTecnicos = async (req, res) => {
    try {
      const tecnicos = await Tecnico.find();
      res.json(tecnicos);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  };
  
  export const createTecnico = async (req, res) => {
    try {
      const { nombre,
        apellido,
        email,
        password,
        especialidad } = req.body;
        console.log(req.body);

      const newTecnico = new Tecnico({
        nombre,
        apellido,
        email,
        password,
        especialidad,
      });
      await newTecnico.save();
      res.json(newTecnico);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  };

  export const getTecnico = async (req, res) => {
    try {
      const tecnico = await Tecnico.findById(req.params.id);
      if (!tecnico) return res.status(404).json({ message: "tecnico no encontrado" });
      return res.json(tecnico);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  };
  
  export const deleteTecnico = async (req, res) => {
    try {
      const deletedTecnico = await Tecnico.findByIdAndDelete(req.params.id);
      if (!deletedTecnico)
        return res.status(404).json({ message: "tecnico no encontrado" });
  
      return res.sendStatus(204);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  };
  
  export const updateTecnico = async (req, res) => {
    try {
      const { nombre,
        apellido,
        email,
        password,
        especialidad } = req.body;
      const tecnicoUpdated = await Tecnico.findOneAndUpdate(
        { _id: req.params.id },
        { nombre,
            apellido,
            email,
            password,
            especialidad },
        { new: true }
      );
      return res.json(tecnicoUpdated);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  };
  
