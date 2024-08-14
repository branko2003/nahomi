import { useGarantias } from "../../context/GarantiaContext";
import { Button, ButtonLink, Card,Label,ImageGallery } from "../ui";

export function GarantiaCard({ garantia }) {
  const { deleteGarantia} = useGarantias();

  return (
    <Card>
      <header className="flex justify-between">
        <h1 className="text-2xl font-bold">{garantia.Nro_factura}</h1>
      </header>
      <Label htmlFor="title">Equipo comprado</Label>
      <p className="text-slate-300">{garantia.equipo_comprado}</p>
      <Label htmlFor="title">nombre del cliente</Label>
      <p className="text-slate-300">{garantia.nombre_cliente}</p>
      <Label htmlFor="title">Apellido del cliente</Label>
      <p className="text-slate-300">{garantia.apellido_cliente}</p>
      <Label htmlFor="title">nit del cliente</Label>
      <p className="text-slate-300">{garantia.nit_cliente}</p>
      <Label htmlFor="title">Garantia</Label>
      <p className="text-slate-300">{garantia.garantia}</p>
      <Label htmlFor="title">tiempo de Garantia</Label>
      <p className="text-slate-300">{garantia.tiempo_garantia}</p>
      <Label htmlFor="title">fecha de inicio de garantia</Label>
      <p className="text-slate-300">{garantia.fecha_inicio_garantia}</p>
      <p>
          {/* format date dayjs(task.date).utc().format('DD/MM/YY')*/ }
      </p>
      <div className="flex gap-x-2 items-center">
          <Button onClick={() => deleteGarantia(garantia._id)}>Eliminar</Button>
          <ButtonLink to={`/garantias/${garantia._id}`}>Editar</ButtonLink>

        </div>
    </Card>
  );
}