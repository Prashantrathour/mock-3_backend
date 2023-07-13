const mongoose=require('mongoose');

const blacklistschema=mongoose.Schema({
    token:[String]
},{versionKey:false})
const blacklistmodel=mongoose.model("blacklist",blacklistschema)

module.exports=blacklistmodel