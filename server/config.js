 import mongoose from "mongoose"



  const connectDb = async()=>{
       
     try {


         await mongoose.connect(process.env.MONGO_URI,
            {
               //  useNewUrlParser:true,
               //  useUnifiedTopology: true
            }
         )


          console.log('Connected to database successfully');  

     } catch (error) {
        
     }


  }



  export default connectDb 