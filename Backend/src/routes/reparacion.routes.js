import {Router} from 'express'
import { authRequired } from '../middlewares/validateToken.js'
import { getReparaciones, getReparacion, createReparacion, updateReparacion, deleteReparacion, upload, calificacionReparacion } from '../controllers/reparacion.controller.js'
import { validateSchema } from '../middlewares/validator.middleware.js'
import { createReparacionSchema } from '../schemas/reparacion.schema.js'
const router = Router()

router.get('/reparaciones', authRequired,getReparaciones);
router.get('/reparaciones/:id', authRequired,getReparacion);
router.post('/reparaciones',upload, authRequired, validateSchema(createReparacionSchema),createReparacion);
router.delete('/reparaciones/:id', authRequired,deleteReparacion);
router.put('/reparaciones/:id', authRequired,updateReparacion);
router.patch('/reparaciones/:id', authRequired,calificacionReparacion);


export default router;