import { useClientes } from "../../context/ClienteContext";
import { Button, ButtonLink, Card } from "../ui";

export function ClienteCard({ cliente }) {
  const { deleteCliente } = useClientes();

  return (
    <Card>
      <header className="flex justify-between">
        <h1 className="text-2xl font-bold">{cliente.name}</h1>
        <div className="flex gap-x-2 items-center">
          <Button onClick={() => deleteCliente(cliente._id)}>Eliminar</Button>
          <ButtonLink to={`/clientes/${cliente._id}`}>Editar</ButtonLink>
        </div>
      </header>
      <p className="text-slate-300">{cliente.password}</p>
      {/* format date */}
      <p>{cliente.email}
      </p>
      <p>
          {/* format date dayjs(task.date).utc().format('DD/MM/YY')*/ }
      </p>
    </Card>
  );
}