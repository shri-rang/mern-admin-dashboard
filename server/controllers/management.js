
import mongoose from "mongoose";
import User from "../models/User.js";
import Transaction from "../models/Transaction.js";
 


export const getAdmins = async (req,res)=>{

   try {

        const admins = await User.find({ role: "admin" }).select("-password");

          res.status(200).json(admins);

   } catch (error) {
    res.status(404).json({message:error.message })
   }    
}

 
export const getUserPerformance = async (req, res) => {

     console.log("in perofmans" );
  try {
    const { id } = req.params;
        console.log("in perofmans", id);
     //   63701cc1f03239b7f700000e
     //   63701cc1f03239b7f700000e   
   const userWithStats = await User.aggregate([
  { $match: { _id: new mongoose.Types.ObjectId(id) } },
  {
    $lookup: {
      from: "transactions",
      let: { userId: "$_id" },
      pipeline: [
        {
          $match: {
            $expr: {
              $eq: ["$userId", { $toString: "$$userId" }]
            }
          }
        }
      ],
      as: "transactions"
    }
  }
]);


    console.log("in perofmans", userWithStats);

    const saleTransactions = await Promise.all(
      userWithStats[0].affiliateStats.affiliateSales.map((id) => {
        return Transaction.findById(id);
      })
    );
    const filteredSaleTransactions = saleTransactions.filter(
      (transaction) => transaction !== null
    );

    res
      .status(200)
      .json({ user: userWithStats[0], sales: filteredSaleTransactions });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};