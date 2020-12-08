

const Stage = require('../../models/stage.model');
const Utils = require('./utils');

exports.crudForm = function (req, res) {
  res.render('/src/views/anneeScolaire.html');
};

exports.findAll = function (req, res) {
  Stage.findAll((err, anneeScolaire) => {
    console.log('controller');
    if (err) { res.send(err); }
    console.log('res', anneeScolaire);
    res.send(anneeScolaire);
  });
};

exports.create = function (req, res) {
  const new_anneeScolaire = new Stage(req.body);
  // handles null error
  if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
    res.status(400).send({ error: true, message: 'Please provide all required field' });
  } else {
    Stage.create(new_anneeScolaire, (err, anneeScolaire) => {
      if (err) { res.send(err); }
      //   res.redirect('/procedure/')
      res.json({ error: false, message: 'AnneeScolaire added successfully!', data: anneeScolaire });
    });
  }
};

exports.findById = function (req, res) {
  Stage.findById(req.params.id, (err, anneeScolaire) => {
    if (err) { res.send(err); }
    res.json(anneeScolaire);
  });
};

exports.update = function (req, res) {
  if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
    res.status(400).send({ error: true, message: 'Please provide all required field' });
  } else {
    Stage.update(req.params.id, new Stage(req.body), (err, anneeScolaire) => {
      if (err) { res.send(err); }
      res.json({ error: false, message: 'AnneeScolaire successfully updated' });
    });
  }
};

exports.delete = function (req, res) {
  Stage.delete(req.params.id, (err, anneeScolaire) => {
    if (err) { res.send(err); }
    res.json({ error: false, message: 'AnneeScolaire successfully deleted' });
  });
};


/* TEST GETTING attribute's model */
exports.getTestById = function (id, res) {
  Stage.findById(id, (err, stage) => {
    if (err) { res.send(err); }
    console.log(stage);
    console.log(stage[0].typesDeStages);
    res.json(stage[0].typesDeStages);
  });
};
exports.getTestByYear = function (year, res) {
  Stage.findByYear(year, (err, stage) => {
    if (err) { res.send(err); }
    console.log(stage);
    console.log(stage[0].typesDeStages);
    res.json(stage[0].typesDeStages);
  });
};

/* TEST UPDATE attribute's model */
exports.updateTest = function (id, res) {
  Stage.findById(id, (err, stage) => {
    if (err) { res.send(err); }
    console.log(stage);
    stage[0].typesDeStages = 'test234';
    // anneeScolaire[0].responsableStage = 'test2';
    // anneeScolaire[0].signataireConvention = 'test2';
    Stage.update(id, new Stage(stage[0]), (err, tmp) => {
      if (err) { res.send(err); }
      res.json({ error: false, message: 'Stage successfully updated' });
    });
  });
};

/* TEST CREATE entity model */
exports.createTest = function (req, res) {
  const tmp = {
    anneeScolaire: '2019 - 2020',
    debut: 2019,
    fin: 2020,
    typesDeStages: 'test',
    dureeMinStage: 0,
    dureeMaxStage: 0,
    dateDebutMinStage: 0,
    dateDebutMaxStage: 0,
    dateFinMinStage: 0,
    dateFinMaxStage: 0,
    responsableStage: 'test',
    signataireConvention: 'test',
    created_at: 0,
    updated_at: 0,

    // new added
    dateRenduRapportStage: 0,
    dateRenduRapportIntermediaireStage: 0,
    consigneRapport: 'test',
    emplacementRenduRapport: 'test',
    emplacementRenduRapportIntermediaire: 'test',
    lienSlidePresentationStage: 'test',
    procedureSignatureConvention: 'test',
    procedureValidationSujetStage: 'test',
    actionsAfaireAlaFinDuStage: 'test',
    rdvPourSignatureConvention: 0,
    coupureStage: 'test',
    stageDansUnLaboratoire: 'test',
    numeroArenseignerPourLesConventions: 0,
    stageEtConvention: 'test',
    validationStageParCDD: 'test',
    contactLorsqueLeStageSePasseMal: 'test',
    stageEtProjetPersonnel: 'test',
    stageEtFreelance: 'test',
    stageEtTeletravail: 'test',
    stageEtMineure: 'test',
    stageNonInformatique: 'test',
    soutenance: 'test',
  };

  const new_Stage = new Stage(tmp);

  Stage.create(new_Stage, (err, Stage) => {
    if (err) { res.send(err); }
    //   res.redirect('/procedure/')
    res.json({ error: false, message: 'Stage added successfully!', data: Stage });
  });
};


/* CHAT BOT Stage */
/* GETTER */
exports.getInternStartDateMin = function (year, res) {
  Stage.findByYear(year, (err, stage) => {
    console.log(stage[0]);
    const defaultRes = 'Vous pouvez commencer le Stage dès le 22 Juin.';
    const textRes = `Vous pouvez commencer le Stage dès le ${stage[0].dateDebutMinStage}`;
    const responseObj = Utils.getFulfillmentResponseFormat(defaultRes, textRes);
    res.status(200).json(responseObj);
  });
};

exports.getInternStartDateMax = function (year, res) {
  Stage.findByYear(year, (err, stage) => {
    // console.log(anneeScolaire[0].dateDebutMinStage);
    const defaultRes = 'Vous pouvez commencer le Stage dès le 22 Juin.';
    const textRes = `Vous pouvez commencer le Stage au plutard le ${stage[0].dateDebutMinStage}`;
    const responseObj = Utils.getFulfillmentResponseFormat(defaultRes, textRes);
    res.status(200).json(responseObj);
  });
};

exports.getInternEndDateMin = function (year, res) {
  Stage.findByYear(year, (err, anneeScolaire) => {
    // console.log(anneeScolaire[0].stage);
    const defaultRes = "Normalement, le Stage devrait finir à la fin du mois d'Août mais possibilité de faire un avenant pour le continuer en Septembre avant la rentrée.";
    const textRes = 'Normalement, le Stage doit faire 8 semaines au moins à partir de la date de début.';
    const responseObj = Utils.getFulfillmentResponseFormat(defaultRes, textRes);
    res.status(200).json(responseObj);
  });
};


exports.getInternEndDateMax = function (year, res) {
  Stage.findByYear(year, (err, stage) => {
    // console.log(anneeScolaire[0].dateDebutMinStage);
    const defaultRes = "Normalement, le Stage devra finir à la fin du mois d'Août mais possibilité de faire un avenant pour le continuer en Septembre avant la rentrée.";
    const textRes = `Normalement, le Stage devrait finir à la fin du mois d'Août mais peut continuer jusqu'au ${stage[0].dateFinMaxStage} en faisang un avenant pour le continuer.`;
    const responseObj = Utils.getFulfillmentResponseFormat(defaultRes, textRes);
    res.status(200).json(responseObj);
  });
};

exports.getInternReportDate = function (year, res) {
  Stage.findByYear(year, (err, stage) => {
    const defaultRes = "Le rapport final est à rendre à la fin d'août";
    const textRes = `Le rapport final est à rendre au plutard le ${stage[0].dateRenduRapportStage}`;
    const responseObj = Utils.getFulfillmentResponseFormat(defaultRes, textRes);
    res.status(200).json(responseObj);
  });
};

exports.getInternReportPlace = function (year, res) {
  Stage.findByYear(year, (err, stage) => {
    const defaultRes = 'Vous devez envoyer le rapport final à Mme Diane Lingrand par mail';
    const textRes = `Vous devez envoyer le rapport final à Mme Diane Lingrand par mail: ${stage[0].emplacementRenduRapport}`;
    const responseObj = Utils.getFulfillmentResponseFormat(defaultRes, textRes);
    res.status(200).json(responseObj);
  });
};


exports.getInternSignataireConvention = function (year, res) {
  Stage.findByYear(year, (err, stage) => {
    const defaultRes = 'get convention signataire default';
    const textRes = `Celui qui doit signer la convention au niveau de l'ecole est:  ${stage[0].signataireConvention}`;
    const responseObj = Utils.getFulfillmentResponseFormat(defaultRes, textRes);
    res.status(200)
      .json(responseObj);
  });
};


exports.getInternResponsableStage = function (year, res) {
  Stage.findByYear(year, (err, stage) => {
    const defaultRes = 'Afin de valider le sujet de Stage, vous devez contacter avec le responsable';
    const textRes = `Le responsable de Stage est: ${stage[0].responsableStage}`;
    const responseObj = Utils.getFulfillmentResponseFormat(defaultRes, textRes);
    res.status(200)
      .json(responseObj);
  });
};

exports.getInternInfoFinStage = function (year, res) {
  Stage.findByYear(year, (err, stage) => {
    const defaultRes = 'Il faut rendre son rapport de Stage.';
    const textRes = `${stage[0].actionsAfaireAlaFinDuStage}`;
    const responseObj = Utils.getFulfillmentResponseFormat(defaultRes, textRes);
    res.status(200)
      .json(responseObj);
  });
};

exports.getInfoValidationSujet = function (year, res) {
  Stage.findByYear(year, (err, stage) => {
    const defaultRes = 'Il faut faire valider le sujet par le responsable de Stage';
    const textRes = stage[0].procedureValidationSujetStage;
    const responseObj = Utils.getFulfillmentResponseFormat(defaultRes, textRes);
    res.status(200)
      .json(responseObj);
  });
};
exports.getInternFreelance = function (year, res) {
  Stage.findByYear(year, (err, stage) => {
    const defaultRes = 'Il faut faire valider le sujet par le responsable de Stage';
    const textRes = `${stage[0].StageEtFreelance}`;
    const responseObj = Utils.getFulfillmentResponseFormat(defaultRes, textRes);
    res.status(200)
      .json(responseObj);
  });
};

exports.getInternProjetPers = function (year, res) {
  Stage.findByYear(year, (err, stage) => {
    const defaultRes = 'Il faut faire valider le sujet par le responsable de Stage';
    const textRes = `${stage[0].StageEtProjetPersonnel}`;
    const responseObj = Utils.getFulfillmentResponseFormat(defaultRes, textRes);
    res.status(200)
      .json(responseObj);
  });
};

exports.getInfoProcedureConvention = function (year, res) {
  Stage.findByYear(year, (err, stage) => {
    const defaultRes = 'La procédure pour signer la convention...';
    const textRes = `La procédure pour signer la convention est trouvé à l'adresse: ${stage[0].procedureSignatureConvention}`;
    const responseObj = Utils.getFulfillmentResponseFormat(defaultRes, textRes);
    res.status(200)
      .json(responseObj);
  });
};


exports.getStageNonInfo = function (year, res) {
  Stage.findByYear(year, (err, stage) => {
    const defaultRes = 'La procédure pour signer la convention...';
    const textRes = `${stage[0].StageNonInformatique}`;
    const responseObj = Utils.getFulfillmentResponseFormat(defaultRes, textRes);
    res.status(200)
      .json(responseObj);
  });
};
exports.getInfoStageEtMineure = function (year, res) {
  Stage.findByYear(year, (err, stage) => {
    const defaultRes = "Le Stage n'a pas besoin d'être dans la mineure choisie";
    const textRes = `${stage[0].StageEtMineure}`;
    const responseObj = Utils.getFulfillmentResponseFormat(defaultRes, textRes);
    res.status(200)
      .json(responseObj);
  });
};


exports.getDureeMin = function (year, res) {
  Stage.findByYear(year, (err, stage) => {
    const defaultRes = 'Le Stage doit durer au moins 8 semaines';
    const textRes = `La duree minimale pour le Stage est de${stage[0].dureeMinStage}`;
    const responseObj = Utils.getFulfillmentResponseFormat(defaultRes, textRes);
    res.status(200)
      .json(responseObj);
  });
};

exports.getReportInterDate = function (year, res) {
  Stage.findByYear(year, (err, stage) => {
    const defaultRes = 'Il faut le rendre une semaine après la date de debut de sujet';
    const textRes = `Il faut rendre ce rapport${stage[0].dureeMinStage}`;
    const responseObj = Utils.getFulfillmentResponseFormat(defaultRes, textRes);
    res.status(200)
      .json(responseObj);
  });
};

exports.getInternVacation = function (year, res) {
  Stage.findByYear(year, (err, stage) => {
    const defaultRes = "Oui c'est faisable. En laboratoire, par exemple ils ferment debut Août.";
    const textRes = "Oui c'est faisable. En laboratoire, par exemple ils ferment debut Août.";
    const responseObj = Utils.getFulfillmentResponseFormat(defaultRes, textRes);
    res.status(200)
      .json(responseObj);
  });
};

exports.getInternLabo = function (year, res) {
  Stage.findByYear(year, (err, stage) => {
    const defaultRes = 'Oui, vous pouvez faire votre Stage en laboratoire.';
    const textRes = `${stage[0].StageDansUnLaboratoire}`;
    const responseObj = Utils.getFulfillmentResponseFormat(defaultRes, textRes);
    res.status(200)
      .json(responseObj);
  });
};

exports.getConventionNumber = function (year, res) {
  Stage.findByYear(year, (err, stage) => {
    const defaultRes = 'Le numero pour la convention est celui de la responsable de Stage';
    const textRes = `${stage[0].numeroArenseignerPourLesConventions}`;
    const responseObj = Utils.getFulfillmentResponseFormat(defaultRes, textRes);
    res.status(200)
      .json(responseObj);
  });
};

exports.getInternSchoolNumber = function (year, res) {
  Stage.findByYear(year, (err, stage) => {
    const defaultRes = 'La personne à contacter est votre tuteur.';
    const textRes = `${stage[0].contactLorsqueLeStageSePasseMal}`;
    const responseObj = Utils.getFulfillmentResponseFormat(defaultRes, textRes);
    res.status(200)
      .json(responseObj);
  });
};

exports.getInternSoutenance = function (year, res) {
  Stage.findByYear(year, (err, stage) => {
    const defaultRes = "Non il n'y a pas de soutenance";
    const textRes = `${stage[0].soutenance}`;
    const responseObj = Utils.getFulfillmentResponseFormat(defaultRes, textRes);
    res.status(200)
      .json(responseObj);
  });
};

exports.getInternInfoGeneral = function (year, res) {
  Stage.findByYear(year, (err, stage) => {
    const defaultRes = 'get intern info generale default';
    const textRes = `Intern report info generale:  ${stage[0].lienSlidePresentationStage}`;
    const responseObj = Utils.getFulfillmentResponseFormat(defaultRes, textRes);
    res.status(200).json(responseObj);
  });
};

/* CHECKER */
exports.verifInternStartDate = function (year, req, res) {
  Stage.findByYear(year, (err, stage) => {
    let textRes;
    const date = req.body.queryResult.parameters.date;
    if (date >= stage[0].dateDebutMinStage && date <= stage[0].dateDebutMaxStage) {
      textRes = 'Oui vous pouvez commencer le Stage à la date indiquée et réaliser pendant 8 semaines en minimum. Dans le cas le durée de Stage est plus que 10 semaines, il vous faut faire un avenant';
    } else {
      textRes = `Vous ne pouvez pas faire le Stage avant la date début officielle étant ${stage[0].dateDebutMinStage}`;
    }
    const defaultRes = 'iduno';
    const responseObj = Utils.getFulfillmentResponseFormat(defaultRes, textRes);
    res.status(200)
      .json(responseObj);
  });
};


exports.verifInternEndDate = function (year, req, res) {
  Stage.findByYear(year, (err, stage) => {
    let textRes;
    const startDate = req.body.queryResult.parameters.startDate;
    const finalDate = req.body.queryResult.parameters.finalDate;

    const sdate = new Date(startDate);
    sdate.setFullYear(2020);
    const fdate = new Date(finalDate);
    const diff = Math.abs(fdate - sdate);
    const diffDays = Math.ceil(diff / (24 * 60 * 60 * 1000));
    const durationWeeks = Math.floor(diffDays / 7);
    const durationDays = diffDays - durationWeeks * 7;

    if (durationWeeks >= 10) {
      if (finalDate <= stage[0].dateFinMaxStage && finalDate >= stage[0].dateFinMaxStage) {
        textRes = `Oui, vous pouvez finir le Stage à la date indiquée ce qui signifie que la durée de Stage sera ${durationWeeks} semaines et ${durationDays} jours`;
      } else {
        textRes = 'Vous ne pouvez pas finir le Stage à la date indiquée';
      }
    } else {
      textRes = 'La durée de Stage minimum est de 8 semaines.';
    }

    const defaultRes = 'iduno';
    const responseObj = Utils.getFulfillmentResponseFormat(defaultRes, textRes);
    res.status(200)
      .json(responseObj);
  });
};


/* CHAT BOT SURVEY */
// GETTER
exports.getSurveyInternStartDate = function (year, res) {
  Stage.findByYear(year, (err, stage) => {
    const defaultRes = 'get intern start date default';
    const textRes = `Intern start date:  ${stage[0].dateDebutMinStage} - Would you like to modify?`;
    const responseObj = Utils.getFulfillmentResponseFormat(defaultRes, textRes);
    res.status(200).json(responseObj);
  });
};

exports.getSurveyInternEndDate = function (year, res) {
  Stage.findByYear(year, (err, stage) => {
    const defaultRes = 'get intern end date default';
    const textRes = `Intern end date:  ${stage[0].dateFinMinStage} - Would you like to modify?`;
    const responseObj = Utils.getFulfillmentResponseFormat(defaultRes, textRes);
    res.status(200).json(responseObj);
  });
};

exports.getSurveyInternReportDate = function (year, res) {
  Stage.findByYear(year, (err, stage) => {
    const defaultRes = 'get intern report date default';
    const textRes = `Intern report date:  ${stage[0].dateRapport} - Would you like to modify?`;
    const responseObj = Utils.getFulfillmentResponseFormat(defaultRes, textRes);
    res.status(200).json(responseObj);
  });
};

exports.getSurveyInternReportPlace = function (year, res) {
  Stage.findByYear(year, (err, stage) => {
    const defaultRes = 'get intern report place default';
    const textRes = `Intern report place:  ${stage[0].placeRapport} - Would you like to modify?`;
    const responseObj = Utils.getFulfillmentResponseFormat(defaultRes, textRes);
    res.status(200).json(responseObj);
  });
};

exports.getSurveySignataireConvention = function (year, res) {
  Stage.findByYear(year, (err, stage) => {
    const defaultRes = 'get convention signataire default';
    const textRes = `Convention signataire:  ${stage[0].signataireConvention} - Would you like to modify?`;
    const responseObj = Utils.getFulfillmentResponseFormat(defaultRes, textRes);
    res.status(200).json(responseObj);
  });
};

exports.getSurveyReportConsignes = function (year, res) {
  Stage.findByYear(year, (err, stage) => {
    const defaultRes = 'get intern report instructions default';
    const textRes = `Intern report instructions:  ${stage[0].consigneRapport} - Would you like to modify?`;
    const responseObj = Utils.getFulfillmentResponseFormat(defaultRes, textRes);
    res.status(200).json(responseObj);
  });
};

exports.getSurveyInfoGeneral = function (year, res) {
  Stage.findByYear(year, (err, stage) => {
    const defaultRes = 'get intern info generale default';
    const textRes = `Intern report info generale:  ${stage[0].lienSlidePresentationStage} - Would you like to modify?`;
    const responseObj = Utils.getFulfillmentResponseFormat(defaultRes, textRes);
    res.status(200).json(responseObj);
  });
};

exports.getConventionProcedure = function (year, res) {
  Stage.findByYear(year, (err, stage) => {
    const defaultRes = 'get convention process default';
    const textRes = `Convention process:  ${stage[0].procedureSignatureConvention}`;
    const responseObj = Utils.getFulfillmentResponseFormat(defaultRes, textRes);
    res.status(200).json(responseObj);
  });
};

// SETTER
exports.modifySurveyInternStartDate = function (year, req, res) {
  Stage.findByYear(year, (err, stage) => {
    // modifyEndDate(endDateToModify);
    stage[0].dateDebutMinStage = new Date(req.body.queryResult.parameters.startDateToModify);
    Stage.update(stage[0].id, new Stage(stage[0]), (err, tmp) => {
      if (err) { res.send(err); }
      const defaultRes = 'modify intern start date default';
      const textRes = `Intern start date modified:  ${stage[0].dateDebutMinStage.toDateString()}`;
      const responseObj = Utils.getFulfillmentResponseFormat(defaultRes, textRes);
      res.status(200).json(responseObj);
    });
  });
};

exports.modifySurveyInternEndDate = function (year, req, res) {
  Stage.findByYear(year, (err, stage) => {
    // modifyEndDate(endDateToModify);
    stage[0].dateFinMinStage = new Date(req.body.queryResult.parameters.endDateToModify);
    Stage.update(stage[0].id, new Stage(stage[0]), (err, tmp) => {
      if (err) { res.send(err); }
      const defaultRes = 'modify intern end date default';
      const textRes = `Intern end date modified:  ${stage[0].dateFinMinStage.toDateString()}`;
      const responseObj = Utils.getFulfillmentResponseFormat(defaultRes, textRes);
      res.status(200).json(responseObj);
    });
  });
};

exports.modifySurveySignataireConvention = function (year, req, res) {
  Stage.findByYear(year, (err, stage) => {
    // modifyEndDate(endDateToModify);
    stage[0].signataireConvention = req.body.queryResult.parameters.signataireEmail;
    Stage.update(stage[0].id, new Stage(stage[0]), (err, tmp) => {
      if (err) { res.send(err); }
      const defaultRes = 'modify convention signataire default';
      const textRes = `Convention signataire modified:  ${stage[0].signataireConvention}`;
      const responseObj = Utils.getFulfillmentResponseFormat(defaultRes, textRes);
      res.status(200).json(responseObj);
    });
  });
};

exports.modifySurveyReportDate = function (year, req, res) {
  Stage.findByYear(year, (err, stage) => {
    // modifyEndDate(endDateToModify);
    stage[0].dateRapport = req.body.queryResult.parameters.reportDateToModify;
    Stage.update(stage[0].id, new Stage(stage[0]), (err, tmp) => {
      if (err) { res.send(err); }
      const defaultRes = 'modify intern report date default';
      const textRes = `Intern report date modified:  ${stage[0].dateRenduRapportStage}`;
      const responseObj = Utils.getFulfillmentResponseFormat(defaultRes, textRes);
      res.status(200).json(responseObj);
    });
  });
};

exports.modifySurveyReportPlace = function (year, req, res) {
  Stage.findByYear(year, (err, stage) => {
    // modifyEndDate(endDateToModify);
    stage[0].placeRapport = req.body.queryResult.parameters.reportPLaceToModify;
    Stage.update(stage[0].id, new Stage(stage[0]), (err, tmp) => {
      if (err) { res.send(err); }
      const defaultRes = 'modify intern report place default';
      const textRes = `Intern report place modified:  ${stage[0].emplacementRenduRapport}`;
      const responseObj = Utils.getFulfillmentResponseFormat(defaultRes, textRes);
      res.status(200)
        .json(responseObj);
    });
  });
};

exports.modifyReportConsines = function (year, req, res) {
  Stage.findByYear(year, (err, stage) => {
    if (err) { res.send(err); }
    console.log(Stage);
    stage[0].consigneRapport = req.body.queryResult.parameters.consigneURL;
    Stage.update(Stage[0].id, new Stage(stage[0]), (err, tmp) => {
      if (err) { res.send(err); }
      const defaultRes = 'modify intern report instructions default';
      const textRes = `Intern report instructions modified:  ${stage[0].consigneRapport}`;
      const responseObj = Utils.getFulfillmentResponseFormat(defaultRes, textRes);
      res.status(200).json(responseObj);
    });
  });
};

exports.modifyInfoGeneral = function (year, req, res) {
  Stage.findByYear(titre, (err, stage) => {
    if (err) { res.send(err); }
    console.log(Stage);
    stage[0].lienSlidePresentationStage = req.body.queryResult.parameters.infoGeneralURL;
    Stage.update(Stage[0].id, new Stage(stage[0]), (err, tmp) => {
      if (err) { res.send(err); }
      const defaultRes = 'modify intern info generale default';
      const textRes = `Intern report info generale modified:  ${stage[0].lienSlidePresentationStage}`;
      const responseObj = Utils.getFulfillmentResponseFormat(defaultRes, textRes);
      res.status(200)
        .json(responseObj);
    });
  });
};


exports.modifyConventionProcedure = function (year, req, res) {
  Stage.findByYear(year, (err, stage) => {
    if (err) { res.send(err); }
    console.log(Stage);
    stage[0].procedureDetaillee = req.body.queryResult.parameters.conventionURL;
    Stage.update(stage[0].id, new Stage(stage[0]), (err, tmp) => {
      if (err) { res.send(err); }
      const defaultRes = 'modify convention process default';
      const textRes = `Convention process modified:  ${stage[0].procedureDetaillee}`;
      const responseObj = Utils.getFulfillmentResponseFormat(defaultRes, textRes);
      res.status(200).json(responseObj);
    });
  });
};
