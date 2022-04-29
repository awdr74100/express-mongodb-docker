import express from 'express';
import morgan from 'morgan';
import cors from 'cors';

import mongooseConnect from './connections/mongoose.connect';

import routes from './routes/index';

const app = express();
const port = process.env.PORT || 3000;

mongooseConnect();

app.use(morgan('dev'));
app.use(cors({ credentials: true, origin: true }));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use('/api', routes);

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
