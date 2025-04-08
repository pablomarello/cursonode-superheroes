import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { connectDB } from './src/config/dbConfig.mjs';
import superHeroRoutes from './src/routes/superHeroRoutes.mjs';

// Configuracion de __dirname en ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

//Configuracion del motor de vistas ejs
app.set('view engine', 'ejs');

// Definicion de la carpeta de vistas dentro de src
app.set('views', path.join(__dirname, 'src', 'views'));

app.use(express.json());

// Middleware para parsear los datos del cuerpo (body) de los formularios
app.use(express.urlencoded({ extended: true }));

//ejemplo ejs
/* app.get('/greating', (req,res) => {
  const name = "Carlos";
  res.render('greating', {name});
}); */

//ejemplo intermedio ejs
/* app.get('/products', (req,res) => {
  const products = [
    {name: 'Laptop', price: 1500},
    {name: 'PC', price: 2500},
    {name: 'playstation', price:3000},
  ];
  res.render('products', {products});
}); */

//

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