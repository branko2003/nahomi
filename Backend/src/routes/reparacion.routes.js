import {Router} from 'express'
import { authRequired } from '../middlewares/validateToken.js'
import { getTecnicos, getTecnico, createTecnico, updateTecnico, deleteTecnico } from '../controllers/tecnico.controller.js'
import { validateSchema } from '../middlewares/validator.middleware.js'
import { createTecnicoSchema } from '../schemas/tecnico.schema.js'
const router = Router()

router.get('/reparaciones', authRequired,getTecnicos);
router.get('/reparaciones/:id', authRequired,getTecnico);
router.post('/reparaciones', authRequired, validateSchema(createTecnicoSchema),createTecnico);
router.delete('/reparaciones/:id', authRequired,deleteTecnico);
router.put('/reparaciones/:id', authRequired,updateTecnico);


export default router;