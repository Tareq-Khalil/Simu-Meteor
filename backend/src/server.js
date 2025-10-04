import express from 'express';
import nasaRoutes from './routes/nasa.js';
import "dotenv/config";
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use('/api', nasaRoutes);

app.use((err, req, res, next) => {
  console.error(err.stack || err);
  res.status(500).json({ error: 'An unexpected error occurred.' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});