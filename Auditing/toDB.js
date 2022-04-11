const { default: mongoose } = require("mongoose");
let auditSchema=mongoose.Schema({
    
    auditAction :String
    ,data :String
     ,status :Number
    , error :String
    ,auditBy : String
    ,auditOn:String
 
});

let AuditDB =mongoose.model('audit',auditSchema)
exports.auditToDb=async(auditAction , data , status , error , auditBy , auditOn)=>{
  return new Promise ((reject,resolve)=>{

    mongoose.connect("mongodb://localhost:27017/chat").then(()=>{
    let auditN = new AuditDB ({
      auditAction :auditAction
      ,data :data
       ,status :status
      , error :error
      ,auditBy : auditBy
      ,auditOn:auditOn
   
    })

    return auditN.save
 }).then(result=>resolve(result)).catch(err=>{
 reject(err)
    })

  });
 
}