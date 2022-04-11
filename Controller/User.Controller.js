const {
    default: mongoose
} = require("mongoose")

const dotenv = require('dotenv')
const User = require("../Modules/User.Module")
const bcrypt = require('bcrypt')
const {
    reject
} = require("bcrypt/promises")

dotenv.config()
const url = process.env.DB_URl
exports.getAll_data = async () => {

    return new Promise((resolve, reject) => {

        mongoose.connect(url).then(() => {
                return User.find({})
            })
            .then(users => {

                if (users.length==0) reject('DB is Empty')
                resolve(users)
            }).catch(err => {
                reject(err)
            })
    });
}
exports.Login = async (email, password) => {
    return new Promise((resolve, reject) => {
        let idUser
        mongoose.connect(url).then(() => {
                return User.findOne({
                    email: email
                })

            })
            .then(user => {
                if (!user) reject("doesn't Exist")
                else {
                    idUser = user._id
                    return bcrypt.compare(password, user.password)
                }
            }).then(match => {
                if (!match) reject('password Incorrect')
                else resolve(idUser)

            }).catch(err => {
                reject(err)
            })
    })
}
exports.addNewUser = async (username, email, password, image) => {



    return new Promise((resolve, reject) => {
        mongoose.connect("mongodb://localhost:27017/chat").then(() => {
                return User.findOne({
                    email: email
                })
            })
            .then(user => {
                

            
                if(user) {
                    
                    reject('Already Exist') 
                     mongoose.disconnect()
                  }
                else {
                    return bcrypt.hashSync(password, 10)
                }
            }).then(passwordHashed => {

                let u = new User({

                    username: username,
                    email: email,
                    password: passwordHashed,
                    image: image


                })
                return u.save()
            }).then(result => {

                resolve(result)
            }).catch(err => {

                reject(err)
            })
    });
}