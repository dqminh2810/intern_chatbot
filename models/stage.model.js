'use strict';

var dbConn = require('./../config/db.config');


var Stage = function(stage) {
  this.anneeScolaire         = stage.anneeScolaire;
  this.debut = stage.debut;
  this.fin = stage.fin;
  this.typesDeStages = stage.typesDeStages;
  this.dureeMinStage     = stage.dureeMinStage;
  this.dureeMaxStage      = stage.dureeMaxStage;
  this.dateDebutMinStage          = stage.dateDebutMinStage;
  this.dateDebutMaxStage          = stage.dateDebutMaxStage;
  this.dateFinMinStage    = stage.dateFinMinStage;
  this.dateFinMaxStage         = stage.dateFinMaxStage;
  this.dateRenduRapportStage         = stage.dateRenduRapportStage;
  this.dateRenduRapportIntermediaireStage = stage.dateRenduRapportIntermediaireStage;
  this.consigneRapport = stage.consigneRapport;
  this.emplacementRenduRapport = stage.emplacementRenduRapport;
  this.emplacementRenduRapportIntermediaire = stage.emplacementRenduRapportIntermediaire;
  this.lienSlidePresentationStage     = stage.lienSlidePresentationStage;
  this.procedureSignatureConvention      = stage.procedureSignatureConvention;
  this.procedureValidationSujetStage          = stage.procedureValidationSujetStage;
  this.actionsAfaireAlaFinDuStage          = stage.actionsAfaireAlaFinDuStage;
  this.rdvPourSignatureConvention   = stage.rdvPourSignatureConvention;
  this.coupureStage    = stage.coupureStage;
  this.stageDansUnLaboratoire         = stage.stageDansUnLaboratoire;
  this.numeroArenseignerPourLesConventions    = stage.numeroArenseignerPourLesConventions;
  this.stageEtConvention         = stage.stageEtConvention;
  this.validationStageParCDD         = stage.validationStageParCDD;
  this.contactLorsqueLeStageSePasseMal         = stage.contactLorsqueLeStageSePasseMal;
  this.stageEtProjetPersonnel = stage.stageEtProjetPersonnel;
  this.stageEtFreelance = stage.stageEtFreelance;
  this.stageEtTeletravail = stage.stageEtTeletravail;
  this.stageEtMineure = stage.stageEtMineure;
  this.stageNonInformatique = stage.stageNonInformatique;
  this.soutenance = stage.soutenance;

  this.responsableStage         = stage.responsableStage;
  this.signataireConvention         = stage.signataireConvention;

  this.created_at     = new Date();
  this.updated_at     = new Date();
};

Stage.create = function (stage, result) {

  dbConn.query("INSERT INTO stages set?", stage, function (err, res){

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


Stage.findById = function (id, result) {
  dbConn.query("Select * from stages where id = ? ", id, function (err, res) {
    if(err) {
      console.log("error: ", err);
      result(err, null);
    }
    else{
      result(null, res);
    }
  });
};
Stage.findAll = function (result) {
  dbConn.query("Select * from stages", function (err, res) {
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
Stage.findByYear = function (year, result) {
  dbConn.query("Select * from stages where stages.fin = ?", year, function (err, res) {
    if(err) {
      console.log("error: ", err);
      result(err, null);
    }
    else{
      result(null, res);
    }
  });
};

//A revoir
Stage.update = function(id, stage, result){
  dbConn.query("UPDATE stages SET " +
    "anneeScolaire=?," +
    "debut=?," +
    "fin=?," +
    "typesDeStages=?," +
    "dureeMinStage=?," +
    "dureeMaxStage=?," +
    "dateDebutMinStage=?," +
    "dateDebutMaxStage=?," +
    "dateFinMinStage=?," +
    "dateFinMaxStage=?," +
    "responsableStage=?," +
    "signataireConvention=?,  " +

    "dateRenduRapportStage=?," +
    "dateRenduRapportIntermediaireStage =?," +
    "consigneRapport =?," +
    "emplacementRenduRapport =?," +
    "emplacementRenduRapportIntermediaire =?," +
    "lienSlidePresentationStage     =?," +
    "procedureSignatureConvention      =?," +
    "procedureValidationSujetStage          =?," +
    "actionsAfaireAlaFinDuStage          =?," +
    "rdvPourSignatureConvention   =?," +
    "coupureStage    =?," +
    "stageDansUnLaboratoire        =?," +
    "numeroArenseignerPourLesConventions    =?," +
    "stageEtConvention         =?," +
    "validationStageParCDD         =?," +
    "contactLorsqueLeStageSePasseMal         =?," +
    "stageEtProjetPersonnel =?," +
    "stageEtFreelance =?," +
    "stageEtTeletravail =?," +
    "stageEtMineure =?," +
    "stageNonInformatique =?," +
    "soutenance =?" +

    "WHERE id = ?",
    [
      stage.anneeScolaire,
      stage.debut,
      stage.fin,
      stage.typesDeStages,
      stage.dureeMinStage,
      stage.dureeMaxStage,
      stage.dateDebutMinStage,
      stage.dateDebutMaxStage,
      stage.dateFinMinStage,
      stage.dateFinMaxStage,
      stage.responsableStage,
      stage.signataireConvention,

      stage.dateRenduRapportStage,
      stage.dateRenduRapportIntermediaireStage,
      stage.consigneRapport,
      stage.emplacementRenduRapport,
      stage.emplacementRenduRapportIntermediaire,
      stage.lienSlidePresentationStage,
      stage.procedureSignatureConvention,
      stage.procedureValidationSujetStage,
      stage.actionsAfaireAlaFinDuStage,
      stage.rdvPourSignatureConvention,
      stage.coupureStage,
      stage.stageDansUnLaboratoire,
      stage.numeroArenseignerPourLesConventions,
      stage.stageEtConvention,
      stage.validationStageParCDD,
      stage.contactLorsqueLeStageSePasseMal,
      stage.stageEtProjetPersonnel,
      stage.stageEtFreelance,
      stage.stageEtTeletravail,
      stage.stageEtMineure,
      stage.stageNonInformatique,
      stage.soutenance,

      id],
    function (err, res) {
    if(err) {
      console.log("error: ", err);
      result(null, err);
    }else{
      result(null, res);
    }
  });
};
Stage.delete = function(id, result){
  dbConn.query("DELETE FROM stages WHERE id = ?", [id], function (err, res) {
    if(err) {
      console.log("error: ", err);
      result(null, err);
    }
    else{
      result(null, res);
    }
  });
};

module.exports= Stage;
