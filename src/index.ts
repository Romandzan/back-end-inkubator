import express from "express";

import trackRouter from "./routes/tracks";

const app = express();

app.use(express.json());
app.use('/track', trackRouter);
const port = 4008;

app.get('/', (req, res) => {
    res.send("Hello Roman Paleha");

});
import {errorHandler} from './middlewares/error-handler';
app.use(errorHandler);
app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});
