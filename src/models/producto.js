import mongoose, { Schema } from "mongoose";

const productoSchema = new Schema({
  nombre: String,
  categoria: String,
  urlImg: String,
  precio: Number,
  stock: Number,
  Descripcion: String
})

export default mongoose.model('accesorios', productoSchema);