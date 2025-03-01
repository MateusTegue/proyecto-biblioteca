import { PrestamoModel } from '../models/prestamo.model.js';



export const registrarPrestamo = async (req, res) => {
    try {
        // Asegurar que los valores lleguen correctamente
        console.log("Datos recibidos:", req.body);

        const { id_libro, id_estudiante, fecha_prestamo, fecha_devolucion } = req.body;

        // Verificar si los valores están en el formato correcto
        if (!id_libro || !id_estudiante || !fecha_prestamo || !fecha_devolucion) {
            return res.status(400).json({ message: "Todos los campos son obligatorios" });
        }

        // Convertir id_libro e id_estudiante a números enteros
        const idLibroInt = parseInt(id_libro, 10);
        const idEstudianteInt = parseInt(id_estudiante, 10);

        // Verificar que sean enteros válidos
        if (isNaN(idLibroInt) || isNaN(idEstudianteInt)) {
            return res.status(400).json({ message: "id_libro e id_estudiante deben ser números enteros" });
        }

        // Llamar al modelo con los valores corregidos
        const prestamo = await PrestamoModel.registrarPrestamo(
            idLibroInt,
            idEstudianteInt,
            fecha_prestamo,
            fecha_devolucion
        );

//pesta

        return res.status(201).json(prestamo);

    } catch (error) {
        console.error("Error al registrar el préstamo:", error);
        return res.status(500).json({ message: "Error al registrar el préstamo" });
    }
};
