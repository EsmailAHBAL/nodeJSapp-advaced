const event = require('events');
const { MongoClient } = require('mongodb');
const { default: mongoose } = require('mongoose')
const { Audit } = require('../Modules/Audit.module');




var emitter =new event.EventEmitter()

emitter.on('audit',(audit)=>
{
    try {
       
      MongoClient.connect("mongodb://localhost:27017/chat",(err,result)=>{

      const db =result.db();
        db.collection('audits').insertOne({
          auditAction :audit.auditAction
          ,data :audit.data
           ,status :audit.status
          , error :audit.error
          ,auditBy : audit.auditBy
          ,auditOn:audit.auditOn
        }).then(x=>{console.log(x);})
      })
    } catch (error) {
       console.log(error);
    }
    
})

exports.prepare =(auditAction , data , error , auditBy , auditOn)=>
{
   let status=error ?500 :200

let au= new Audit (auditAction , data , status , error , auditBy , auditOn)
   emitter.emit('audit',au)


}