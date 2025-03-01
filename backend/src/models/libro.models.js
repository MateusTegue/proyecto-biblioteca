// importamos la base de datos 
import { pool } from '../database/conexion.js'





// registrar libros 

const registrarLibro = async (
    codigo_libro,
    titulo_libro,
    autor_libro,
    fecha_publicacion,
    editorial_libro,
    imagen_libro,
    cantidad

) => {
     

    // formatear la fecha antes de guardarla en la base de datos 
    const [dia, mes, anio ] = fecha_publicacion.split("/")
    const  fechaFormateada = `${anio}-${mes}-${dia}`;




    const query = {
        text: `INSERT INTO libro (codigo_libro,
            titulo_libro,
            autor_libro,
            fecha_publicacion,
            editorial_libro,
            imagen_libro,
            cantidad)
            VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
            values: [
                codigo_libro,
                titulo_libro,
                autor_libro,
                fechaFormateada,
                editorial_libro,
                imagen_libro,
                cantidad
                ]
    }

    const { rows } = await pool.query(query)
    return rows[0]

}

// mostrar los libros que estan registrados en la base de datos 
const mostrarLibros = async () => {
    const query = { text: `SELECT * FROM libro` }
    const { rows } = await pool.query(query)
    return rows
}


// buscar libros por titulo
const buscarLibro = async (titulo_libro) => {
    const query = {
            text: `SELECT * FROM libro WHERE titulo_libro = $1`,
            values: [titulo_libro]
        };

        const { rows } = await pool.query(query)
        
        if (rows.length === 0) {
            return null; // Si no encuentra el estudiante, retorna null
        }

        return rows[0]
}

// buscar libros por codigo
const buscarLibroCodigoCode = async (codigo_libro) => {
    const query = {
            text: `SELECT * FROM libro WHERE codigo_libro = $1`,
            values: [codigo_libro]
        }
        const { rows } = await pool.query(query)
        return rows[0];
}


// actualizar informacion del libro
const actualizarLibroModel = async (codigo_libro,
    titulo_libro,
    autor_libro,
    fecha_publicacion,
    editorial_libro,
    imagen_libro,
    cantidad) => {
        try{

            const query = {
                text: `UPDATE libro SET titulo_libro = $1,
                autor_libro = $2,
                fecha_publicacion = $3,
                editorial_libro = $4,
                imagen_libro = $5,
                cantidad = $6
                WHERE codigo_libro = $7 RETURNING *`,
                values: [titulo_libro,
                    autor_libro,
                    fecha_publicacion,
                    editorial_libro,
                    imagen_libro,
                    cantidad,
                    codigo_libro]
            }

            const {rows } = await pool.query(query)
            return rows[0]


        } catch (error) {
            throw new Error("Error al actualizar la información del libro: " + error.message);
            }
    }


// Eliminar estudiante 
const eliminarLibro = async (codigo_libro) => {
    try {

        const query = "DELETE FROM libro WHERE  codigo_libro = $1 RETURNING *";
        const { rows } = await pool.query(query, [codigo_libro]);

        if (rows.length === 0 ) {
            throw new Error("El libro no existe");
        }
        return rows[0];

    } catch (error){
        throw new Error( "Error al eliminar la información del libro: " + error.message);
    }
}


export const LibroModel = {
    registrarLibro,
    mostrarLibros,
    buscarLibro,
    buscarLibroCodigoCode,
    actualizarLibroModel,
    eliminarLibro
    
    }  // exportar el modelo de libro


