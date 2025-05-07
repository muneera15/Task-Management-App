const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username : {
        type : String || Number,
        required : true,
        unique : true,
        trim : true,
        lowercase : true,
        minLength : 3
      },
      password : {
        type : String,
        required : true,
        minLength : 6
      },
      firstName : {
       type : String,
       required : true,
       trim : true,
       maxLength : 50
      },
      lastName : {
       type : String,
       required : true,
       trim : true,
       maxLength : 50
      }
},{versionKey: false})

const User = mongoose.model("User",userSchema);

module.exports = User;