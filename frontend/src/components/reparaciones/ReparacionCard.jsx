import { useReparaciones } from "../../context/ReparacionContext";
import { Button, ButtonLink, Card,Label,ImageGallery } from "../ui";

export function ReparacionCard({ reparacion }) {
  const { deleteReparacion} = useReparaciones();

  return (
    <Card>
      <header className="flex justify-between">
        <h1 className="text-2xl font-bold">{reparacion.cliente.nombre}</h1>
        
      </header>
      <Label htmlFor="title">Tecnico</Label>
      <p className="text-slate-300">{reparacion.tecnico.nombre}</p>
      <Label htmlFor="title">Descripcion del problema</Label>
      <p className="text-slate-300">{reparacion.description_problema}</p>
      <Label htmlFor="title">Fecha de devolucion</Label>
      <p className="text-slate-300">{reparacion.fecha_devolucion}</p>
      <Label htmlFor="title">Fecha de Recepcion</Label>
      <p className="text-slate-300">{reparacion.fecha_recepcion}</p>
      <Label htmlFor="title">Accesorios dejados</Label>
      <p className="text-slate-300">{reparacion.accesorios_dejados}</p>
      <Label htmlFor="title">Garantia</Label>
      <p className="text-slate-300">{reparacion.garantia}</p>
      <Label htmlFor="title">Costo</Label>
      <p className="text-slate-300">{reparacion.costo}</p>
      <Label htmlFor="title">calificacion</Label>
      <p className="text-slate-300">{reparacion.calificacion}</p>
      <Label htmlFor="title">Fotos</Label>
      {reparacion.fotos && reparacion.fotos.length > 0 ? (
        <ImageGallery photos={reparacion.fotos} />
      ) : (
        <p>No hay fotos disponibles.</p>
      )}
      <p>
          {/* format date dayjs(task.date).utc().format('DD/MM/YY')*/ }
      </p>
      <div className="flex gap-x-2 items-center">
          <Button onClick={() => deleteReparacion(reparacion._id)}>Eliminar</Button>
          <ButtonLink to={`/reparaciones/${reparacion._id}`}>Editar</ButtonLink>
          <ButtonLink to={`/calificar/${reparacion._id}`}>Calificar</ButtonLink>

        </div>
    </Card>
  );
}