import { useReparaciones } from "../../context/ReparacionContext";
import { Button, ButtonLink, Card, Label, ImageGallery } from "../ui";
import { useAuth } from "../../context/AuthContext";
import { PDFDownloadLink } from '@react-pdf/renderer';
import Pdf from '../../pages/Pdf.jsx';

export function ReparacionCard({ reparacion }) {
  const { user } = useAuth();
  const { deleteReparacion } = useReparaciones();

  return (
    <Card>
      <header className="flex justify-between">
        <h1 className="text-2xl font-bold">Reparación</h1>
      </header>
      
      <div className="space-y-4">
        <div>
          <Label htmlFor="cliente">Cliente</Label>
          <p className="text-slate-300">{reparacion.cliente.username}</p>
        </div>

        <div>
          <Label htmlFor="tecnico">Técnico</Label>
          <p className="text-slate-300">{reparacion.tecnico.username}</p>
        </div>

        <div>
          <Label htmlFor="descripcion">Descripción del problema</Label>
          <p className="text-slate-300">{reparacion.description_problema}</p>
        </div>

        <div>
          <Label htmlFor="fechaDevolucion">Fecha de devolución</Label>
          <p className="text-slate-300">{reparacion.fecha_devolucion}</p>
        </div>

        <div>
          <Label htmlFor="fechaRecepcion">Fecha de recepción</Label>
          <p className="text-slate-300">{reparacion.fecha_recepcion}</p>
        </div>

        <div>
          <Label htmlFor="accesorios">Accesorios dejados</Label>
          <p className="text-slate-300">{reparacion.accesorios_dejados}</p>
        </div>

        <div>
          <Label htmlFor="garantia">Garantía</Label>
          <p className="text-slate-300">{reparacion.garantia}</p>
        </div>

        <div>
          <Label htmlFor="costo">Costo</Label>
          <p className="text-slate-300">{reparacion.costo}</p>
        </div>

        <div>
          <Label htmlFor="calificacion">Calificación</Label>
          <p className="text-slate-300">{reparacion.calificacion}</p>
        </div>

        <div>
          <Label htmlFor="fotos">Fotos</Label>
          {reparacion.fotos && reparacion.fotos.length > 0 ? (
            <ImageGallery photos={reparacion.fotos} />
          ) : (
            <p>No hay fotos disponibles.</p>
          )}
        </div>
      </div>

      <div className="flex gap-x-2 items-center mt-4">
        {(user.rol === 'Administrador' || user.rol === 'Tecnico') && (
          <>
            <Button onClick={() => deleteReparacion(reparacion._id)}>Eliminar</Button>
            <ButtonLink to={`/reparaciones/${reparacion._id}`}>Editar</ButtonLink>
            <PDFDownloadLink document={<Pdf reparacion={reparacion} />} fileName='reparacion_boleta.pdf'>
              {({ loading }) => loading ? (
                <Button>Cargando Documento...</Button>
              ) : (
                <Button className="reporte">Descargar Reportes</Button>
              )}
            </PDFDownloadLink>
          </>
        )}
        {user.rol === 'Cliente' && !reparacion.calificacion && (
          <ButtonLink to={`/calificar/${reparacion._id}`}>Calificar</ButtonLink>
        )}
      </div>
    </Card>
  );
}
