const bcrypt = require("bcrypt");
const UserModel = require("../Models/User");
const jwt = require("jsonwebtoken");


const signup = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const user = await UserModel.findOne({ email });

        if (user) {
            return res.status(400).json({ message: "User already exists, you can login", success: false });
        }

        // Create a new instance of UserModel
        const userModel = new UserModel({ name, email, password });

        // Hash the password before saving
        userModel.password = await bcrypt.hash(password, 10);

        // Save the user to the database
        await userModel.save();

        res.status(201).json({
            message: "Signup Successfully",
            success: true,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error", success: false });
    }
};



const login = async (req, res) => {
    try {
        const {  email, password } = req.body;
        const user = await UserModel.findOne({ email });
        const errorMessage = "Invalid email or password";

        if (!user) {
            return res.status(403).json({ message: errorMessage, success: false });
        }

       const comparePassword = await bcrypt.compare(password, user.password);
       if(!comparePassword){
        return res.status(403).json({ message: errorMessage, success: false });
       }
        const jwtToken = jwt.sign({ email:user.email,_id: user._id }, process.env.JWT_SECRET_KEY,{expiresIn:"24h"});
        res.status(200).json({
            message: "Login Successfully",
            jwtToken,
            email,
            name: user.name,
            success: true,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error", success: false });
    }
};
module.exports = { signup,login };
