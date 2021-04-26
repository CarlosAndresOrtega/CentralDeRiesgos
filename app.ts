// Carga de variables de entorno en el archivo .env
import dotenv from "dotenv"
import express from "express";
import mongoose from "mongoose";

dotenv.config()
const app = express();

mongoose.connect('mongodb://localhost:27017/api', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, () => {
    console.log("Connected to MongoDB > api");
});

// Configuración de middlewares requeridos para la lectura de peticiones
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Importamos las rutas registradas de la aplicación
import routes from "./api/routes/routes";
app.use(routes);

app.listen(process.env.PORT, () => {
    console.log(`${process.env.APP_NAME} is running at http://localhost:${process.env.PORT} ✅`);
});
