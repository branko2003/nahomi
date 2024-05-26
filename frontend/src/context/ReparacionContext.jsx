import { createContext, useContext, useState } from "react";  
import {
  createReparacionRequest,
  deletReparacionRequest,
  getReparacionesRequest,
  getReparacionRequest,
  updateReparacionRequest,
} from "../api/reparacion";

const ReparacionContext = createContext();

export const useReparaciones = () => {
  const context = useContext(ReparacionContext);
  if (!context) throw new Error("useReparaciones must be used within a ReparacionProvider");
  return context;
};

export function ReparacionProvider({ children }) {
  const [reparaciones, setReparaciones] = useState([]);

  const getReparaciones = async () => { 
    try {
        const res = await getReparacionesRequest();
        setReparaciones(res.data);
    } catch (error) {
        console.error(error);
    }  
  };

  const deleteReparacion = async (id) => {
    try {
      const res = await deleteReparacionRequest(id);
      if (res.status === 204) setReparaciones(reparaciones.filter((reparacion) => reparacion._id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  const createReparacion = async (reparacion) => {
    try {
      console.log(reparacion);
      const res = await createReparacionRequest(reparacion);
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getReparacion = async (id) => {
    try {
      const res = await getReparacionRequest(id);
      return res.data;
    } catch (error) {
      console.error(error);
    }
  };

  const updateReparacion = async (id, reparacion) => {
    try {
      await updateReparacionRequest(id, reparacion);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <ReparacionContext.Provider
      value={{
        reparaciones,
        getReparaciones,
        deleteReparacion,
        createReparacion,
        getReparacion,
        updateReparacion,
      }}
    >
      {children}
    </ReparacionContext.Provider>
  );
}