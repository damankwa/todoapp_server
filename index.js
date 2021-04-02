const express = require('express');
const testroute = require('./routes/testroute');
const todoroute = require('./routes/todoroute');
const bodyParser= require('body-parser');
const cors = require('cors')
const app = express();
const port = 3000;

app.use(cors());
app.use(express.static('public'));
app.use('/testroute', testroute);
app.use('/todos', todoroute);

app.get('/index.htm', function (req, res) {
   res.sendFile( __dirname + "/" + "index.htm" );
})




app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})