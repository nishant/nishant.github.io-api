import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();
import weatherRouter from './routes/weather';


const app = express();
const PORT = process.env.PORT || 10000;

const allowedOrigins = [
  'http://localhost:4200',
  'https://nishant.github.io'
];

app.use(cors({
  origin: (origin: any, callback: any) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  }
}));

app.use('/api/weather', weatherRouter);

app.get('/', (req: Request, res: Response) => {
  res.send('Hello, Express with TypeScript!');
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
