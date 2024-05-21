import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { Button, Card, Input, Label } from "../components/ui";
import { useTecnicos } from "../context/TecnicoContext";
import { Textarea } from "../components/ui/Textarea";
import { useForm } from "react-hook-form";
dayjs.extend(utc);

export function TecnicoFormPage() {
  const { createTecnico, getTecnico, updateTecnico } = useTecnicos();
  const navigate = useNavigate();
  const params = useParams();
  const {register, setValue, handleSubmit, formState: { errors },} = useForm();

  const onSubmit = async (data) => {
    try {
      if (params.id) {
        updateTecnico(params.id, {
          ...data,
          date: dayjs.utc(data.date).format(),
        });
      } else {
        createTecnico({
          ...data,
          date: dayjs.utc(data.date).format(),
        });
      }
       navigate("/tecnicos");
    } catch (error) {
      console.log(error);
      // window.location.href = "/";
    }
  };

  useEffect(() => {
    async function loadTecnico() {
      if (params.id) {
        const tecnico = await getTecnico(params.id);
        setValue("nombre", tecnico.nombre);
        setValue("apellido", tecnico.apellido);
        setValue("email", tecnico.email);
        setValue("password", tecnico.password);
        setValue("especialidad", tecnico.especialidad);

      }
    };
    loadTecnico();
  }, []);

  return (
    <Card>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Label htmlFor="nombre">Nombre del tecncio</Label>
        <Input
          type="text"
          name="nombre"
          placeholder="Ingrese el nombre del cliente"
          {...register("nombre")}
          autoFocus
        />
        {errors.title && (
          <p className="text-red-500 text-xs italic">Ingrese el nombre del tecnico</p>
        )}

        <Label htmlFor="apellido">Apelldio del tecnico:</Label>
        <Input
          type="apellido"
          name="apellido"
          placeholder="Ingrese el apellido del tecnico"
          {...register("apellido")}
          autoFocus
        />
        <Label htmlFor="email">email del tecnico:</Label>
        <Input
          type="email"
          name="email"
          placeholder="Ingrese el apellido del tecnico"
          {...register("email")}
          autoFocus
        />
        <Label htmlFor="password">password del tecnico:</Label>
        <Input
          type="password"
          name="password"
          placeholder="Ingrese el password del tecnico"
          {...register("password")}
          autoFocus
        />
        <Label htmlFor="especialidad">especialidad del tecnico:</Label>
        <Input
          type="especialidad"
          name="especialidad"
          placeholder="Ingrese la especialidad del tecnico"
          {...register("especialidad")}
          autoFocus
        />
        <Button>Guardar tecnico</Button>
      </form>
    </Card>
  );
}