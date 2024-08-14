import { useEffect } from "react";
import { useTasks } from "../context/TaskContext";
import { useAuth } from "../context/AuthContext";
import { TaskCard } from "../components/tasks/TaskCard";
import { ImFileEmpty } from "react-icons/im";

export function TasksPage() {
  const { tasks, getTasks } = useTasks();
  const { user } = useAuth();

  useEffect(() => {
    // Llamada a getTasks para obtener las tareas
    getTasks();
  }, []);

  // Filtrar tareas si el usuario es un cliente
  const filteredTasks = user.role === 'Cliente'
    ? tasks.filter(task => task.cliente._id === user._id)
    : tasks;

  return (
    <>
      {filteredTasks.length === 0 && (
        <div className="flex justify-center items-center p-10">
          <div>
            <ImFileEmpty className="text-6xl text-gray-400 m-auto my-2" />
            <h1 className="font-bold text-xl">
              Aún no hay reservas, agregue una nueva reserva
            </h1>
          </div>
        </div>
      )}

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-2">
        {filteredTasks.map((task) => (
          <TaskCard task={task} key={task._id} />
        ))}
      </div>
    </>
  );
}
