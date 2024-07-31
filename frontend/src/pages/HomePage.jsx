import { Link } from "react-router-dom";
import atencionHome from "../imagenes/atencionHome.png";

function HomePage() {
  return (
    <section className="min-h-screen flex justify-center items-center">
      <header className="bg-zinc-800 p-10 rounded-lg shadow-lg text-center max-w-md mx-auto">
        <h1 className="text-5xl py-2 font-bold text-white">Infobest</h1>
        <p className="text-md text-slate-400 mb-4">
          Bienvenido a la plataforma de atención al cliente
        </p>
        <div className="flex justify-center">
          <img src={atencionHome} alt="Atención al cliente" className="mt-2 w-40 h-auto" />
        </div>
        <Link
          className="bg-[#86B250] hover:bg-[#739A43] text-white font-bold px-6 py-3 rounded-md mt-4 inline-block transition duration-300"
          to="/login"
        >
          Iniciar
        </Link>
      </header>
    </section>
  );
}

export default HomePage;
