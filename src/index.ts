import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
dotenv.config();
import weatherRouter from './routes/weather';


const app = express();
const PORT = process.env.PORT || 3000;

app.use('/api/weather', weatherRouter);

app.get('/', (req: Request, res: Response) => {
  res.send('Hello, Express with TypeScript!');
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
