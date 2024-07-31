import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card, Message, Button, Input, Label } from "../components/ui";
import { loginSchema } from "../schemas/auth";
import logoImage from "../imagenes/logoLogin.png"; // Asegúrate de que la ruta sea correcta

export function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });
  const { signin, errors: loginErrors, isAuthenticated, user } = useAuth();
  const navigate = useNavigate();

  const onSubmit = (data) => signin(data);

  useEffect(() => {
    if (isAuthenticated) {
      if (user.rol === "Cliente") {
        navigate("/clientes");
      }
      if (user.rol === "Administrador") {
        navigate("/administradores");
      }
    }
  }, [isAuthenticated, user, navigate]);

  return (
    <div className="h-[calc(100vh-100px)] flex items-center justify-center">
      <Card>
        {loginErrors.map((error, i) => (
          <Message message={error} key={i} />
        ))}
        <h1 className="text-2xl font-bold text-center">Inicio de Sesión</h1>
        
        <div className="flex justify-center my-4">
          <img src={logoImage} alt="Logo Login" className="w-24 h-auto" />
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col items-center">
          <div className="w-full mb-2">
            <Label htmlFor="email">Email:</Label>
            <Input
              label="Write your email"
              type="email"
              name="email"
              placeholder="correo@ejemplo.com"
              {...register("email", { required: true })}
            />
            <p className="text-red-500">{errors.email?.message}</p>
          </div>

          <div className="w-full mb-3">
            <Label htmlFor="password" >Password:</Label>
            <Input
              type="password"
              name="password"
              placeholder="Ingrese su contraseña"
              {...register("password", { required: true, minLength: 6 })}
            />
            <p className="text-red-500">{errors.password?.message}</p>
          </div>

          <Button className="w-full ">Ingresar</Button>
        </form>

        <p className="font-bold flex gap-x-2 justify-between mt-4">
          No tiene una cuenta? <Link to="/register" className="text-[#dcae19]">Registrate</Link>
        </p>
      </Card>
    </div>
  );
}
