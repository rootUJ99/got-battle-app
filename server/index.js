import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';
const app = express();
const port = process.env.PORT || 5000;
const __dirname = new URL(import.meta.url).pathname;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.resolve(__dirname, '..', 'build')));
app.get('/api/hello', (req, res)=> {
  res.send({
      hello: 'world'
  })
});
app.get('*', function(req, res) {
  res.sendFile(path.resolve(__dirname, '..', 'build', 'index.html'));
});
app.listen(port,()=>{
  console.log('server started at '+port);
});
