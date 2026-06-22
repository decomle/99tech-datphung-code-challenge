import express from 'express';
import todoRoutes from './routes/todo.routes';
import { errorHandler } from './middleware/error.middleware';

const app = express();
app.use(express.json());

app.use('/todos', todoRoutes);

app.use(errorHandler);

export default app;
