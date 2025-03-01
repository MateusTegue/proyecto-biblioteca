import 'dotenv/config';
import pkg from 'pg';

const { Pool } = pkg;

// Configurar la conexión a PostgreSQL
export const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});

// conexion con la base de datos 
export const conectDB = async () => {
    try {
        const client = await pool.connect();
        console.log('✅ Conectado a la base de datos PostgreSQL');
        client.release(); // Libera la conexión
    } catch (error) {
        console.error('❌ Error al conectar a la base de datos', error);
        process.exit(1);
    }
};
