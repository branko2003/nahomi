import { useEffect } from "react";
import { useClientes } from "../context/ClienteContext";
import { ClienteCard } from "../components/clientes/ClienteCard";
import { ImFileEmpty } from "react-icons/im";

export function ClientesPage() {
  const { clientes, getClientes } = useClientes();

  useEffect(() => {
    getClientes();
  }, []);

  return (
    <>
      {clientes.length === 0 && (
        <div className="flex justify-center items-center p-10">
          <div>
            <ImFileEmpty className="text-6xl text-gray-400 m-auto my-2" />
            <h1 className="font-bold text-xl">
              Aún no hay clientes, agregue un nuevo cliente
            </h1>
          </div>
        </div>
      )}

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-2">
        {clientes.map((cliente) => (
          <ClienteCard cliente={cliente} key={cliente._id} />
        ))}
      </div>
    </>
  );
}