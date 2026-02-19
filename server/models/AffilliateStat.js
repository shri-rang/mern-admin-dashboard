
import mongoose from "mongoose";



const AffilliateStatSchema =  new mongoose.Schema(
    {
    userId : { type: mongoose.Types.ObjectId, ref:"User"},
    affiliateSales: {
        type: [mongoose.Types.ObjectId],
        ref:"Transaction"
    }
    },
    {timestamps : true }

)


const  AffilliateStat = mongoose.model("AffilliateStat", AffilliateStatSchema)

export default AffilliateStat
