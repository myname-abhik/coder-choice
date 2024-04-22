const express  = require('express');
const mongoose = require('mongoose');


const app = express();
require('dotenv').config();
app.use(express.urlencoded({extended:false}));
const PASSWORD = process.env.PASSWORD
const PORT = process.env.PORT


mongoose.connect(`mongodb+srv://abhik16chakrabortty:${PASSWORD}@cluster0.iuakazn.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`)
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
// res.redirect(req.get('origin'));
  res.json({val:"ok"})
  
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`)
});