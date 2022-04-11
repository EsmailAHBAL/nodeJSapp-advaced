const express = require("express");
const res = require("express/lib/response");
const {
    addNewUser, Login, getAll_data
} = require("../Controller/User.Controller");
const LoggerSevice = require("../Logger/logger");
const  audit  = require("../Auditing/Audit.Audit");
const { actions_ } = require("../Auditing/Actions.Audit");

 const logger = new LoggerSevice("user.route")
const RouteUser = express.Router()
RouteUser.get('/all',(req,res)=>{

    getAll_data().then(result=>{logger.info('get all data',result)
    audit.prepare(actions_.findUser,result,null,"USERS","ME")
    res.send(result)}).catch(err=>{res.send(err)})
})
RouteUser.post('/add', (req, res) => {

    let {
        username,
        email,
        password,
        image
    } = req.body
   
    addNewUser(username, email, password, image)
        .then(result => {
             
             logger.info('add new User',result)
             
            res.status(200).json(result)
        })
        .catch(err => {
          logger.error('failed add User',err)
            res.send(err)
        })


});
RouteUser.post('/login',(req,res)=>{
    let {email,password}=req.body
    Login(email,password).then(
        (result)=>{
            audit.prepare(actions_.saveUser,result,null,email,"ME")
            req.session.userId=result
            res.send(result)
            console.log(result);     }
    ).catch(err=>{
        res.send(err)
    })
})
module.exports = RouteUser