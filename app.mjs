import express from 'express';
import { connectDB } from './src/config/dbConfig.mjs';
import superHeroRoutes from './src/routes/superHeroRoutes.mjs';

const app = express();
const PORT = 3000;

app.use(express.json());

//conexión a mongodb
connectDB();

//configuración de rutas
app.use('/api', superHeroRoutes);

//Manejo de errores para rutas no encontradas
app.use((req, res) => {
  res.status(404).send({ mensaje: "Ruta no encontrada" });
});

//Iniciar servidor
app.listen(PORT, () =>{
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});