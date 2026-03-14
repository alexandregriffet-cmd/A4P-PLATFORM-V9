import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import billingRouter from './routes/billing.js';
import onboardingRouter from './routes/onboarding.js';
import analysisRouter from './routes/analysis.js';

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

app.get('/api/health', (_req,res)=>res.json({ok:true, app:'A4P V9 backend'}));
app.use('/api/billing', billingRouter);
app.use('/api/onboarding', onboardingRouter);
app.use('/api/analysis', analysisRouter);

const port = process.env.PORT || 8787;
app.listen(port, ()=>console.log(`A4P backend listening on http://localhost:${port}`));
