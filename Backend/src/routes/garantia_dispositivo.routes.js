import {Router} from 'express'
import { authRequired } from '../middlewares/validateToken.js'
import { getGarantias, getGarantia, createGarantia, updateGarantia, deleteGarantia } from '../controllers/garantia_dispositivo.controller.js'
import { validateSchema } from '../middlewares/validator.middleware.js'
import { createGarantia_dispositivoSchema } from '../schemas/garantia_dispositivo.schema.js'
const router = Router()

router.get('/garantia', authRequired,getGarantias);
router.get('/garantia/:id', authRequired,getGarantia);
router.post('/garantia', authRequired, validateSchema(createGarantia_dispositivoSchema),createGarantia);
router.delete('/garantia/:id', authRequired,deleteGarantia);
router.put('/garantia/:id', authRequired,updateGarantia);


export default router;