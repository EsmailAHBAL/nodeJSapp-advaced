const { default: mongoose} = require("mongoose");

let UserSchema = mongoose.Schema({

    username: String,
    email: String,
    password: String,
    image: {
        type: String,
        default: ""
    },
    isOnline: {
        type: Boolean,
        default: false
    },
    friends: {

        type: [{
            name: String,
            id: Number,
        }],
        default: []
    },
    sentRequest: {

        type: [{
            name: String,
            id: Number
        }],
        default: []
    }

})
let User = mongoose.model('user',UserSchema)

module.exports=User