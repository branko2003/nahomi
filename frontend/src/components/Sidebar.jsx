import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { ButtonLink } from "./ui/ButtonLink";
import logoImage from "../imagenes/logoInfobest.png"; 

export function Sidebar() {
  const { isAuthenticated, logout, user } = useAuth();
  const [open, setOpen] = useState(true);

  return (
    <div className="flex">
      <div className={` ${open ? "w-72" : "w-20 "} bg-zinc-700 h-screen p-5 pt-8 relative duration-300`}>
        <img
          src="./src/assets/control.png"
          className={`absolute cursor-pointer -right-3 top-9 w-7 border-dark-purple border-2 rounded-full ${!open && "rotate-180"}`}
          onClick={() => setOpen(!open)}
        />
        <div className="flex gap-x-4 items-center">
          <Link to={isAuthenticated ? "/tasks" : "/home"}>
            <img src={logoImage} alt="Logo Infobest" className={`cursor-pointer duration-500 ${open && "rotate-[360deg]"}`} />
          </Link>
        </div>
        <ul className="pt-6">
          {isAuthenticated ? (
            <>
              {user.rol === 'Cliente' && (
                <>
                  <li className="flex rounded-md p-2 cursor-pointer hover:bg-light-white text-gray-300 text-sm items-center gap-x-4 mt-2">
                    <ButtonLink to="/add-task" className={`${!open && "hidden"} origin-left duration-200`}>Añadir Reserva</ButtonLink>
                  </li>
                  <li className="flex rounded-md p-2 cursor-pointer hover:bg-light-white text-gray-300 text-sm items-center gap-x-4 mt-2">
                    <ButtonLink to="/reparaciones" className={`${!open && "hidden"} origin-left duration-200`}>Ver Reparación</ButtonLink>
                  </li>
                </>
              )}
              {user.rol === 'Administrador' && (
                <>
                  <li className="flex rounded-md p-2 cursor-pointer hover:bg-light-white text-gray-300 text-sm items-center gap-x-4 mt-2">
                    <ButtonLink to="/add-cliente" className={`${!open && "hidden"} origin-left duration-200`}>Añadir Cliente</ButtonLink>
                  </li>
                  <li className="flex rounded-md p-2 cursor-pointer hover:bg-light-white text-gray-300 text-sm items-center gap-x-4 mt-2">
                    <ButtonLink to="/add-tecnico" className={`${!open && "hidden"} origin-left duration-200`}>Añadir Técnicos</ButtonLink>
                  </li>
                  <li className="flex rounded-md p-2 cursor-pointer hover:bg-light-white text-gray-300 text-sm items-center gap-x-4 mt-2">
                    <ButtonLink to="/add-garantia" className={`${!open && "hidden"} origin-left duration-200`}>Añadir Garantía</ButtonLink>
                  </li>
                  <li className="flex rounded-md p-2 cursor-pointer hover:bg-light-white text-gray-300 text-sm items-center gap-x-4 mt-2">
                    <ButtonLink to="/add-reparacion" className={`${!open && "hidden"} origin-left duration-200`}>Añadir Reparaciones</ButtonLink>
                  </li>
                  <li className="flex rounded-md p-2 cursor-pointer hover:bg-light-white text-gray-300 text-sm items-center gap-x-4 mt-2">
                    <ButtonLink to="/tecnicos" className={`${!open && "hidden"} origin-left duration-200`}>Ver Técnicos</ButtonLink>
                  </li>
                  <li className="flex rounded-md p-2 cursor-pointer hover:bg-light-white text-gray-300 text-sm items-center gap-x-4 mt-2">
                    <ButtonLink to="/garantias" className={`${!open && "hidden"} origin-left duration-200`}>Ver Garantía</ButtonLink>
                  </li>
                  <li className="flex rounded-md p-2 cursor-pointer hover:bg-light-white text-gray-300 text-sm items-center gap-x-4 mt-2">
                    <ButtonLink to="/reparaciones" className={`${!open && "hidden"} origin-left duration-200`}>Ver Reparaciones</ButtonLink>
                  </li>
                </>
              )}
              <li className="flex rounded-md p-2 cursor-pointer hover:bg-light-white text-gray-300 text-sm items-center gap-x-4 mt-2">
                <Link to="/home" className={`${!open && "hidden"} origin-left duration-200 text-[#dcae19]`} onClick={() => logout()}>
                  Cerrar Sesión
                </Link>
              </li>
            </>
          ) : (
            <>
              <li className="flex rounded-md p-2 cursor-pointer hover:bg-light-white text-gray-300 text-sm items-center gap-x-4 mt-2">
                <ButtonLink to="/login" className={`${!open && "hidden"} origin-left duration-200`}>Login</ButtonLink>
              </li>
              <li className="flex rounded-md p-2 cursor-pointer hover:bg-light-white text-gray-300 text-sm items-center gap-x-4 mt-2">
                <ButtonLink to="/register" className={`${!open && "hidden"} origin-left duration-200`}>Registrar</ButtonLink>
              </li>
            </>
          )}
        </ul>
      </div>
      <div className="h-screen flex-1 p-7">
        <h1 className="text-2xl font-semibold">Home Page</h1>
      </div>
    </div>
  );
}