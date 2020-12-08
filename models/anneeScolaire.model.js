'use strict';

var dbConn = require('./../config/db.config');

//AnneeScolaire object create

var AnneeScolaire = function(anneeScolaire) {
    this.annee = anneeScolaire.annee;
    this.debut     = anneeScolaire.debut;
    this.fin      = anneeScolaire.fin;
    this.typesDeStages          = anneeScolaire.typesDeStages;
    this.dureeMinStage          = anneeScolaire.dureeMinStage;
    this.dureeMaxStage   = anneeScolaire.dureeMaxStage;
    this.dateDebutMinStage    = anneeScolaire.dateDebutMinStage;
    this.dateDebutMaxStage         = anneeScolaire.dateDebutMaxStage;
    this.dateFinMinStage    = anneeScolaire.dateFinMinStage;
    this.dateFinMaxStage         = anneeScolaire.dateFinMaxStage;
    this.responsableStage         = anneeScolaire.responsableStage;
    this.signataireConvention         = anneeScolaire.signataireConvention;

    this.dateRapport = anneeScolaire.dateRapport;
    this.placeRapport = anneeScolaire.placeRapport;

    this.created_at     = new Date();
    this.updated_at     = new Date();
};

AnneeScolaire.create = function (anneeScolaire, result) {

    dbConn.query("INSERT INTO anneeScolaires set?", anneeScolaire, function (err, res){

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


AnneeScolaire.findById = function (id, result) {
    dbConn.query("Select * from anneeScolaires where id = ? ", id, function (err, res) {
        if(err) {
          console.log("error: ", err);
          result(err, null);
        }
        else{
          result(null, res);
        }
    });
};
AnneeScolaire.findAll = function (result) {
    dbConn.query("Select * from anneeScolaires", function (err, res) {
        if(err) {
          console.log("error: ", err);
          result(null, err);
        }
        else{
          console.log('annees scolaires : ', res);
          result(null, res);
        }
    });
};
AnneeScolaire.findByYear = function (year, result) {
  dbConn.query("Select * from anneeScolaires where annee = ? ", year, function (err, res) {
    if(err) {
      console.log("error: ", err);
      result(err, null);
    }
    else{
      result(null, res);
    }
  });
};
AnneeScolaire.update = function(id, anneeScolaire, result){
    dbConn.query("UPDATE anneeScolaires SET debut=?,fin=?,typesDeStages=?,dureeMinStage=?,dureeMaxStage=?,dateDebutMinStage=?,dateDebutMaxStage=?,dateFinMinStage=?,dateFinMaxStage=?,responsableStage=?,signataireConvention=?, dateRapport=?, placeRapport=? WHERE id = ?", [anneeScolaire.debut,anneeScolaire.fin,anneeScolaire.typesDeStages,anneeScolaire.dureeMinStage,anneeScolaire.dureeMaxStage,anneeScolaire.dateDebutMinStage,anneeScolaire.dateDebutMaxStage,anneeScolaire.dateFinMinStage,anneeScolaire.dateFinMaxStage,anneeScolaire.responsableStage,anneeScolaire.signataireConvention,anneeScolaire.dateRapport,anneeScolaire.placeRapport,id], function (err, res) {
        if(err) {
          console.log("error: ", err);
          result(null, err);
        }else{
          result(null, res);
        }
    });
};
AnneeScolaire.delete = function(id, result){
    dbConn.query("DELETE FROM anneeScolaires WHERE id = ?", [id], function (err, res) {
        if(err) {
          console.log("error: ", err);
          result(null, err);
        }
        else{
          result(null, res);
        }
    });
};

module.exports= AnneeScolaire;
