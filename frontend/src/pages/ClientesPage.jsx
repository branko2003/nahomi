import { useEffect } from "react";
import { useClientes } from "../context/ClienteContext";
import { ClienteCard } from "../components/clientes/ClienteCard";
import { ImFileEmpty } from "react-icons/im";
import bienvenidoImage from "../imagenes/bienvenido.png"; // Importar la imagen

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
            <img src={bienvenidoImage} alt="Bienvenido" className="mx-auto my-2" style={{ width: "64px" }} /> {/* Ajustar el tamaño aquí */}
            <h1 className="font-bold text-xl">
              Aún no hay clientes, agregue un cliente
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

//export default ClientesPage;
