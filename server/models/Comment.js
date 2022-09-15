const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const postSchema = new Schema({
  body : {type: String, required: true},
  user : {type : Schema.Types.ObjectId, ref: 'User', required: true},
  post : [ type : Schema.Types.ObjectId, ref: 'Post', required: true },
            
  
  
  
    
});




module.exports = mongoose.model("Comment", postSchema);