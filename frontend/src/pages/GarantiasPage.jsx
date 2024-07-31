import { useEffect } from "react";
import { useGarantias } from "../context/GarantiaContext";
import { GarantiaCard } from "../components/garantia/GarantiaCard";
import { ImFileEmpty } from "react-icons/im";

export function GarantiasPage() {
  const { garantias, getGarantias } = useGarantias();

  useEffect(() => {
    getGarantias();
  }, []);

  return (
    <>
      {garantias.length === 0 && (
        <div className="flex justify-center items-center p-10">
          <div>
            <ImFileEmpty className="text-6xl text-gray-400 m-auto my-2" />
            <h1 className="font-bold text-xl">
              Aún no hay equipos con garantia, agregue un nuevo equipo con garantia
            </h1>
          </div>
        </div>
      )}

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-2">
        {garantias.map((garantia) => (
          <GarantiaCard garantia={garantia} key={garantia._id} />
        ))}
      </div>
    </>
  );
}