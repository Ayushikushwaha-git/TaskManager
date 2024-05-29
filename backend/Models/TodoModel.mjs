import mongoose from "mongoose";

const todoSchema=new mongoose.Schema({
  id:{
    type:String
  },
  email:{
    type:String,
    
  },
  
 order_data:{
    type:Array,
 }
 
     
   
     
})
const Todo = mongoose.model('Todo', todoSchema);
  
  export default Todo;