import express from 'express';
import morgan from 'morgan';
import  estudianteRouter  from './routes/estudiante.routes.js';
import libroRouter from './routes/libro.routes.js';

const App = express();

// Middlewares
App.use(morgan('dev'));
App.use(express.json()); // Para manejar JSON en las peticiones

App.use(estudianteRouter);
App.use(libroRouter);

export default App;
