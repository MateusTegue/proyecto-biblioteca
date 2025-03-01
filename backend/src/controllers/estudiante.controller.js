import { EstudianteModel } from "../models/estudiante.model.js";

// registro de estudiantes controllers
export const registrarEstudiante = async (req, res) => {
    try {

        const {nuip_estudiante, nombre_estudiante, apellido_estudiante,direccion_estudiante, telefono_estudiante, email_estudiante } = req.body;
        if (!nuip_estudiante || !nombre_estudiante || !apellido_estudiante || ! direccion_estudiante || !telefono_estudiante || !email_estudiante) {

            return res.status(400).json({ message: "Faltan campos" });

            }
        // verificar si el estudiante existe en la base de datos
        const estudianteExiste = await EstudianteModel.buscarEstudianteNUIP(nuip_estudiante );
        if (estudianteExiste) {
            return res.status(400).json({ message: "El estudiante ya existe" });
            }
        // crear nuevo estudiante
        const nuevoEstudiante = await EstudianteModel.registrarEstudiante(nuip_estudiante, nombre_estudiante, apellido_estudiante,direccion_estudiante, telefono_estudiante , email_estudiante);
        return res.status(201).json({ ok: true, message: "Estudiante creado con éxito", data : nuevoEstudiante });

    } catch (error) {
        console.log(error);
    }
}


// mostar estudiantes registrados 
export const mostrarEstudiantes = async (req, res) => {
    try {
        const estudisntes = await EstudianteModel.mostrarEstudiantes();
        return res.status(200).json(estudisntes );

    } catch (error) {

        return res.status(500).json({ message: "Error al mostrar estudiantes" });
    }
}


// buscar Estudiante por codigo
export const buscarEstudiante = async (req, res) => {
    try {
        const { codigo } = req.params;
        if (!codigo) {
            return res.status(400).json({ message: "Falta el código del estudiante" });
        };
        const estudiante = await EstudianteModel.buscarEstudiante(codigo);

        return res.status(200).json(estudiante);

    } catch (error) {
        return res.status(500).json({ message: "Error al buscar estudiante" });
    }
}

// buscar estudiantes por numero de identificacion personal
export const buscarEstudianteNUIP = async (req, res) => {
    try {

        const { nuip_estudiante } = req.params;

        if (!nuip_estudiante) {
            return res.status(400).json({ message: "Falta el NUIP del estudiante" });
        };

        const estudiante = await EstudianteModel.buscarEstudianteNUIP(nuip_estudiante)
        return res.status(200).json(estudiante);

    } catch (error) {
        
        return res.status(500).json({ message: "Error al buscar estudiante" });
    }
}



// actualizar informacion del estudiante 
export const actualizarEstudiante = async (req, res) => {
    try {
        const { nuip_estudiante, nombre_estudiante, apellido_estudiante, direccion_estudiante, telefono_estudiante, email_estudiante } = req.body;

        if (!nuip_estudiante || !nombre_estudiante || !apellido_estudiante || !direccion_estudiante || !telefono_estudiante || !email_estudiante) {
            return res.status(400).json({ message: "Falta algún campo" });
        }
        const estudiante = await EstudianteModel.actualizarEstudiante(
            nuip_estudiante,
            nombre_estudiante,
            apellido_estudiante,
            direccion_estudiante,
            telefono_estudiante,
            email_estudiante
        );

    
        return res.status(200).json(estudiante);

    } catch (error) {
        
        return res.status(500).json({ message: "Error al actualizar estudiante", error: error.message });
    }
};






// metodo para eliminar estudiantes
export const eliminarEstudiante = async (req, res) => {
    try {
        const { codigo } = req.params;
        if (!codigo) {
            return res.status(400).json({ message: "Falta el código del estudiante"});
        };

        const estudiante = await EstudianteModel.eliminarEstudiante(codigo);
        return res.status(200).json({message: "Estudiante eliminado con éxito"});

    } catch (error) {

        return res.status(500).json({ message: "Error al eliminar estudiante"});
    }

}


