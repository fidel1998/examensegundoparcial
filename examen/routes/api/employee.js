var express = require('express');
var router = express.Router();

function initEmployee(db) {
  
var fileModel = require('./jsonmodel');
  var empModel = require('./employeeModel')(db);
  var data = null;
  //rutas a implementar
  // metodo     ruta                     body
  /*
      GET       /all +
      GET       /byid/:id +
      GET       /bycompany/:company
      GET       /byagerange/:min/:max
      GET       /bytag/:tag     +
      POST      /addtag/:id     +         tag
      DELETE    /delete/:id     +
      POST      /makeolder               age
   */
  var employee = {
    '_id':'',
    'desc':'',
    'fcIng':null,
    'author':'',
    'due':null,
    'done':false,
    'type': 'small' 
  };

  router.get('/all', function( req, res, next) {
    mongoModel.getEmployees(
      function(err, docs){
        if(err) {
          console.log(err);
          return res.status(500).json({error:"error "});
        }
        return res.status(200).json(docs);
      });
  });
    router.get('/byid/:employeeId', (req, res, next)=>{
      mongoModel.getEmployeesById(req.params.employeeId, (err, doc)=>{
        if(err){
          console.log(err);
          return res.status(500).json({"error":"Error al obtener"});
        }
        return res.status(200).json(doc);
      } );
    }); 

    router.get('/bytags/:tag', (req, res, next)=>{
      mongoModel.getEmployeesByTag((req.params.tag || '').split('_'), (err, docs)=>{
        if(err){
          console.log(err);
          return res.status(500).json({"error":"No se encontro"});
        }else{
          return res.status(200).json(docs);
        }
      } ); //searchByTag
    });
   
    router.put('/addtags/:id', (req, res, next)=>{
      mongoModel.addEmployeeATag((req.body.tags || '').split('|'), req.params.id, (err, rsult)=>{
        if(err){
          console.log(err);
          return res.status(500).json({"error":"No se puede actualizar"});
        }
        return res.status(200).json(rsult);
      });
    });

    router.delete('/delete/:employeeId', function(req, res, next){
      var _employeeId = req.params.employeeId;
      mongoModel.removeEmployee(_employeeId, (err, result)=>{
        if(err){
          return res.status(500).json({"error":"No se pudo eliminar dato"});
        }
        return res.status(200).json(result);
      });
    }); 
 

  
  return router;
}

module.exports = initEmployee;
