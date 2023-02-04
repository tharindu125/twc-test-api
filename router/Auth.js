const { Router } = require("express");
const userModel = require("../models/User");
const jwt = require("jsonwebtoken")

const authRouter = Router();

authRouter.post("/", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.login(email, password);
    // //create jwt token
    const token = jwt.sign({user},process.env.JWT_SECRET,{expiresIn:'1h'})
    res.cookie('jwt',token)
    res.sendStatus(200)
  } catch (error) {
    res.status(400).json({error:error.message})
  }
});

module.exports = authRouter;
