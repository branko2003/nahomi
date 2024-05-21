import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { ButtonLink } from "./ui/ButtonLink";

export function Navbar() {
  const { isAuthenticated, logout, user } = useAuth();
  console.log(isAuthenticated, user)

  return (
    <nav className="bg-zinc-700 my-3 flex justify-between py-5 px-10 rounded-lg">
      <h1 className="text-2xl font-bold">
        <Link to={isAuthenticated ? "/tasks" : "/"}>Reservas</Link>
      </h1>
      <ul className="flex gap-x-2">
        {isAuthenticated ? (
          <>
            <li>
              Bienvenido {user.username}
            </li>
            <li>
              <ButtonLink to="/add-task">Añadir Reserva</ButtonLink>
              <ButtonLink to="/add-cliente">Añadir cliente</ButtonLink>
              <ButtonLink to="/clientes">ver clientes</ButtonLink>
              <ButtonLink to="/add-tecnico">Añadir tecnicos</ButtonLink>
              <ButtonLink to="/tecnicos">ver tecnicos</ButtonLink>
            </li>
            <li>
              <Link to="/" onClick={() => logout()}>
                Cerrar Sesión
              </Link>
            </li>
          </>
        ) : (
          <>
            <li>
              <ButtonLink to="/login">Login</ButtonLink>
            </li>
            <li>
              <ButtonLink to="/register">Registrar</ButtonLink>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}