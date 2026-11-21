import express from 'express';
import { cardsRouter } from "./routes/cards.routed.ts";
export const app = express();

app.use(express.json());
app.use(cardsRouter);