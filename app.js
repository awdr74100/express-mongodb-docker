import express from 'express';
import morgan from 'morgan';
import cors from 'cors';

const app = express();
const port = process.env.PORT || 3000;

app.use(morgan('dev'));
app.use(cors({ credentials: true, origin: true }));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get('/', (req, res) => {
  res.send(process.env.NODE_ENV);
});

app.listen(port, () => console.log(`start localhost ${port}`));
