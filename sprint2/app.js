  
const express = require('express');
const app = express()
const path = require('path')
const port = 3030
app.use(express.static('public'))

app.get('/',(req,res)=>res.sendFile(path.join(__dirname,'views','index.html')))
app.get('/productDetail',(req,res)=>res.sendFile(path.join(__dirname,'views','productDetail.html')))
app.get('/productCart',(req,res)=>res.sendFile(path.join(__dirname,'views','productCart.html')))



app.listen(port, () => console.log('Server runing in http://localhost:' + port))