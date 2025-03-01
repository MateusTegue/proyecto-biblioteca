import { Router } from "express";
import { registrarPrestamo } from "../controllers/prestamo.controller.js";


const router = Router();

router.post("/api/prestamo", registrarPrestamo);





export default router;

