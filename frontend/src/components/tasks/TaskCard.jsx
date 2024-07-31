import { useTasks } from "../../context/TaskContext";
import { Button, ButtonLink } from "../ui";

export function TaskCard({ task }) {
  const { deleteTask } = useTasks();

  return (
    <li className="border-b border-gray-200 py-4">
      <header className="flex justify-between">
        <h1 className="text-2xl font-bold">{task.title}</h1>
        <div className="flex gap-x-2 items-center">
          <Button onClick={() => deleteTask(task._id)}>Eliminar</Button>
          <ButtonLink to={`/tasks/${task._id}`}>Editar</ButtonLink>
        </div>
      </header>
      <p className="text-slate-300">{task.tipo}</p>
      <p className="text-slate-300">{task.description}</p>
      <p>
        {task.date &&
          new Date(task.date).toLocaleDateString("en-US", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
      </p>
      {/* Para usar dayjs */}
      {/* <p>{dayjs(task.date).utc().format('DD/MM/YY')}</p> */}
    </li>
  );
}
