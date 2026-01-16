import express from "express";
import trackRouter from "./routes/tracks";
import {errorHandler} from './middlewares/error-handler';

const app = express();

app.use(express.json());
app.use('/tracks', trackRouter);
const port = 4008;

app.use(errorHandler);

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});
