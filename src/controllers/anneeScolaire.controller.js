/*
'use strict';

const AnneeScolaire = require('../../models/anneeScolaire.model');
const Utils = require('./utils');
exports.crudForm = function(req, res) {
        res.render('/src/views/anneeScolaire.html');
};

exports.findAll = function(req, res) {
AnneeScolaire.findAll(function(err, anneeScolaire) {
  console.log('controller');
  if (err)
  res.send(err);
  console.log('res', anneeScolaire);
  res.send(anneeScolaire);
});
};

exports.create = function(req, res) {
const new_anneeScolaire = new AnneeScolaire(req.body);
//handles null error
if(req.body.constructor === Object && Object.keys(req.body).length === 0){
  res.status(400).send({ error:true, message: 'Please provide all required field' });
}else{
AnneeScolaire.create(new_anneeScolaire, function(err, anneeScolaire) {
  if (err)
  res.send(err);
//   res.redirect('/procedure/')
  res.json({error:false,message:"AnneeScolaire added successfully!",data:anneeScolaire});
});
}
};

exports.findById = function(req, res) {
AnneeScolaire.findById(req.params.id, function(err, anneeScolaire) {
  if (err)
  res.send(err);
  res.json(anneeScolaire);
});
};

exports.update = function(req, res) {
  if(req.body.constructor === Object && Object.keys(req.body).length === 0){
    res.status(400).send({ error:true, message: 'Please provide all required field' });
  }else{
    AnneeScolaire.update(req.params.id, new AnneeScolaire(req.body), function(err, anneeScolaire) {
   if (err)
   res.send(err);
   res.json({ error:false, message: 'AnneeScolaire successfully updated' });
});
}
};

exports.delete = function(req, res) {
AnneeScolaire.delete( req.params.id, function(err, anneeScolaire) {
  if (err)
  res.send(err);
  res.json({ error:false, message: 'AnneeScolaire successfully deleted' });
});
};
*/






/* TEST GETTING attribute's model */
/*
exports.getTest = function(id, res) {
  AnneeScolaire.findById(id, function(err, anneeScolaire) {
    if (err)
      res.send(err);
    console.log(anneeScolaire[0].typesDeStages);
    res.json(anneeScolaire[0].typesDeStages);
  });
};
*/
/* TEST UPDATE attribute's model */
/*
exports.updateTest = function(id, res) {
  AnneeScolaire.findById(id, function(err, anneeScolaire) {
    if (err)
      res.send(err);
    console.log(anneeScolaire);
    anneeScolaire[0].typesDeStages = 'test2';
    //anneeScolaire[0].responsableStage = 'test2';
    //anneeScolaire[0].signataireConvention = 'test2';
    AnneeScolaire.update(id, new AnneeScolaire(anneeScolaire[0]), function(err, tmp) {
      if (err)
        res.send(err);
      res.json({ error:false, message: 'AnneeScolaire successfully updated' });
    });

  });
};
*/
/* TEST CREATE entity model */
/*
exports.createTest = function(req, res) {
  const tmp = {
    annee: 2020,
    debut: 0,
    fin: 0,
    typesDeStages: 'test',
    dureeMinStage: 0,
    dureeMaxStage: 0,
    dateDebutMinStage: 0,
    dateDebutMaxStage: 0,
    dateFinMinStage: 0,
    dateFinMaxStage: 0,
    responsableStage: 'test',
    signataireConvention: 'test',
    dateRapport: 0,
    placeRapport: 'test',
    created_at: 0,
    updated_at: 0,
  };

  const new_anneeScolaire = new AnneeScolaire(tmp);

    AnneeScolaire.create(new_anneeScolaire, function(err, anneeScolaire) {
      if (err)
        res.send(err);
//   res.redirect('/procedure/')
      res.json({error:false,message:"AnneeScolaire added successfully!",data:anneeScolaire});
    });
};
*/


/* CHAT BOT STAGE*/
/* GETTER */
/*
exports.getInternStartDate = function(year, res) {
  AnneeScolaire.findByYear(year, function(err, anneeScolaire) {
    //console.log(anneeScolaire[0].dateDebutMinStage);
    let defaultRes = "Vous pouvez commencer le stage dès le 22 Juin.";
    let textRes = "Vous pouvez commencer le stage dès le " + anneeScolaire[0].dateDebutMinStage;
    let responseObj = Utils.getFulfillmentResponseFormat(defaultRes, textRes);
    res.status(200).json(responseObj);
  });
};

exports.getInternEndDate = function(year, res) {
  AnneeScolaire.findByYear(year, function(err, anneeScolaire) {
    //console.log(anneeScolaire[0].dateDebutMinStage);
    let defaultRes = "Normalement, le stage devrait finir à la fin du mois d'Août mais possibilité de faire un avenant pour le continuer en Septembre avant la rentrée.";
    let textRes = "Normalement, le stage devrait finir à la fin du mois d'Août y compris "+anneeScolaire[0].dateFinMinStage+" mais possibilité de faire un avenant pour le continuer en Septembre avant la rentrée.";
    let responseObj = Utils.getFulfillmentResponseFormat(defaultRes, textRes);
    res.status(200).json(responseObj)
  });
};

exports.getInternReportDate = function(year, res) {
  AnneeScolaire.findByYear(year, function(err, anneeScolaire) {
    let defaultRes = "Le rapport final est à rendre à la fin d'août";
    let textRes = "Le rapport final est à rendre à la fin d'août y compris "+anneeScolaire[0].dateRapport;
    let responseObj = Utils.getFulfillmentResponseFormat(defaultRes, textRes);
    res.status(200).json(responseObj)
  });
};

exports.getInternReportPlace = function(year, res) {
  AnneeScolaire.findByYear(year, function(err, anneeScolaire) {
    let defaultRes = "Vous devez envoyer le rapport final à Mdm Diane Lingrand par mail";
    let textRes = "Vous devez envoyer le rapport final à Mdm Diane Lingrand par mails: "+ anneeScolaire[0].placeRapport;
    let responseObj = Utils.getFulfillmentResponseFormat(defaultRes, textRes);
    res.status(200).json(responseObj)
  });
};

exports.getInternSignataireConvention = function(year, res) {
  AnneeScolaire.findByYear(year, function(err, anneeScolaire) {

    let defaultRes = "get convention signataire default";
    let textRes = "Convention signataire:  " + anneeScolaire[0].signataireConvention;
    let responseObj = Utils.getFulfillmentResponseFormat(defaultRes, textRes);
    res.status(200).json(responseObj)
  });
};

exports.getIngernInfoAdminFinStage = function(year, res) {
  AnneeScolaire.findByYear(year, function(err, anneeScolaire) {
    let defaultRes = "A la fin du stage il vous faut de rendre le rapport";
    let textRes = "A la fin du stage il vous faut de rendre le rapport à " + anneeScolaire[0].placeRapport + " avant le " + anneeScolaire[0].dateRapport;
    let responseObj = Utils.getFulfillmentResponseFormat(defaultRes, textRes);
    res.status(200).json(responseObj)
  });
};


exports.getInternResponsableStage = function(year, res) {
  AnneeScolaire.findByYear(year, function(err, anneeScolaire) {
    let defaultRes = "Afin de valider le sujet de stage, vous devez contacter avec le responsable";
    let textRes = "Afin de valider stage, vous devez contacter avec " + anneeScolaire[0].responsableStage;
    let responseObj = Utils.getFulfillmentResponseFormat(defaultRes, textRes);
    res.status(200).json(responseObj)
  });
};
*/

/* CHECKER */
/*
exports.verifInternStartDate = function(year, req, res) {
  AnneeScolaire.findByYear(year, function(err, anneeScolaire) {
    let textRes;
    let date = req.body.queryResult.parameters.date;
    if(date >= anneeScolaire[0].dateDebutMinStage && date <= anneeScolaire[0].dateDebutMaxStage ){
      textRes = "Oui vous pouvez commencer le stage à la date indiquée et réaliser pendant 10 semaines en minimum. Dans le cas le durée de stage est plus que 10 semaines, il vous faut faire un avenant";
    }else{
      textRes = "Vous ne pouvez pas faire le stage avant la date début officielle étant " + anneeScolaire[0].dateDebutMinStage;
    }
    let defaultRes = "iduno";
    let responseObj = Utils.getFulfillmentResponseFormat(defaultRes, textRes);
    res.status(200).json(responseObj);
  });
};


exports.verifInternEndDate = function(year, req, res) {
  AnneeScolaire.findByYear(year, function(err, anneeScolaire) {
    let textRes;
    let startDate = req.body.queryResult.parameters.startDate;
    let finalDate = req.body.queryResult.parameters.finalDate;

    let sdate = new Date(startDate);
    sdate.setFullYear(2020);
    let fdate = new Date(finalDate);
    let diff = Math.abs(fdate - sdate);
    let diffDays = Math.ceil(diff / (24 * 60 * 60 * 1000));
    let durationWeeks = Math.floor(diffDays/7);
    let durationDays = diffDays - durationWeeks*7;

    if(durationWeeks >= 10){
      if(finalDate <= anneeScolaire[0].dateFinMaxStage && finalDate >= anneeScolaire[0].dateFinMaxStage ){
        textRes = "Oui, vous pouvez finir le stage à la date indiquée ce qui signifie que la durée de stage sera " +durationWeeks +" semaines et "+durationDays +" jours";
      }else {
        textRes = "Vous ne pouvez pas finir le stage à la date indiqué";
      }
    }else{
      textRes = "La durée de stage minimum est de 10 semaines.";
    }

    let defaultRes = "iduno";
    let responseObj = Utils.getFulfillmentResponseFormat(defaultRes, textRes);
    res.status(200).json(responseObj);

  });
};
*/
/* CHAT BOT SURVEY*/
//GETTER
/*
exports.getSurveyInternStartDate = function(year, res) {
  AnneeScolaire.findByYear(year, function(err, anneeScolaire) {
    let defaultRes = "get intern start date default";
    let textRes = "Intern start date:  "+ anneeScolaire[0].dateDebutMinStage +" - Would you like to modify?";
    let responseObj = Utils.getFulfillmentResponseFormat(defaultRes, textRes);
    res.status(200).json(responseObj)
  });
};

exports.getSurveyInternEndDate = function(year, res) {
  AnneeScolaire.findByYear(year, function(err, anneeScolaire) {
    let defaultRes = "get intern end date default";
    let textRes = "Intern end date:  "+ anneeScolaire[0].dateFinMinStage +" - Would you like to modify?";
    let responseObj = Utils.getFulfillmentResponseFormat(defaultRes, textRes);
    res.status(200).json(responseObj)
  });
};

exports.getSurveyInternReportDate = function(year, res) {
  AnneeScolaire.findByYear(year, function(err, anneeScolaire) {
    let defaultRes = "get intern report date default";
    let textRes = "Intern report date:  "+ anneeScolaire[0].dateRapport +" - Would you like to modify?";
    let responseObj = Utils.getFulfillmentResponseFormat(defaultRes, textRes);
    res.status(200).json(responseObj);
  });
};

exports.getSurveyInternReportPlace = function(year, res) {
  AnneeScolaire.findByYear(year, function(err, anneeScolaire) {
    let defaultRes = "get intern report place default";
    let textRes = "Intern report place:  "+ anneeScolaire[0].placeRapport +" - Would you like to modify?";
    let responseObj = Utils.getFulfillmentResponseFormat(defaultRes, textRes);
    res.status(200).json(responseObj);
  });
};

exports.getSurveySignataireConvention = function(year, res) {
  AnneeScolaire.findByYear(year, function(err, anneeScolaire) {
    let defaultRes = "get convention signataire default";
    let textRes = "Convention signataire:  " + anneeScolaire[0].signataireConvention + " - Would you like to modify?";
    let responseObj = Utils.getFulfillmentResponseFormat(defaultRes, textRes);
    res.status(200).json(responseObj);
  });
};

//SETTER
exports.modifySurveyInternStartDate = function(year, req, res) {
  AnneeScolaire.findByYear(year, function(err, anneeScolaire) {
    //modifyEndDate(endDateToModify);
    anneeScolaire[0].dateDebutMinStage = new Date(req.body.queryResult.parameters.startDateToModify);
    AnneeScolaire.update(anneeScolaire[0].id, new AnneeScolaire(anneeScolaire[0]), function(err, tmp) {
      if (err)
        res.send(err);
      let defaultRes = "modify intern start date default";
      let textRes = "Intern start date modified:  " + anneeScolaire[0].dateDebutMinStage.toDateString();
      let responseObj = Utils.getFulfillmentResponseFormat(defaultRes, textRes);
      res.status(200).json(responseObj)
    });
  });
};

exports.modifySurveyInternEndDate = function(year, req, res) {
  AnneeScolaire.findByYear(year, function(err, anneeScolaire) {
    //modifyEndDate(endDateToModify);
    anneeScolaire[0].dateFinMinStage = new Date(req.body.queryResult.parameters.endDateToModify);
    AnneeScolaire.update(anneeScolaire[0].id, new AnneeScolaire(anneeScolaire[0]), function(err, tmp) {
      if (err)
        res.send(err);
      let defaultRes = "modify intern end date default";
      let textRes = "Intern end date modified:  "+ anneeScolaire[0].dateFinMinStage.toDateString();
      let responseObj = Utils.getFulfillmentResponseFormat(defaultRes, textRes);
      res.status(200).json(responseObj)
    });
  });
};

exports.modifySurveySignataireConvention = function(year, req, res) {
  AnneeScolaire.findByYear(year, function(err, anneeScolaire) {
    //modifyEndDate(endDateToModify);
    anneeScolaire[0].signataireConvention = req.body.queryResult.parameters.signataireEmail;
    AnneeScolaire.update(anneeScolaire[0].id, new AnneeScolaire(anneeScolaire[0]), function(err, tmp) {
      if (err)
        res.send(err);
      let defaultRes = "modify convention signataire default";
      let textRes = "Convention signataire modified:  "+ anneeScolaire[0].signataireConvention;
      let responseObj = Utils.getFulfillmentResponseFormat(defaultRes, textRes);
      res.status(200).json(responseObj)
    });
  });
};

exports.modifySurveyReportDate = function(year, req, res) {
  AnneeScolaire.findByYear(year, function(err, anneeScolaire) {
    //modifyEndDate(endDateToModify);
    anneeScolaire[0].dateRapport = req.body.queryResult.parameters.reportDateToModify;
    AnneeScolaire.update(anneeScolaire[0].id, new AnneeScolaire(anneeScolaire[0]), function(err, tmp) {
      if (err)
        res.send(err);
      let defaultRes = "modify intern report date default";
      let textRes = "Intern report date modified:  "+anneeScolaire[0].dateRapport;
      let responseObj = Utils.getFulfillmentResponseFormat(defaultRes, textRes);
      res.status(200).json(responseObj)
    });
  });
};

exports.modifySurveyReportPlace = function(year, req, res) {
  AnneeScolaire.findByYear(year, function(err, anneeScolaire) {
    //modifyEndDate(endDateToModify);
    anneeScolaire[0].placeRapport = req.body.queryResult.parameters.reportPLaceToModify;
    AnneeScolaire.update(anneeScolaire[0].id, new AnneeScolaire(anneeScolaire[0]), function(err, tmp) {
      if (err)
        res.send(err);
      let defaultRes = "modify intern report place default";
      let textRes = "Intern report place modified:  "+anneeScolaire[0].placeRapport;
      let responseObj = Utils.getFulfillmentResponseFormat(defaultRes, textRes);
      res.status(200).json(responseObj)
    });
  });
};
*/
