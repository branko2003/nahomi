import { useEffect } from "react";
import { useTecnicos } from "../context/TecnicoContext";
import { TecnicoCard } from "../components/tecnicos/TecnicoCard";
import { ImFileEmpty } from "react-icons/im";

export function TecnicoPage() {
  const { tecnicos, getTecnicos } = useTecnicos();

  useEffect(() => {
    getTecnicos();
  }, []);

  return (
    <>
      {tecnicos.length === 0 && (
        <div className="flex justify-center items-center p-10">
          <div>
            <ImFileEmpty className="text-6xl text-gray-400 m-auto my-2" />
            <h1 className="font-bold text-xl">
              Aún no hay tecnicos, agregue un nuevo tecnico
            </h1>
          </div>
        </div>
      )}

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-2">
        {tecnicos.map((tecnico) => (
          <TecnicoCard tecnico={tecnico} key={tecnico._id} />
        ))}
      </div>
    </>
  );
}