import express from 'express';
import mongoose from 'mongoose';
import { Server } from 'socket.io';
import 'dotenv/config';

export const app = express();
const PORT = 8080;

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("BDD conectada"))
  .catch((error) => console.log(`Error en la conexión a MongoDB Atlas: ${error}`));

export const server = app.listen(PORT, () => {
    console.log(`Server on PORT: ${PORT}`);
    console.log(`http://localhost:${PORT}`);
  });

export const io = new Server(server);