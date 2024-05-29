import jwt from "jsonwebtoken";
const checkAuth=async(req,res,next)=>{
    
    try{
        const token=req.headers.authorization.split(" ")[1];
        console.log(token)
        const loginData=jwt.verify(token,'ayushitask');
        req.user=loginData.user;
        next();
       }catch(error){
        return res.status(401).json({
            message:"Auth Failed"
        })
       }
}
export default checkAuth;