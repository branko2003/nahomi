import { useTecnicos } from "../../context/TecnicoContext";
import { Button, ButtonLink, Card } from "../ui";

export function TecnicoCard({ tecnico }) {
  const { deleteTecnico } = useTecnicos();

  return (
    <Card>
      <header className="flex justify-between">
        <h1 className="text-2xl font-bold">{tecnico.name}</h1>
        <div className="flex gap-x-2 items-center">
          <Button onClick={() => deleteTecnico(tecnico._id)}>Eliminar</Button>
          <ButtonLink to={`/tecnicos/${tecnico._id}`}>Editar</ButtonLink>
        </div>
      </header>
      <p className="text-slate-300">{tecnico.apellido}</p>
      {/* format date */}
      <p className="text-slate-300">{tecnico.email}</p>
      <p className="text-slate-300">{tecnico.password}</p>
      <p className="text-slate-300">{tecnico.especialidad}</p>

      <p>
          {/* format date dayjs(task.date).utc().format('DD/MM/YY')*/ }
      </p>
    </Card>
  );
}