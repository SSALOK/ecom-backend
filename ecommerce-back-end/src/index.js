const express =require('express');
const env = require('dotenv');
const app = express();
const bodyParser= require('body-parser');
const mongoose = require('mongoose');

// routes
const userRoutes = require('./routes/user');
// environment variables
env.config();
// mondoDB connection
//mongodb+srv://user_alok:<password>@cluster0.abtta.mongodb.net/<dbname>?retryWrites=true&w=majority
//mongodb://user_alok:<password>@cluster0-shard-00-00.abtta.mongodb.net:27017,cluster0-shard-00-01.abtta.mongodb.net:27017,cluster0-shard-00-02.abtta.mongodb.net:27017/<dbname>?ssl=true&replicaSet=atlas-ht20ie-shard-0&authSource=admin&retryWrites=true&w=majority
mongoose.connect(
    `mongodb://${process.env.MONGO_DB_USER}:${process.env.MONGO_DB_PASS}@cluster0-shard-00-00.abtta.mongodb.net:27017,cluster0-shard-00-01.abtta.mongodb.net:27017,cluster0-shard-00-02.abtta.mongodb.net:27017/${process.env.MONGO_DB_DATABASE}?ssl=true&replicaSet=atlas-ht20ie-shard-0&authSource=admin&retryWrites=true&w=majority`,
    // `mongodb+srv://${process.env.MONGO_DB_USER}:${process.env.MONGO_DB_PASS}@cluster0.abtta.mongodb.net/${process.env.MONGO_DB_DATABASE}?retryWrites=true&w=majority&ssl=true`, 
    {
        useNewUrlParser: true, 
        useUnifiedTopology: true,
        useCreateIndex:true,
    }
).then(()=>{
    console.log("database connected");
})
.catch((err)=>{
    console.log("database not connected",  err);
});
app.use(bodyParser());
app.use('/api',userRoutes);
app.listen(process.env.PORT, ()=>{
    console.log(`server is running on port ${process.env.PORT}`);
})