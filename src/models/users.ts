const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    firstName:{
        type: String,
        required : true
    },
    lastName : {
        type : String,
        required : true
    },
    mobile : {
        type : Number,
        required : true
    },
    isActive : {
        type : Boolean,
        required : true
    },
    createdAt : {
        type : Number,
        required : true
    }

},{
    timestamps: true
});

const Users = mongoose.model('User', userSchema);

module.exports = Users;