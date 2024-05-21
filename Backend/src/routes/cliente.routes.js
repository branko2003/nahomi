import {Router} from 'express'
import { authRequired } from '../middlewares/validateToken.js'
import { getClientes, getCliente, createCliente, updateCliente, deleteCliente } from '../controllers/cliente.controller.js'
import { validateSchema } from '../middlewares/validator.middleware.js'
import { createClienteSchema } from '../schemas/cliente.shema.js'
const router = Router()

router.get('/clientes', authRequired,getClientes);
router.get('/clientes/:id', authRequired,getCliente);
router.post('/clientes', authRequired, validateSchema(createClienteSchema),createCliente);
router.delete('/clientes/:id', authRequired,deleteCliente);
router.put('/clientes/:id', authRequired,updateCliente);


export default router;