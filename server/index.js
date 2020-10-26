import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import mongoose from 'mongoose';
import cors from 'cors';
import routes from './routes.js';
const app = express();
const port = process.env.PORT || 5000;
const __dirname = new URL(import.meta.url).pathname;

const dataBaseURI = 'mongodb+srv://root:toor@cluster0.poaii.mongodb.net/got?retryWrites=true&w=majority';

mongoose.connect(dataBaseURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(()=>{
  console.log('database has been connected');
  app.listen(port,()=>{
    console.log('server started at '+port);
  });
}).catch(err=> {
  console.log(err);
});


app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.get('/api/hello', (req, res)=> {
  res.send({
    hello: 'world'
  })
});
app.use('/api', routes);

if (process.env.NODE_ENV === 'production'){
  app.use(express.static(path.resolve(__dirname, '..', 'build')));
  app.get('*', function(req, res) {
    res.sendFile(path.resolve(__dirname, '..', 'build', 'index.html'));
  });
}

