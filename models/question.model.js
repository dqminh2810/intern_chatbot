'use strict';

var dbConn = require('./../config/db.config');

//Question object create

var Question = function(question) {
    this.anneeScolaire     = question.anneeScolaire;
    this.question      = question.question;
    this.reponse          = question.reponse;
    this.created_at     = new Date();
    this.updated_at     = new Date();
};

Question.create = function (question, result) {

    dbConn.query("INSERT INTO questions set?", question, function (err, res){

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


Question.findById = function (id, result) {
    dbConn.query("Select * from questions where id = ? ", id, function (err, res) {
      if(err) {
        console.log("error: ", err);
        result(err, null);
      }
      else{
        result(null, res);
      }
    });
};
Question.findAll = function (result) {
    dbConn.query("Select * from questions", function (err, res) {
      if(err) {
        console.log("error: ", err);
        result(null, err);
      }
      else{
        console.log('questions : ', res);
        result(null, res);
      }
    });
};
Question.update = function(id, question, result){
    dbConn.query("UPDATE questions SET anneeScolaire=?,question=?,reponse=? WHERE id = ?", [question.anneeScolaire,question.question,question.reponse, id], function (err, res) {
      if(err) {
        console.log("error: ", err);
        result(null, err);
      }else{
        result(null, res);
      }
    });
};
Question.delete = function(id, result){
    dbConn.query("DELETE FROM questions WHERE id = ?", [id], function (err, res) {
      if(err) {
        console.log("error: ", err);
        result(null, err);
      }
      else{
        result(null, res);
      }
    });
};

module.exports= Question;
