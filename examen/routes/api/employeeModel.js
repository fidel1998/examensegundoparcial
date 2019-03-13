var ObjectID = require('mongodb').ObjectID;

function employeeModel(db){
  var lib = {};
  var empColl = db.collection('emps');

  lib.getEmployees = (handler)=>{
    empColl.find({}).toArray(
      (err , docs) => {
        if(err){
          handler(err, null);
        }else{
          handler(null, docs);
        }
      }
     );
  }

  lib.getEmployeesById = (id, handler) => {
    empColl.findOne({ "_id": new ObjectId(employeeId)}, (err, doc)=>{
        if(err){
          handler(err, null);
        }else{
          handler(null, doc);
        }
      });
  }

  lib.getEmployeesByCompany = (company, handler) => {
    // implementar
    // solo mostrar name, email, company
    return handler(new Error("No Implementado"), null);
  }

  lib.getEmployeesByAgeRange = (ageLowLimit, ageHighLimit, handler) => {
    //implementar
    // Mostrar todos los documento incluyendo los extremos
    // que esten entre las edades indicadas por los parametros
    // ageLowLimit y ageHighLimit
    // solo mostrar name, age, email
    return handler(new Error("No Implementado"), null);
  }

  lib.getEmployeesByTag = (tag, handler) => {
    var queryObject= {"tags": {"$in": Array.isArray(tags)? tags: [tags]}};
    empColl.find(queryObject).toArray((err, docs) => {
      if(err){
        handler(err, null);
      }else{
        handler(null, docs);
      }
    });
  }

  lib.addEmployeeATag = ( tag, id, handler) => {
    var curatedTags = Array.isArray(tags)? tags: [tags];
    var updateObject = { "$set": { "tags": curatedTags}};
    empColl.updateOne({"_id": ObjectId(id)}, updateObject, (err, rsult)=>{
        if(err){
          handler(err, null);
        }else{
          handler(null, rsult.result);
        }
    } ); 
  }

  lib.removeEmployee = (id, handler) => {
    empCol.deleteOne({"_id": ObjectId(id)}, (err, rslt)=>{
      if(err){
        console.log(err);
        handler(err, null);
      } else {
        handler(null, rslt.result);
      }
    });
  }

  lib.increaseAgeToAll = (ageDelta, handler) => {
    //Implementar
    //Se requiere modificar todos los documentos de la colección
    // incrementando age por la cantidad de ageDelta $inc
    return handler(new Error("No Implementado"), null);
  }
  return lib;
}

module.exports = employeeModel;
