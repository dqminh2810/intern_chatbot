const express = require('express');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
const path = require('path');
const sController = require('./src/controllers/stage.controller');
const Utils = require('./src/controllers/utils');
const { getHomePage } = require('./src/routes/stage.routes');
const {
  addAnneeScolairePage, addAnneeScolaire, deleteAnneeScolairePage, deleteAnneeScolaire, editAnneeScolaire, editAnneeScolairePage, succesPage,
} = require('./src/routes/stage.routes');


const _schoolYear = 2020;

// create express app
const app = express();


// setup server port
const port = process.env.PORT || 5000;
// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
// parse requests of content-type - application/json
app.use(bodyParser.json());

// define a root routels
app.get('/', (req, res) => {
  // res.sendfile( __dirname+'/src/views/anneeScolaire.html');
  res.status(200).json('hello');
});

// configure middleware
app.set('port', process.env.port || port); // set express to use this port
app.set('views', __dirname + '/src/views'); // set express to look in this folder to render our view
app.set('view engine', 'ejs'); // configure template engine
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json()); // parse form data client
app.use(express.static(path.join(__dirname, 'public'))); // configure express to use public folder
app.use(fileUpload()); // configure fileupload

// listen for requests
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});



// FORMULAIRE
app.get('/addAnneeScolaire', addAnneeScolairePage);
app.get('/editAnneeScolaire/:id', editAnneeScolairePage);
app.get('/deleteAnneeScolaire/:id', deleteAnneeScolairePage);

app.post('/deleteAnneeScolaire/:id', deleteAnneeScolaire);
app.post('/addAnneeScolaire', addAnneeScolaire);
app.post('/editAnneeScolaire/:id', editAnneeScolaire);


// TEST REQUEST WITH DATABASE
app.get('/test/db/stage/create', (req, res) => {
  sController.createTest(req, res);
});
app.get('/test/db/stage/update', (req, res) => {
  sController.updateTest(1, res);
});
app.get('/test/db/stage/getById', (req, res) => {
  sController.getTestById(1, res);
});
app.get('/test/db/stage/getByYear', (req, res) => {
  sController.getTestByYear(2020, res);
});


// CHATBOT-STAGE
app.post('/webhook/intern', (req, res) => {
  try {
    console.log('test2');
    const action = req.body.queryResult.action;
    if (action === 'testwebhook') {
      console.log('ok action testwebhook');
    } else if (action === 'getInternStartDate') {
      sController.getInternStartDateMin(_schoolYear, res);
    } else if (action === 'getInternEndDate') {
      sController.getInternEndDateMin(_schoolYear, res);
    } else if (action === 'getFinalReportDate') {
      sController.getInternReportDate(_schoolYear, res);
    } else if (action === 'getFinalReportPlace') {
      sController.getInternReportPlace(_schoolYear, res);
    } else if (action === 'verifInternStartDate') {
      sController.verifInternStartDate(_schoolYear, res);
    } else if (action === 'verifInternEndDate') {
      sController.verifInternEndDate(_schoolYear, res);
    } else if (action === 'getInfoGeneral') {
      sController.getInternInfoGeneral(_schoolYear, res);
    } else if (action === 'getConventionProcedure') {
      sController.getInfoProcedureConvention(_schoolYear, res);
    } else if (action === 'getConventionSignataire') {
      sController.getInternSignataireConvention(_schoolYear, res);
    } else if (action === 'getInfoAdminFinStage') {
      sController.getInternInfoFinStage(_schoolYear, res);
    } else if (action === 'getInfoSujetValidation') {
      sController.getInfoValidationSujet(_schoolYear, res);
    } else if (action === 'getInfoAdminFinStage') {
      sController.getInternInfoFinStage(_schoolYear, res);
    } else if (action === 'getInternFreelance') {
      sController.getInternFreelance(_schoolYear, res);
    } else if (action === 'getInternProjetPers') {
      sController.getInternProjetPers(_schoolYear, res);
    } else if (action === 'getInternDureeMin') {
      sController.getDureeMin(_schoolYear, res);
    } else if (action === 'getInternReportInterDate') {
      sController.getReportInterDate(_schoolYear, res);
    } else if (action === 'getInternReportInterDate') {
      sController.getReportInterDate(_schoolYear, res);
    } else if (action === 'getInternVacation') {
      sController.getInternVacation(_schoolYear, res);
    } else if (action === 'getInternLabo') {
      sController.getInternLabo(_schoolYear, res);
    } else if (action === 'getConventionNumber') {
      sController.getConventionNumber(_schoolYear, res);
    } else if (action === 'getInternSchoolContact') {
      sController.getInternSchoolNumber(_schoolYear, res);
    } else if (action === 'getInternSoutenance') {
      sController.getInternSoutenance(_schoolYear, res);
    } else if (action === 'getInternSubjectNonInfo') {
      sController.getStageNonInfo(_schoolYear, res);
    } else if (action === 'getInternetSubjectMineure') {
      const defaultRes = "Il n'y a aucune contrainte à ce sujet. Vous pouvez faire un stage dans un domaine différent de celui de votre mineure.";
      const textRes = "Il n'y a aucune contrainte à ce sujet. Vous pouvez faire un stage dans un domaine différent de celui de votre mineure.";
      const responseObj = Utils.getFulfillmentResponseFormat(defaultRes, textRes);
      res.status(200).json(responseObj);
    } else if (action === 'getInternAlternContractType') {
      const defaultRes = 'Oui, une alternance qui débute début Juillet peut faire office de stage.';
      const textRes = 'Oui, une alternance qui débute début Juillet peut faire office de stage.';
      const responseObj = Utils.getFulfillmentResponseFormat(defaultRes, textRes);
      res.status(200).json(responseObj);
    } else if (action === 'getInternADistance') {
      const defaultRes = 'Oui, cela est possible.';
      const textRes = 'Oui, cela est possible.';
      const responseObj = Utils.getFulfillmentResponseFormat(defaultRes, textRes);
      res.status(200).json(responseObj);
    }
  } catch (err) {
    if (err.name === 'ValidationError') {
      res.status(400).json(err.extra);
    } else {
      console.log(err);
      res.status(500).json(err);
    }
  }
});


// CHATBOT-SURVEY
app.post('/webhook/survey', (req, res) => {
  try {
    const action = req.body.queryResult.action;

    if (action === 'testwebhook') {
      console.log('ok action testwebhook');
    } else if (action === 'surveyGetInternEndDate') {
      sController.getSurveyInternEndDate(_schoolYear, res);
    } else if (action === 'surveyModifyInternEndDate') {
      sController.modifySurveyInternEndDate(_schoolYear, req, res);
    } else if (action === 'surveyGetInternStartDate') {
      sController.getSurveyInternStartDate(_schoolYear, res);
    } else if (action === 'surveyModifyInternStartDate') {
      sController.modifySurveyInternStartDate(_schoolYear, req, res);
    } else if (action === 'surveyGetInternReportDate') {
      sController.getSurveyInternReportDate(_schoolYear, req, res);
    } else if (action === 'surveyModifyInternReportDate') {
      sController.modifySurveyReportDate(_schoolYear, req, res);
    } else if (action === 'surveyGetInternReportPlace') {
      sController.getSurveyInternReportPlace(_schoolYear, res);
    } else if (action === 'surveyModifyInternReportPlace') {
      sController.modifySurveyReportPlace(_schoolYear, req, res);
    } else if (action === 'surveyGetReportConsignes') {
      sController.getSurveyReportConsignes(_schoolYear, res);
    } else if (action === 'surveyModifyReportConsignes') {
      sController.modifyReportConsines(_schoolYear, req, res);
    } else if (action === 'surveyGetInfoGeneral') {
      sController.getSurveyInfoGeneral(_schoolYear, res);
    } else if (action === 'surveyModifyInfoGeneral') {
      sController.modifyInfoGeneral(_schoolYear, req, res);
    } else if (action === 'surveyGetConventionSignataire') {
      sController.getSurveySignataireConvention(_schoolYear, res);
    } else if (action === 'surveyModifyConventionSignataire') {
      sController.modifySurveySignataireConvention(_schoolYear, req, res);
    } else if (action === 'surveyGetConventionProcedure') {
      sController.getConventionProcedure(_schoolYear, res);
    } else if (action === 'surveyModifyConventionProcedure') {
      sController.modifyConventionProcedure(_schoolYear, req, res);
    }
  } catch (err) {
    if (err.name === 'ValidationError') {
      res.status(400).json(err.extra);
    } else {
      console.log(err);
      res.status(500).json(err);
    }
  }
});
