const jwt = require("jsonwebtoken");
const blacklistmodel = require("../model/blacklist.model");
require("dotenv").config();
const auth = async(req, res, next) => {
  const tokent = req.headers.authorization?.split(" ")[1];
  if (tokent) {

    try {
      const {token}=await blacklistmodel.findById("6486aa5b59aeb2ae81d2a6ca")
      console.log(token.includes(tokent))
      if(!token.includes(tokent)){
        try {
          jwt.verify(tokent, process.env.SECRATE_KEY, (err, decode) => {
            if (decode) {
              next();
            }else{
                res.status(404).send({message:err.message});
            }
          });
        } catch (error) {
          res.status(500).json({ message: error });
        }
      }else{
        res.json({message:"login again"});
        return
      }
    } catch (error) {
      res.status(500).json({ message: error });
    }
  
  } else {

    res.status(500).json({ message: "enter token" });
  }
};


module.exports=auth
