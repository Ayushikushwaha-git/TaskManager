import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import bodyParser from 'body-parser';
import morgan  from 'morgan';
import jwt from 'jsonwebtoken'
import User from './Models/UserModel.mjs';

//import checkAuth from './checkAuth.mjs';
import Todo from './Models/todoModel.mjs';


 const app=express();
 const PORT=8000;
 const DB="mongodb+srv://kayushi157:sXk8YYwTDD0E4E8f@cluster0.rkym0oz.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";


 mongoose.connect(DB).then(()=>{
console.log("connection success")
 })
 app.use(cors()); 
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(express.static('uploads'))
bodyParser.json({extended:true});

 app.use((req,res,next)=>{
    res.setHeader("Access-Control-Allow-Origin","http://localhost:3000");
    res.header(
       "Access-Control-Allow-Headers",
       "Origin, X-Requested-With, Content-type, Accept"
     );
     res.header('Access-Control-Allow-Methods', 'OPTIONS, POST, GET, PUT, DELETE');
    next();
 })

 app.options('*', (req, res) => {
    res.status(200).end();
  });
 
 app.set("view engine","ejs");
 
 app.post('/sign', async function(req,res){
   console.log(req.body);
   let create=await User.create({
      email:req.body.email,
      password:req.body.password,
     

   })
  
   
   
create.password=undefined
res.status(201).json(create);
  
});

 
 


  
app.post('/login', async function(req,res){
   let email=req.body.email;
  
   try{
      let existUser=await User.findOne({email});
      if(existUser==null){
         res.status(404).send("That user does not exist")
      }
      if(req.body.password!=existUser.password){
         res.status(404).send("Incorrect Password")
      }
      if (existUser.isNew) {
         existUser.isNew = false;
      await existUser.save();
     }
 
      const data={
         user:{
           id: existUser._id,
          
      }
   }
   const token=jwt.sign(data,'ayushitask',{
         expiresIn:"5d",
      }
   );
   
   return res.json({
      success:true,
      token:token,
      user:existUser._id,
     
   });
  

}catch(e){
      console.log(e);
   }
   
   
      
  
});
app.get('/getData',async function(req,res){
   const my= await Products.find({});
   //console.log(my)
   res.send({status:"ok",data:my});
   
})
app.post('/orderData',async(req,res)=>{
    const { email, order_data } = req.body;
    let user = await Todo.findOne({ email });
 if(user==null){
    try{
       await Todo.create({
          email:req.body.email,
          order_data:[data]
       }).then(()=>{
          res.json({success:true})
 
       })
 
    }catch(error){
       console.log(error.message)
       res.status(500).send("Server error: " + error.message);
    }
   }else{
    try{
       await Todo.findOneAndUpdate({email:req.body.email},
          {
             $push:{order_data:data}
          }).then(()=>{
             res.json({success:true})
          })
 
    }catch(error){
       res.send("Server error",error.message);
    }
   }
 })

 app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });