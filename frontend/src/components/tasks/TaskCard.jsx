import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTasks } from "../../context/TaskContext";
import { Button, ButtonLink } from "../ui";
import { useAuth } from "../../context/AuthContext";

dayjs.extend(utc);

export function TaskCard({ task }) {
  const { deleteTask, updateTaskStatus } = useTasks();
  const { user } = useAuth();
  const navigate = useNavigate(); // Hook para la navegación
  const [taskState, setTaskState] = useState(task.estado); // Estado local para manejar cambios

  const handleStatusChange = async (status) => {
    try {
      await updateTaskStatus(task._id, status); // Esperar la respuesta del servidor
      setTaskState(status); // Actualizar el estado localmente
      // Solo redirigir si el estado se ha actualizado correctamente
      navigate("/tasks");
    } catch (error) {
      console.error("Error updating task status:", error);
    }
  };

  // Convertir la fecha almacenada en UTC a la hora local
  const formattedDate = task.date
    ? dayjs.utc(task.date).local().format('dddd, MMMM D, YYYY') // Ajusta el formato según tu necesidad
    : '';

    console.log("taskcard llga esto",task)
  return (
    <li className="border-b border-gray-200 py-4">
      <header className="flex justify-between">
        <h1 className="text-2xl font-bold">{task.title}</h1>
        <div className="flex gap-x-2 items-center">
          {user.rol === 'Cliente' && (
            <>
              <Button onClick={() => deleteTask(task._id)}>Eliminar</Button>
              <ButtonLink to={`/tasks/${task._id}`}>Editar</ButtonLink>
            </>
          )}
          {['Administrador', 'Tecnico'].includes(user.rol) && (
            <>
              {taskState !== 'Aceptada' && taskState !== 'Rechazada' && (
                <>
                  <Button onClick={() => handleStatusChange('Aceptada')}>Aceptar</Button>
                  <Button onClick={() => handleStatusChange('Rechazada')}>Rechazar</Button>
                </>
              )}
            </>
          )}
        </div>
      </header>
      <p className="text-slate-300">{task.tipo}</p>
      <p className="text-slate-300">{task.description}</p>
      <p>{formattedDate}</p>
      <p className={`text-${taskState === 'Aceptada' ? 'green' : taskState === 'Rechazada' ? 'red' : 'yellow'}-600`}>
        {taskState}
      </p>
    </li>
  );
}
