import {Router} from 'express'
import { authRequired } from '../middlewares/validateToken.js'
import { getClientes, getCliente, updateCliente, deleteCliente } from '../controllers/cliente.controller.js'
const router = Router()

router.get('/clientes', authRequired,getClientes);
router.get('/clientes/:id', authRequired,getCliente);
router.delete('/clientes/:id', authRequired,deleteCliente);
router.put('/clientes/:id', authRequired,updateCliente);
export default router;