import express from 'express';
import cors from 'cors';
import usersRouter from './routes/users';

const app = express();

// Konfigurasi CORS agar mengizinkan request dari frontend (http://localhost:3001)
app.use(cors({
  origin: 'http://localhost:3001'
}));

app.use(express.json());
app.use('/api', usersRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server berjalan di port ${PORT}`);
});