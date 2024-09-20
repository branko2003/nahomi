import { useReparaciones } from "../../context/ReparacionContext";
import { Button, ButtonLink, Card, Label, ImageGallery } from "../ui";
import { useAuth } from "../../context/AuthContext";
import { PDFDownloadLink } from '@react-pdf/renderer';
import Pdf from '../../pages/Pdf.jsx';
import { FaEdit, FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";

export function ReparacionCard({ reparacion }) {
  const { user } = useAuth();
  const { deleteReparacion, calificarReparacion } = useReparaciones();


  const handleUpdate = () => {

    calificarReparacion(reparacion._id, { aceptacion_cambios: true });
  };
  return (
<tr key={reparacion._id} className="bg-white border-b hover:bg-gray-50">
      <td className="px-4 py-3 text-sm font-medium text-gray-900">{reparacion.cliente.username}</td>
      <td className="px-4 py-3 text-sm text-gray-500">{reparacion.tecnico.username}</td>
      <td className="px-4 py-3 text-sm text-gray-500">{reparacion.description_problema}</td>
      <td className="px-4 py-3 text-sm text-gray-500">{reparacion.fecha_devolucion}</td>
      <td className="px-4 py-3 text-sm text-gray-500">{reparacion.fecha_recepcion}</td>
      <td className="px-4 py-3 text-sm text-gray-500">{reparacion.accesorios_dejados}</td>
      <td className="px-4 py-3 text-sm text-gray-500">{reparacion.garantia}</td>
      <td className="px-4 py-3 text-sm text-gray-500">{reparacion.costo}</td>
      <td className="px-4 py-3 text-sm text-gray-500">{reparacion.calificacion}</td>
      <td className="px-4 py-3 text-sm text-gray-500">
        {reparacion.aceptacion_cambios ? 'Aceptado' : 'No Aceptado'}
      </td>
      <td className="px-4 py-3 text-sm">
        {reparacion.fotos && reparacion.fotos.length > 0 ? (
          <ImageGallery photos={reparacion.fotos} />
        ) : (
          'No hay fotos disponibles.'
        )}
      </td>
      <td className="px-4 py-3 text-sm flex gap-x-2">
        {(user.rol === 'Administrador' || user.rol === 'Tecnico') && (
          <>
            <button 
              onClick={() => deleteReparacion(reparacion._id)} 
              className="text-red-500 hover:text-red-700">
              
          <FaTrash />
        </button>
            <Link 
              to={`/reparaciones/${reparacion._id}`} 
              className="text-green-500 hover:text-green-700 text-lg">
              <FaEdit />
            </Link>
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
          <>
            <ButtonLink to={`/calificar/${reparacion._id}`} className="text-green-500 hover:text-green-700">
              Calificar
            </ButtonLink>
            {!reparacion.aceptacion_cambios && (
              <Button onClick={handleUpdate} className="text-yellow-500 hover:text-yellow-700">
                Aceptar cambios
              </Button>
            )}
          </>
        )}
      </td>
    </tr>
  );
}