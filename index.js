import express from 'express';
import countryRouter from './routes/countryRouter.js';
const app = express();
const PORT = 8000;

app.use(express.json()); // body-parser for POST request w/ JSON
app.use(express.urlencoded({ extended: true })); // to handle form submissions
app.set('view engine', 'ejs');

//ROUTES
app.use('/api/countries', countryRouter);

app.listen(PORT, () => console.log(`Server is running on port: ${PORT}`));
