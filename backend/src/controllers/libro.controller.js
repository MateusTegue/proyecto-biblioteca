import { LibroModel  } from "../models/libro.models.js";


// registrar libros en la base de datos 
export const registrarLibro = async (req, res) => {
    try{

        const { codigo_libro, titulo_libro, autor_libro, fecha_publicacion, editorial_libro, imagen_libro, cantidad } = req.body;
        if(!codigo_libro || !titulo_libro || !autor_libro || !fecha_publicacion || !editorial_libro || !imagen_libro || !cantidad){
            return res.status(400).json({msg: "Todos los campos son obligatorios"});
        }

        // verificar si el libro ya esta registrado en el sistema
        const libroExiste = await LibroModel.buscarLibroCodigoCode(codigo_libro);
        if(libroExiste){
            return res.status(400).json({message: "El libro ya se encuantra registrado en el sistema"})
        }


        // registrar el nuevo libro si no existe en el sistema 
        const nuevoLibro = await LibroModel.registrarLibro(codigo_libro, titulo_libro, autor_libro, fecha_publicacion, editorial_libro, imagen_libro, cantidad);
        return res.status(200).json({ok : true, message: "Libro registrado con exito", data : nuevoLibro});
    

    }catch (error){
        console.log(error)
        }
}


// mostar todos lis libros de la base de datos
export const mostarLibros = async (req, res) => {
    try{

        const libros = await LibroModel.mostrarLibros();
        return res.status(200).json(libros)

    } catch (error){
        return res.status(500).json({message : "Error al mostrar los libros registrados"})
  }
}

// obterner libos por codigo 
export const buscarLibroCodigoCode = async (req, res) => {
    try {
       
      const { codigo_libro } = req.params;

      if(!codigo_libro){
        return res.status(400).json({msg: "El codigo del libro es obligatorio"});
      }

      const libro = await LibroModel.buscarLibroCodigoCode(codigo_libro);

      return res.status(200).json(libro)

    } catch (error) {
        console.log(error)
    }
}



// eliminar libros del sisema 
export const eliminarLibro = async (req, res) => {
    try{
        const { codigo_libro } = req.params;
        if(!codigo_libro){
            return res.status(400).json({message: "El codigo del libro es obligatorio"})
        }

        const libro = await LibroModel.eliminarLibro(codigo_libro);
        return res.status(200).json({message: "Libro eliminado correctamente", data : libro})

    } catch (error){
        return res.status(400).json({message: "Error al eliminar el libro"})
    }
}

