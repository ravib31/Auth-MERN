const mongoose = require("mongoose");

const mongo_url = process.env.DATABASE_URL;
// console.log(mongo_url);
mongoose.connect(mongo_url)
.then(()=>{
    console.log("Database Connected...🥳");
}).catch((err)=>{
    console.log("Database connection error...🤭" , err);
})
//   useCreateIndex: true,
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
