import { pool } from "../database/conexion.js";


// registrar prestamos de un estudinate 
const registrarPrestamo = async ( id_libro,	id_estudiante,	fecha_prestamo,	fecha_devolucion ) => {
        // formatear la fecha antes de guardarla en la base de datos 
    try {
       
        const query = {
            text: `INSERT INTO prestamo (id_libro, id_estudiante, fecha_prestamo , fecha_devolucion) VALUES ($1, $2, $3, $4) RETURNING*`,
            values: [id_libro, id_estudiante, fecha_prestamo, fecha_devolucion ]
        }

        const { rows } = await pool.query(query);
        return rows[0];



    } catch (error) {
        console.log(error)
    }
}

export const PrestamoModel = {
     registrarPrestamo
    };



