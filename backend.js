const express  = require('express');
const mongoose = require('mongoose');


const app = express();
require('dotenv').config();
app.use(express.urlencoded({extended:false}));
const PASSWORD = process.env.PASSWORD
const PORT = process.env.PORT


mongoose.connect(`mongodb+srv://vercel-admin-user-6626e052f8bd661241c01cd1:DN2gDMPUcKmw00ni@cluster0.iuakazn.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`)
.then(()=>{
    console.log('Connected to MongoDB');
  })
  .catch((err)=>{  
    console.log('Error connecting to MongoDB',err);
  })

const useSchema = new mongoose.Schema({
    email:{
        type: String,
        required: true
    }},{timestamps: true});
const Email = mongoose.model('Email',useSchema);
app.get('/',(req, res) => {
    res.send("hello world");
})
app.post('/api/v1/subscribers', async(req, res) => {
  const {email} = req.body;
   await Email.create({
    email:email
   
});

  console.log(email);
res.redirect(req.get('origin'));
  res.json({val:"ok"})
  
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`)
});