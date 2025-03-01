import { pool } from '../database/conexion.js';


// registro de estudiande models
const registrarEstudiante = async ( nuip_estudiante,
    nombre_estudiante,
    apellido_estudiante,
    direccion_estudiante,
    telefino_estudiante,
    email_estudiante) => {

    const query = {
        text: `INSERT INTO estudiante (nuip_estudiante,
        nombre_estudiante,
        apellido_estudiante,
        direccion_estudiante,
        telefono_estudiante,
        email_estudiante)
        VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
        values: [nuip_estudiante,
            nombre_estudiante,
            apellido_estudiante,
            direccion_estudiante,
            telefino_estudiante,
            email_estudiante]
        };

        const { rows } = await pool.query(query);
        return rows[0];
    
}


// mostrar todos los estudiantes registrados en el sistema 
const mostrarEstudiantes = async () => {
    const {rows} = await pool.query(`SELECT * FROM estudiante`);
    return rows;
}


// buscar estudiante con el codigo
const buscarEstudiante = async (codigo) => {
    const query = {
        text: `SELECT * FROM estudiante WHERE codigo = $1`,
        values: [codigo]
    };

    const { rows } = await pool.query(query);
    return rows[0];
}

// buscar estudiante port nuip
const buscarEstudianteNUIP = async (nuip_estudiante) => {
    const query = {
        text: `SELECT * FROM estudiante WHERE nuip_estudiante = $1`,
        values: [nuip_estudiante]
        };
    const { rows } = await pool.query(query);
    return rows[0];
}



const actualizarEstudiante = async (
    nuip_estudiante,
    nombre_estudiante,
    apellido_estudiante,
    direccion_estudiante,
    telefono_estudiante,
    email_estudiante
) => {
    try {
        const query = {
            text: `UPDATE estudiante 
                   SET nombre_estudiante = $1,
                       apellido_estudiante = $2,
                       direccion_estudiante = $3,
                       telefono_estudiante = $4,
                       email_estudiante = $5 
                   WHERE nuip_estudiante = $6
                   RETURNING *`,
            values: [
                nombre_estudiante,
                apellido_estudiante,
                direccion_estudiante,
                telefono_estudiante,
                email_estudiante,
                nuip_estudiante
            ]
        };

        const { rows } = await pool.query(query);

        if (rows.length === 0) {
            console.error("No se encontró el estudiante con NUIP:", nuip_estudiante);
            throw new Error("Estudiante no encontrado");
        }

        return rows[0];

    } catch (error) {
       
        throw new Error("Error al actualizar la información del estudiante: " + error.message);
    }
};



// Eliminar estudiante 
const eliminarEstudiante = async (nuip_estudiante) => {
    try {

        const query = "DELETE FROM estudiante WHERE  nuip_estudiante = $1 RETURNING *";
        const { rows } = await pool.query(query, [nuip_estudiante]);

        if (rows.length === 0 ) {
            throw new Error("El estudiante no existe");
        }
        return rows[0];

    } catch (error){
        throw new Error( "Error al eliminar la información del estudiante: " + error.message);
    }
}



export const EstudianteModel = {
    registrarEstudiante,
    mostrarEstudiantes,
    buscarEstudiante,
    buscarEstudianteNUIP,
    actualizarEstudiante,
    eliminarEstudiante
};  //exportando el modelo de estudiante para que se pueda utilizar en otros archivos

