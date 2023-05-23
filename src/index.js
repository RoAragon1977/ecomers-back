import express from 'express';
import morgan from  'morgan';
import cors from 'cors'

import connect from './db/db';
import productoRoutes from './routers/producto.routes';
import userRouter from './routers/user.routes'

const app = express();
app.use(morgan('start'));
app.use(express.json())
app.use(cors());

app.listen(1000, () => {
  console.log('Escuchando el puero 1000');
});



app.use('/api', productoRoutes);
app.use('/api', userRouter);

connect();