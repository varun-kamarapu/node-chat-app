const express = require('express');
const path = require('path');

const port = process.env.PORT || 3000;

var publicPath = path.join(__dirname,'../public')

var app = express();

app.use(express.static(publicPath));

app.listen(port, () => {
  console.log('The app is upon port ${port}');
})
