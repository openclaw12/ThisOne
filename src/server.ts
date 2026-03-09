import express from 'express';
import { apiRouter } from './routes/api.js';

const app = express();
app.use(express.json({ limit: '10mb' }));

app.get('/health', (_req, res) => res.json({ ok: true }));
app.use('/api', apiRouter);

const port = Number(process.env.PORT ?? 3000);
app.listen(port, () => {
  console.log(`SOC2 API listening on http://localhost:${port}`);
});
