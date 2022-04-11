const express = require('express')
const dotenv = require('dotenv')
const bodyParser=require('body-parser')
const cors = require('cors')
const session = require('express-session')
const RouteUser = require('./Route/User.Route')
const StoreSession = require('connect-mongodb-session')(session)
const app = express()
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

//___________________________________________________________________________
dotenv.config()
let STORE = new StoreSession({
    uri:"mongodb://localhost:27017/chat",
    collection:'sessions'
})
app.use(session({
    secret:"hsh8755-_''jhh",
    saveUninitialized:false,
    store:STORE
    
}))
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))
const port = process.env.PORT
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))
 app.use('/user',RouteUser)

app.listen(port, () => console.log(`Example app listening on port ${port}!`))

module.exports=app;