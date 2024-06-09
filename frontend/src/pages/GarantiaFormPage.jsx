import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { Button, Card, Input, Label } from "../components/ui";
import { useGarantias } from "../context/GarantiaContext";
import { get, useForm } from "react-hook-form";
dayjs.extend(utc);

export function GarantiaFormPage() {
  const { createGarantia, getGarantia, updateGarantia } = useGarantias();
  const navigate = useNavigate();
  const params = useParams();
  const {register,watch, setValue, handleSubmit, formState: { errors },} = useForm();
  const garantiaChecked = watch("garantia"); // Observa el valor del checkbox de garantía

  const onSubmit = async (data) => {
    try {
      let fecha = data.fecha_inicio_garantia ? dayjs.utc(data.fecha_inicio_garantia) : null;
       let fechaFormateada = fecha && fecha.isValid() ? fecha.format() : '';
      if (params.id) {
        updateGarantia(params.id, {
          ...data,
          fecha_inicio_garantia: fechaFormateada//dayjs.utc(data.fecha_inicio_garantia).format(),
        });
      } else {
        createGarantia({
          ...data,
          fecha_inicio_garantia: fechaFormateada//dayjs.utc(data.fecha_inicio_garantia).format(),
        });
      }
       navigate("/garantias");
    } catch (error) {
      console.log(error);
      // window.location.href = "/";
    }
  };

  useEffect(() => {
    async function loadGarantia() {
      if (params.id) {
        const garantia = await getGarantia(params.id);
        console.log(garantia)
        setValue("Nro_factura", garantia.Nro_factura);
        setValue("equipo_comprado", garantia.equipo_comprado);
        setValue("nombre_cliente",garantia.nombre_cliente);
        setValue("apellido_cliente", garantia.apellido_cliente);
        setValue("nit_cliente", garantia.nit_cliente);
        setValue("garantia",garantia.garantia);
        setValue("tiempo_garantia", garantia.tiempo_garantia);
        setValue("fecha_inicio_garantia", garantia.fecha_inicio_garantia);
      }
    };
    loadGarantia();
  }, []);

  return (
    <Card>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Label htmlFor="nombre">Nro de factura:</Label>
        <Input
          type="number"
          name="Nro_factura"
          placeholder="Ingrese el numero de factura"
          {...register("Nro_factura")}
          autoFocus
        />
        {errors.title && (
          <p className="text-red-500 text-xs italic">Ingrese el numero de factura</p>
        )}

        <Label htmlFor="email">equipo comprado:</Label>
        <Input
          type="text"
          name="equipo_comprado"
          placeholder="Ingrese el equipo comprado"
          {...register("equipo_comprado")}
          autoFocus
        />
        <Label htmlFor="nombre_cliente">nombre del cliente:</Label>
        <Input
          type="text"
          name="nombre_cliente"
          placeholder="Ingrese el nombre del cliente"
          {...register("nombre_cliente")}
          autoFocus
        />
        <Label htmlFor="apellido_cliente">apellido del cliente:</Label>
        <Input
          type="text"
          name="apellido_cliente"
          placeholder="Ingrese el apellido del cliente"
          {...register("apellido_cliente")}
          autoFocus
        />
        <Label htmlFor="nit_cliente">nit del cliente:</Label>
        <Input
          type="number"
          name="nit_cliente"
          placeholder="Ingrese el nit del cliente"
          {...register("nit_cliente")}
          autoFocus
        />
        <Label htmlFor="garantia">garantia:</Label>
        <Input
          type="checkbox"
          name="garantia"
          {...register("garantia")}
          autoFocus
        />
        {garantiaChecked && (
                <>
        <Label htmlFor="password">tiempo de garantia:</Label>
        <Input
          type="text"
          name="tiempo_garantia"
          placeholder="Ingrese el tiempo de garantia"

          {...register("tiempo_garantia")}
          autoFocus
        />
        <Label htmlFor="fecha_inicio_garantia">fecha de inicio de garantia:</Label>
        <Input
          type="date"
          name="fecha_inicio_garantia"
          placeholder="Ingrese la fecha de inicio de garantia"

          {...register("fecha_inicio_garantia")}
          autoFocus
        />
         </>
            )}

        <Button>Guardar garantia</Button>
      </form>
    </Card>
  );
}