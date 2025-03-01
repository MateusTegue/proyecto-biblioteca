import { Router } from "express";
import { registrarLibro } from "../controllers/libro.controller.js";
import { mostarLibros } from "../controllers/libro.controller.js";
import { buscarLibroCodigoCode } from "../controllers/libro.controller.js";
import { eliminarLibro } from "../controllers/libro.controller.js";


const router = Router();


router.post("/api/libro", registrarLibro);
router.get("/api/libro", mostarLibros);
router.get("/api/libroCode/:codigo_libro", buscarLibroCodigoCode);
router.delete("/api/libroCode/:codigo_libro", eliminarLibro);



export default router;  // Export the router to use it in other files