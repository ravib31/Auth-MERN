const ensureAuthenticated = require("../Middleware/Auth");

const router = require("express").Router();;
// const router = express.Router();

router.get("/",ensureAuthenticated,(req,res)=>{
    console.log("logged In user details----",req.user )
    res.status(200).json([
        {
            price:1000,
            name:"Ravi"
        },
        {
            price:2000,
            name:"Rahul"
        }
    ])
});


module.exports = router;