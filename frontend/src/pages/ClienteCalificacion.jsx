import { useEffect,useState  } from "react";
import { useNavigate, useParams } from "react-router-dom";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { Button, Card , Label, StarRating } from "../components/ui";
import { useReparaciones } from "../context/ReparacionContext";
import { useForm } from "react-hook-form";
dayjs.extend(utc);




export function ClienteCalificacion() {
  const { calificarReparacion } = useReparaciones();
  const navigate = useNavigate();
  const params = useParams();
  const {register, setValue, handleSubmit, formState: { errors },} = useForm();
  const [selectedRating, setSelectedRating] = useState(0);


  const onSubmit = async (data) => {
    try {
      if (params.id) {
        calificarReparacion(params.id,{calificacion: selectedRating});
      } 
       navigate("/reparaciones");
    } catch (error) {
      console.log(error);
      // window.location.href = "/";
    }
  };
  useEffect(() => {

  }, []);
  return (
    <Card>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Label htmlFor="title">Calificar</Label>
        <StarRating onChange={(rate) => setSelectedRating(rate)} />
        <Button>Calificar</Button>
      </form>
    </Card>
  );
}