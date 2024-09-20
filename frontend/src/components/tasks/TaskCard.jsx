import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTasks } from "../../context/TaskContext";
import { Button, ButtonLink } from "../ui";
import { useAuth } from "../../context/AuthContext";
import { FaEdit, FaTrash } from "react-icons/fa"; // Íconos para editar y eliminar

dayjs.extend(utc);

export function TaskCard({ task }) {
  const { deleteTask, updateTaskStatus } = useTasks();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [taskState, setTaskState] = useState(task.estado);

  const handleStatusChange = async (status) => {
    try {
      await updateTaskStatus(task._id, status);
      setTaskState(status);
      navigate("/tasks");
    } catch (error) {
      console.error("Error updating task status:", error);
    }
  };

  const formattedDate = task.date
    ? dayjs.utc(task.date).local().format('dddd, MMMM D, YYYY')
    : '';

  return (
    <tr key={task._id}>
      <td className="px-2 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{task.title}</td>
      <td className="px-2 py-4 whitespace-nowrap text-sm text-gray-500">{task.tipo}</td>
      <td className="px-2 py-4 whitespace-nowrap text-sm text-gray-500">{task.description}</td>
      <td className="px-2 py-4 whitespace-nowrap text-sm text-gray-500">{formattedDate}</td>
      <td className={`px-2 py-2 whitespace-nowrap text-sm font-medium text-center ${taskState === 'Aceptada' ? 'text-green-600' : taskState === 'Rechazada' ? 'text-red-600' : 'text-yellow-600'}`}>
        {taskState}
      </td>
      <td className="px-4 py-2 text-sm font-medium text-center flex justify-center gap-4">
        {user.rol === 'Cliente' && (
          <>
            <button
              onClick={() => deleteTask(task._id)}
              className="text-red-500 hover:text-red-700 text-lg"
              aria-label="Eliminar"
            >
              <FaTrash />
            </button>
            <Link
            to={`/tasks/${task._id}`} 
            className="text-green-500 hover:text-green-700 text-lg">
              <FaEdit />
            </Link>
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
      </td>
    </tr>
  );
}
