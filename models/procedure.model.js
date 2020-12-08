'use strict';

var dbConn = require('./../config/db.config');

//Procedure object create

var Procedure = function(procedure) {
    this.anneeScolaire     = procedure.anneeScolaire;
    this.titre      = procedure.titre;
    this.procedureDetaillee          = procedure.procedureDetaillee;
    this.created_at     = new Date();
    this.updated_at     = new Date();
};

Procedure.create = function (procedure, result) {

    dbConn.query("INSERT INTO procedures set?", procedure, function (err, res){

        if(err){

            console.log("error: ",err);

            result(err, null);
        }
        else{

            console.log(res.insertId);

            result(null, res.insertId);

        }
    });
};


Procedure.findById = function (id, result) {
    dbConn.query("Select * from procedures where id = ? ", id, function (err, res) {
      if(err) {
        console.log("error: ", err);
        result(err, null);
      }
      else{
        result(null, res);
      }
    });
};
Procedure.findAll = function (result) {
    dbConn.query("Select * from procedures", function (err, res) {
      if(err) {
        console.log("error: ", err);
        result(null, err);
      }
      else{
        console.log('procedures : ', res);
        result(null, res);
      }
    });
};
Procedure.findByYear = function (result) {
  dbConn.query("Select * from procedures, anneeScolaires where procedures.anneeScolaire = anneeScolaires.id and anneeScolaires.annee = ? ", year, function (err, res) {
    if(err) {
      console.log("error: ", err);
      result(null, err);
    }
    else{
      console.log('procedures : ', res);
      result(null, res);
    }
  });
};
Procedure.findByTitreAndYear = function (titre, year, result) {
  dbConn.query("Select * from procedures, anneeScolaires where procedures.titre = ? and procedures.anneeScolaire = anneeScolaires.id and anneeScolaires.annee = ?", [titre, year], function (err, res) {
    if(err) {
      console.log("error: ", err);
      result(err, null);
    }
    else{
      result(null, res);
    }
  });
};
Procedure.update = function(id, procedure, result){
  dbConn.query("UPDATE procedures SET anneeScolaire=?,titre=?,procedureDetaillee=? WHERE id = ?", [procedure.anneeScolaire,procedure.titre,procedure.procedureDetaillee, id], function (err, res) {
      if(err) {
        console.log("error: ", err);
        result(null, err);
      }else{
        result(null, res);
      }
  });
};
Procedure.delete = function(id, result){
    dbConn.query("DELETE FROM procedures WHERE id = ?", [id], function (err, res) {
      if(err) {
        console.log("error: ", err);
        result(null, err);
      }
      else{
        result(null, res);
      }
    });
};
module.exports= Procedure;
