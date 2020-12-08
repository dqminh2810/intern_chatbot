/*
'use strict';
const Procedure = require('../../models/procedure.model');
const Utils = require('./utils');

exports.crudForm = function(req, res) {
    res.render('/src/views/procedure.html');
};
*/
/*
exports.findAll = function(req, res) {
Procedure.findAll(function(err, procedure) {
  console.log('controller')
  if (err)
  res.send(err);
  console.log('res', procedure);
  res.send(procedure);
});
};
exports.create = function(req, res) {
const new_procedure = new Procedure(req.body);
//handles null error
if(req.body.constructor === Object && Object.keys(req.body).length === 0){
  res.status(400).send({ error:true, message: 'Please provide all required field' });
}else{
Procedure.create(new_procedure, function(err, procedure) {
  if (err)
  res.send(err);
  res.json({error:false,message:"Procedure added successfully!",data:procedure});
});
}
};
exports.findById = function(req, res) {
Procedure.findById(req.params.id, function(err, procedure) {
  if (err)
  res.send(err);
  res.json(procedure);
});
};
exports.update = function(req, res) {
  if(req.body.constructor === Object && Object.keys(req.body).length === 0){
    res.status(400).send({ error:true, message: 'Please provide all required field' });
  }else{
    Procedure.update(req.params.id, new Procedure(req.body), function(err, procedure) {
   if (err)
   res.send(err);
   res.json({ error:false, message: 'Procedure successfully updated' });
});
}
};
exports.delete = function(req, res) {
Procedure.delete( req.params.id, function(err, procedure) {
  if (err)
  res.send(err);
  res.json({ error:false, message: 'Procedure successfully deleted' });
});
};
*/


/* TEST GETTING attribute's model */
/*
exports.getTestById = function(id, res) {
  Procedure.findById(id, function(err, procedure) {
    if (err)
      res.send(err);
    console.log(procedure);
    console.log(procedure[0].procedureDetaillee);
    res.json(procedure[0].procedureDetaillee);
  });
};

exports.getTestByYear = function(year, res) {
  Procedure.findByYear(year, function(err, procedure) {
    if (err)
      res.send(err);
    console.log(procedure);
    console.log(procedure[0].procedureDetaillee);
    res.json(procedure[0].procedureDetaillee);
  });
};

exports.getTestByTitreAndYear = function(titre, year, res) {
  Procedure.findByTitreAndYear(titre, year, function(err, procedure) {
    if (err)
      res.send(err);
    console.log(procedure);
    console.log(procedure[0].titre);
    res.json(procedure[0].titre);
  });
};
*/
/* TEST UPDATE attribute's model */
/*
exports.updateTest = function(id, res) {
  Procedure.findById(id, function(err, procedure) {
    if (err)
      res.send(err);
    console.log(procedure);
    procedure[0].titre = 'test2';
    //anneeScolaire[0].responsableStage = 'test2';
    //anneeScolaire[0].signataireConvention = 'test2';
    Procedure.update(id, new Procedure(procedure[0]), function(err, tmp) {
      if (err)
        res.send(err);
      res.json({ error:false, message: 'Procedure successfully updated' });
    });

  });
};
*/
/* TEST CREATE entity model */
/*
exports.createTest = function(req, res) {
  const tmp = {
    anneeScolaire: 1,
    titre: 'convention-procedure',
    procedureDetaillee: 'test-convention-procedure',
  };

  const new_procedure = new Procedure(tmp);

  Procedure.create(new_procedure, function(err, procedure) {
    if (err)
      res.send(err);
//   res.redirect('/procedure/')
    res.json({error:false,message:"Procedure added successfully!",data:procedure});
  });
};
*/

/* CHAT BOT STAGE */
/*
exports.getConventionProcedure = function(titre, year, res) {
  Procedure.findByTitreAndYear(titre, year, function(err, procedure) {
    let defaultRes = "get convention process default";
    let textRes = "Convention process:  " + procedure[0].procedureDetaillee;
    let responseObj = Utils.getFulfillmentResponseFormat(defaultRes, textRes);
    res.status(200).json(responseObj)
  });
};
*/



/* CHAT BOT SURVEY */
/* GETTER */
/*
exports.getConventionProcedure = function(titre, year, res) {
  Procedure.findByTitreAndYear(titre, year, function(err, procedure) {
    let defaultRes = "get convention process default";
    let textRes = "Convention process:  " + procedure[0].procedureDetaillee + " - Would you like to modify?";
    let responseObj = Utils.getFulfillmentResponseFormat(defaultRes, textRes);
    res.status(200).json(responseObj)
  });
};
*/
/* SETTER */
/*
exports.modifyConventionProcedure = function(titre, year, req, res) {
  Procedure.findByTitreAndYear(titre, year, function(err, procedure) {
    if (err)
      res.send(err);
    console.log(procedure);
    procedure[0].procedureDetaillee = req.body.queryResult.parameters.conventionURL;
    Procedure.update(procedure[0].id, new Procedure(procedure[0]), function(err, tmp) {
      if (err)
        res.send(err);
      let defaultRes = "modify convention process default";
      let textRes = "Convention process modified:  "+ procedure[0].procedureDetaillee;
      let responseObj = Utils.getFulfillmentResponseFormat(defaultRes, textRes);
      res.status(200).json(responseObj)
    });
  });
};
*/
