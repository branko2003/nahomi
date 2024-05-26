import { createContext, useContext, useState } from "react";  
import {
  createClienteRequest,
  deletClienteRequest,
  getClientesRequest,
  getClienteRequest,
  updateClienteRequest,
} from "../api/cliente";

const ClienteContext = createContext();

export const useClientes = () => {
  const context = useContext(ClienteContext);
  if (!context) throw new Error("useClientes must be used within a ClienteProvider");
  return context;
};

export function ClienteProvider({ children }) {
  const [clientes, setclientes] = useState([]);

  const getClientes = async () => { 
    try {
        const res = await getClientesRequest();
        setclientes(res.data);
    } catch (error) {
        console.error(error);
    }  
  };

  const deleteCliente = async (id) => {
    try {
      const res = await deletClienteRequest(id);
      if (res.status === 204) setclientes(clientes.filter((cliente) => cliente._id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  const createCliente = async (cliente) => {
    try {
      const res = await createClienteRequest(cliente);
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getCliente = async (id) => {
    try {
      const res = await getClienteRequest(id);
      return res.data;
    } catch (error) {
      console.error(error);
    }
  };

  const updateCliente = async (id, cliente) => {
    try {
      await updateClienteRequest(id, cliente);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <ClienteContext.Provider
      value={{
        clientes,
        getClientes,
        deleteCliente,
        createCliente,
        getCliente,
        updateCliente,
      }}
    >
      {children}
    </ClienteContext.Provider>
  );
}