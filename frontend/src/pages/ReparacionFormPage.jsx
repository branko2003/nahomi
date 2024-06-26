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


const [accesorios, setAccesorios] = useState([{ id: Math.random(), value: "" }]);
const [fotos, setFotos] = useState([]);



  const navigate = useNavigate();
  const params = useParams();
  const { register, setValue, handleSubmit, formState: { errors }, } = useForm();

  const onSubmit = async (data) => {
    try {
      const accesoriosDejados = accesorios.map(accesorio => accesorio.value.trim()).filter(value => value !== "");
      const formData = new FormData();
      fotos.forEach(file => {
        formData.append('fotos', file);
      });
       // Añadir datos del formulario manualmente
    formData.append('cliente', data.cliente);
    formData.append('tecnico', data.tecnico);
    formData.append('description_problema', data.description_problema);
    formData.append('garantia', data.garantia);
    formData.append('costo', data.costo);
    formData.append('aceptacion_cambios', data.aceptacion_cambios);
    formData.append('fecha_recepcion', dayjs.utc(data.fecha_recepcion).format());
    formData.append('fecha_devolucion', dayjs.utc(data.fecha_devolucion).format());
    formData.append('accesorios_dejados', JSON.stringify(accesoriosDejados)); // Asegúrate de que el servidor pueda parsear JSON
    console.log(data);
    // Para ver lo que contiene FormData
for (let [key, value] of formData.entries()) {
  console.log(key, value);
}
    if (params.id) {
        updateReparacion(params.id, 
          formData
        );
      } else {
        createReparacion(formData
        );
      }
      //navigate("/reparaciones");
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
        setValue("description_problema", reparacion.description_problema);
        setValue("garantia", reparacion.garantia);
        setValue("fecha_reserva", reparacion.fecha_recepcion ? dayjs(reparacion.fecha_recepcion).utc().format("YYYY-MM-DD") : "");
        setValue("fecha_devolucion", reparacion.fecha_devolucion ? dayjs(reparacion.fecha_devolucion).utc().format("YYYY-MM-DD") : "");
        setAccesorios(reparacion.accesorios_dejados.map((accesorio, index) => ({ id: index, value: accesorio })));
        setValue("costo", reparacion.costo);
        setValue("cliente", reparacion.user);
        setValue("tecnico", reparacion.tecnico);
        setValue("aceptacion_cambios", reparacion.aceptacion_cambios);
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

  const handleFileChange = (event) => {
    event.preventDefault(); // Esto previene la propagación de eventos

    // Agregar nuevos archivos a los ya existentes
    setFotos([...fotos, ...Array.from(event.target.files)]);
  };
  
  const removeFoto = (e,index) => {
    e.preventDefault(); // Esto previene la propagación de eventos

    setFotos(fotos.filter((_, idx) => idx !== index));
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
           <option value="">Seleccione un cliente</option> {/* Opción vacía inicial */}
          {clientes.map(cliente => (
            <option key={cliente.id} value={cliente._id}>
              {cliente.username}
            </option>
          ))}
        </select>


        <Label htmlFor="tecnico">Ingrese al tecnico:</Label>
        <select
          name="tecnico"
          style={{ color: 'black' }}  // Aplicando el estilo directamente

          {...register("tecnico")}
        >
           <option value="">Seleccione un técnico</option> {/* Opción vacía inicial */}
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
        {
  !params.id && ( // Solo se renderizarán si param.id no tiene valor
    <>
        <Label htmlFor="fotos">Fotos:</Label>
        <Input
            type="file"
            name="fotos"
            multiple
            onChange={handleFileChange}
            
          />

          {fotos.map((file, index) => (
            <div key={index}>
              {file.name}
              <Button type="button" onClick={(e) => removeFoto(e,index)}>Eliminar</Button>
            </div>
          ))}
            </>
  )
}
        <Button>Guardar Reserva</Button>
      </form>
    </Card>
  );
}