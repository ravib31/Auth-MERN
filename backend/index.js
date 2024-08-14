const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const AuthRouter = require("./Routes/AuthRouter");
const ProductRouter = require("./Routes/ProductRouter");

require("dotenv").config();
require("./Database/db");



const PORT = process.env.PORT || 3000;

app.get("/ravi",(req,res)=>{
    res.send("Hello Ravi");
})

app.use(bodyParser.json());
app.use(cors({ origin: '*' }));
app.use(cors({
  origin: 'http://localhost:3001'
}));
app.use("/auth",AuthRouter)
app.use("/products",ProductRouter)


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});