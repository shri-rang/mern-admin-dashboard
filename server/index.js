

import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import helmet from 'helmet'
import morgan from 'morgan';
import clientRoutes from './routes/client.js'
import generalRoutes from './routes/general.js'
import managemnetRoutes from './routes/management.js'
import salesRoutes from './routes/sales.js'
import connectDb from './config.js';


// data imports

import User from "./models/User.js"
import Product from "./models/Product.js"
import ProductStat from "./models/ProductStat.js"
import {dataUser, dataProduct, dataProductStat ,dataTransaction, dataOverallStat , dataAffiliateStat } from "./data/index.js"
import Transaction from './models/Transaction.js';
import OverallStat from './models/OverallStat.js';
import AffilliateStat from './models/AffilliateStat.js';


/* Configuration */

dotenv.config();
const app =  express();
app.use(express.json())
app.use(helmet())
app.use(helmet.crossOriginOpenerPolicy({ policy: "same-origin" } ))
app.use(morgan("common"))
app.use(cors())


 const PORT = process.env.PORT || 5001;
connectDb().then( ()=>{

    app.listen( PORT, ()=>{
     console.log("server on:" , PORT) 

  } )

  //  AffilliateStat.insertMany(dataAffiliateStat)
    // Transaction.insertMany(dataTransaction)
  //  Product.insertMany(dataProduct);
  //  ProductStat.insertMany(dataProductStat);
    //  OverallStat.insertMany(dataOverallStat)
  // User.insertMany(dataUser);
} )




//  Routes 

app.use("/client",clientRoutes)
app.use("/general",generalRoutes)
app.use("/management", managemnetRoutes)
app.use("/sales", salesRoutes)



    








