import { Router } from 'express';
import { registrarEstudiante } from '../controllers/estudiante.controller.js';
import { mostrarEstudiantes } from '../controllers/estudiante.controller.js';
import { buscarEstudiante } from '../controllers/estudiante.controller.js';
import { buscarEstudianteNUIPController } from '../controllers/estudiante.controller.js';
import { eliminarEstudiante } from '../controllers/estudiante.controller.js';
import { actualizarEstudiante } from '../controllers/estudiante.controller.js';
const router = Router();

// ruta para manejar el registro de los estudiantes 
router.post('/api/estudiante', registrarEstudiante);
router.get('/api/estudiante', mostrarEstudiantes);
router.get('/api/estudiante/:codigo', buscarEstudiante);
router.get('/api/estudianteNUIP/:nuip_estudiante', buscarEstudianteNUIPController);
router.delete('/api/estudianteNUIP/:nuip_estudiante', eliminarEstudiante);
router.put('/api/estudianteNUIP/:nuip_estudiante', actualizarEstudiante);



export default router;  //exportamos el router para poder usarlo en otros archivos.  //exportamos



