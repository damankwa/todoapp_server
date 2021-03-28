const express = require('express');
const testroute = require('./routes/testroute');
const bodyParser= require('body-parser');
const app = express();
const port = 3000;


app.use(express.static('public'));
app.use('/testroute', testroute);


app.get('/index.htm', function (req, res) {
   res.sendFile( __dirname + "/" + "index.htm" );
})




app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})