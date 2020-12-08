'use strict';

var dbConn = require('./../config/db.config');

//Lien object create

var Lien = function(lien) {
    this.anneeScolaire     = lien.anneeScolaire;
    this.titre      = lien.titre;
    this.url          = lien.url;
    this.emplacement          = lien.emplacement;
    this.created_at     = new Date();
    this.updated_at     = new Date();
};

Lien.create = function (lien, result) {

    dbConn.query("INSERT INTO liens set?", lien, function (err, res){

        if(err){

            console.log("error: ",err);

            result(err, null);
        }
        else{

            console.log(res.insertId);

            result(null, res.insertId);

        }
    });
}


Lien.findById = function (id, result) {
    dbConn.query("Select * from liens where id = ? ", id, function (err, res) {
      if(err) {
        console.log("error: ", err);
        result(err, null);
      }
      else{
        result(null, res);
      }
    });
};
Lien.findAll = function (result) {
    dbConn.query("Select * from liens", function (err, res) {
      if(err) {
        console.log("error: ", err);
        result(null, err);
      }
      else{
        console.log('liens : ', res);
        result(null, res);
      }
    });
};
Lien.findByYear = function (year, result) {
  dbConn.query("Select * from liens, anneeScolaires where liens.anneeScolaire = anneeScolaires.id and anneeScolaires.annee = ? ", year, function (err, res) {
    if(err) {
      console.log("error: ", err);
      result(err, null);
    }
    else{
      result(null, res);
    }
  });
};
Lien.findByTitreAndYear = function (titre, year, result) {
  dbConn.query("Select * from liens, anneeScolaires where liens.titre = ? and liens.anneeScolaire = anneeScolaires.id and anneeScolaires.annee = ?", [titre, year], function (err, res) {
    if(err) {
      console.log("error: ", err);
      result(err, null);
    }
    else{
      result(null, res);
    }
  });
};
Lien.update = function(id, lien, result){
    dbConn.query("UPDATE liens SET anneeScolaire=?,titre=?,url=?,emplacement=? WHERE id = ?", [lien.anneeScolaire,lien.titre,lien.url,lien.emplacement, id], function (err, res) {
      if(err) {
        console.log("error: ", err);
        result(null, err);
      }else{
        result(null, res);
      }
    });
};
Lien.delete = function(id, result){
    dbConn.query("DELETE FROM liens WHERE id = ?", [id], function (err, res) {
      if(err) {
        console.log("error: ", err);
        result(null, err);
      }
      else{
        result(null, res);
      }
    });
};
module.exports= Lien;
