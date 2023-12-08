import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import path from 'path';
import postRoutes from './routes/posts.js';
import userRouter from "./routes/user.js";
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

app.use(express.json({limit: '50mb', extended: true }));
app.use(express.urlencoded({limit: '50mb',extended: true }));
app.use(cors());


app.use(express.static(path.join(__dirname,'..', 'client', 'build')));

app.use('/api/posts', postRoutes);
app.use("/api/user", userRouter);

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname,'..', 'client', 'build', 'index.html'));
});

app.get('/', (req, res) => {
  res.send('Hello from the MERN app!');
});

const CONNECTION_URL = 'mongodb+srv://ahmad:ahmad@cluster0.uyamd3v.mongodb.net/?retryWrites=true&w=majority';
const PORT = process.env.PORT || 3001;

mongoose.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => app.listen(PORT, () => console.log(`Server Running on Port: http://localhost:${PORT}`)))
  .catch((error) => console.log(`${error} did not connect`));

mongoose.set('useFindAndModify', false);
