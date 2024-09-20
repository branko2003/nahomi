import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { Button, Card, Input, Label } from "../components/ui";
import { useReparaciones } from "../context/ReparacionContext";
import { Textarea } from "../components/ui/Textarea";
import { get, useForm } from "react-hook-form";
import "../styles/styles.css";
dayjs.extend(utc);
import { useClientes } from "../context/ClienteContext";
import { useTecnicos } from "../context/TecnicoContext";

export function ReparacionFormPage() {
  const { createReparacion, getReparacion, updateReparacion, deleteReparacionFoto } = useReparaciones();
  const { clientes, getClientes } = useClientes();
  const { tecnicos, getTecnicos } = useTecnicos();
  const [accesorios, setAccesorios] = useState([{ id: Math.random(), value: "" }]);
  const [fotos, setFotos] = useState([]);
  const [existingFotos, setExistingFotos] = useState([]);
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
      
      existingFotos.forEach(foto => {
        formData.append('existingFotos', foto); // Esto es para mantener fotos ya existentes
      })      
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
          updateReparacion(params.id, formData);
        }  else {
          createReparacion(formData);
        }

      navigate("/reparaciones");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    async function loadTask() {
      const accesoriosDejados = accesorios.map(accesorio => accesorio.value.trim()).filter(value => value !== "");
      if (params.id) {
        const reparacion = await getReparacion(params.id);
        setValue("description_problema", reparacion.description_problema);
        setValue("garantia", reparacion.garantia);
        setValue("fecha_recepcion", reparacion.fecha_recepcion ? dayjs(reparacion.fecha_recepcion).utc().format("YYYY-MM-DD") : "");
        setValue("fecha_devolucion", reparacion.fecha_devolucion ? dayjs(reparacion.fecha_devolucion).utc().format("YYYY-MM-DD") : "");
        setAccesorios(reparacion.accesorios_dejados.map((accesorio, index) => ({ id: index, value: accesorio })));
        setValue("costo", reparacion.costo);
        setValue("cliente", reparacion.cliente);
        setValue("tecnico", reparacion.tecnico);
        setValue("aceptacion_cambios", reparacion.aceptacion_cambios);

        setExistingFotos(reparacion.fotos);
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
  
  const handleRemoveExistingFoto = async (e, index) => {
    e.preventDefault();
    const foto = existingFotos[index];
    try {
      await deleteReparacionFoto(params.id, foto);
      setExistingFotos(existingFotos.filter((_, idx) => idx !== index));
    } catch (error) {
      console.error('Error al eliminar la foto', error);
    }
  };

  return (
    <Card>
      <h1 className="text-2xl font-bold text-center mb-6 relative custom-title">
        Registro de Reparación</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="form-grid">
        <div>
          <Label htmlFor="cliente">Ingrese al cliente:</Label>
          <select
            name="cliente"
            style={{ color: 'black' }}
            {...register("cliente")}
          >
            <option value="">Seleccione un cliente</option>
            {clientes.map(cliente => (
              <option key={cliente.id} value={cliente._id}>
                {cliente.username}
              </option>
            ))}
          </select>
        </div>

        <div>
          <Label htmlFor="tecnico">Ingrese al técnico:</Label>
          <select
            name="tecnico"
            style={{ color: 'black' }}
            {...register("tecnico")}
          >
            <option value="">Seleccione un técnico</option>
            {tecnicos.map(tecnico => (
              <option key={tecnico.id} value={tecnico._id}>
                {tecnico.username}
              </option>
            ))}
          </select>
        </div>

        <div>
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
                <Button type="button" onClick={(e) => removeAccesorio(e, accesorio.id)}>Eliminar</Button>
              )}
            </div>
          ))}
          <Button type="button" onClick={addAccesorio}>Agregar Accesorio</Button>
        </div>

        <div>
          <Label htmlFor="description_problema">Descripción del problema:</Label>
          <Textarea
            name="description_problema"
            id="description_problema"
            rows="3"
            {...register("description_problema")}
          ></Textarea>
        </div>
        
        <div>
          <Label htmlFor="costo">Costo:</Label>
          <Input
            type="number"
            name="costo"
            {...register("costo")}
          />
        </div>

        <div>
          <Label htmlFor="aceptacion_cambios">Aceptación cambios:</Label>
          <Input
            type="checkbox"
            name="aceptacion_cambios"
            {...register("aceptacion_cambios")}
          />
        </div>

        <div>
          <Label htmlFor="fecha_recepcion">Fecha de Reserva:</Label>
          <Input type="date" name="fecha_recepcion" {...register("fecha_recepcion")} />
        </div>

        <div>
          <Label htmlFor="fecha_devolucion">Fecha de Devolución:</Label>
          <Input type="date" name="fecha_devolucion" {...register("fecha_devolucion")} />
        </div>

        <div>
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
              <Button type="button" onClick={(e) => removeFoto(e, index)}>Eliminar</Button>
            </div>
          ))}
          {/* Mostrar fotos existentes con opción para eliminar */}
          {existingFotos.map((foto, index) => (
            <div key={index}>
              {foto} {/* Aquí deberías tener una vista previa o un enlace a la foto */}
              <Button type="button" onClick={(e) => handleRemoveExistingFoto(e, index)}>Eliminar</Button>
            </div>
          ))}
        </div>

    <div className="flex justify-center">
      <Button type="submit">Guardar Reparación</Button>
    </div>
    </form>
  </Card>
);
}