import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { Button, Card, Input, Label } from "../components/ui";
import { useReparaciones } from "../context/ReparacionContext";
import { Textarea } from "../components/ui/Textarea";
import { get, useForm } from "react-hook-form";
dayjs.extend(utc);

import { useClientes } from "../context/ClienteContext";

import { useTecnicos } from "../context/TecnicoContext";

export function ReparacionFormPage() {
  const { createReparacion, getReparacion, updateReparacion } = useReparaciones();
  const { clientes, getClientes } = useClientes();
  const { tecnicos, getTecnicos } = useTecnicos();
// Dentro de tu componente
const [accesorios, setAccesorios] = useState([{ id: Math.random(), value: "" }]);



  const navigate = useNavigate();
  const params = useParams();
  const { register, setValue, handleSubmit, formState: { errors }, } = useForm();

  const onSubmit = async (data) => {
    try {
      const accesoriosDejados = accesorios.map(accesorio => accesorio.value.trim()).filter(value => value !== "");
      if (params.id) {
        updateReparacion(params.id, {
          ...data,
          accesorios_dejados: accesoriosDejados,
          fecha_recepcion: dayjs.utc(data.fecha_recepcion).format(),
          fecha_devolucion: dayjs.utsc(data.fecha_devolucion).format(),
        });
      } else {
        createReparacion({
          ...data,
          accesorios_dejados: accesoriosDejados,
          fecha_recepcion: dayjs.utc(data.fecha_recepcion).format(),
          fecha_devolucion: dayjs.utc(data.fecha_devolucion).format(),
        });
      }
      navigate("/reparaciones");
    } catch (error) {
      console.log(error);
      // window.location.href = "/";
    }
  };

  useEffect(() => {
    async function loadTask() {
      const accesoriosDejados = accesorios.map(accesorio => accesorio.value.trim()).filter(value => value !== "");
      if (params.id) {
        const reparacion = await getReparacion(params.id);
        setValue("title", reparacion.title);
        setValue("description", reparacion.description);
        setValue("date", reparacion.date ? dayjs(task.date).utc().format("YYYY-MM-DD") : "");
        setValue("completed", reparacion.completed);
      }
    };
    loadTask();
    getClientes();
    getTecnicos();
  }, []);

  const handleAccesorioChange = (id, event) => {
    const newAccesorios = accesorios.map(accesorio => {
      if (accesorio.id === id) {
        return { ...accesorio, value: event.target.value };
      }
      return accesorio;
    });
    setAccesorios(newAccesorios);
  };
  
  const addAccesorio = (e) => {
    e.preventDefault(); // Esto previene la propagación de eventos

    setAccesorios(accesorios.concat({ id: Math.random(), value: "" }));
  };
  
  const removeAccesorio = (e,id) => {
    e.preventDefault(); // Esto previene la propagación de eventos

    setAccesorios(accesorios.filter(accesorio => accesorio.id !== id));
  };

  
  return (
    <Card>
      <form onSubmit={handleSubmit(onSubmit)}>
        
        <Label htmlFor="cliente">Ingrese al cliente:</Label>
        <select
          name="cliente"
          style={{ color: 'black' }}  // Aplicando el estilo directamente

          {...register("cliente")}
        >
          {clientes.map(cliente => (
            <option key={cliente.id} value={cliente._id}>
              {cliente.nombre}
            </option>
          ))}
        </select>


        <Label htmlFor="tecnico">Ingrese al tecnico:</Label>
        <select
          name="tecnico"
          style={{ color: 'black' }}  // Aplicando el estilo directamente

          {...register("tecnico")}
        >
          {tecnicos.map(tecnico => (
            <option key={tecnico.id} value={tecnico._id}>
              {tecnico.nombre}
            </option>
          ))}
        </select>
        <Label htmlFor="accesorio">Accesorios dejados:</Label>
        {accesorios.map((accesorio, index) => (
  <div key={accesorio.id}>
    <Input
      type="text"
      value={accesorio.value}
      onChange={e => handleAccesorioChange(accesorio.id, e)}
      placeholder="Ingrese un accesorio dejado"
    />
    {accesorios.length > 1 && (
      <Button type="button "onClick={(e) => removeAccesorio(e,accesorio.id)}>Eliminar</Button>
    )}
  </div>
))}
<Button type="button" onClick={addAccesorio}>Agregar Accesorio</Button>
        <Label htmlFor="description_problema">Descripción del problema:</Label>
        <Textarea
          name="description_problema"
          id="description_problema"
          rows="3"
          {...register("description_problema")}
        ></Textarea>
        <Label htmlFor="garantia">Garantia:</Label>
        <Input
          type = "number"
          name="garantia"
          rows="3"
          {...register("garantia")}
        ></Input>
        <Label htmlFor="costo">Costo:</Label>
        <Input
          type = "number"
          name="costo"
          rows="3"
          {...register("costo")}
        ></Input>
        <Label htmlFor="aceptacion_cambios">Aceptacion cambios:</Label>
        <Input
          type = "checkbox"
          name="aceptacion_cambios"
          rows="3"
          {...register("aceptacion_cambios")}
        ></Input>
        <Label htmlFor="date">Fecha de Reserva:</Label>
        <Input type="date" name="fecha_recepcion" {...register("fecha_recepcion")} />
        <Label htmlFor="date">Fecha de devolucion:</Label>
        <Input type="date" name="fecha_devolucion" {...register("fecha_devolucion")} />
        <Label htmlFor="fotos">Fotos:</Label>
        <Input
          type = "file"
          name="fotos"
          rows="3"
          {...register("fotos")}
        ></Input>
        <Button>Guardar Reserva</Button>
      </form>
    </Card>
  );
}