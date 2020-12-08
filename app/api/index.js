const { Router } = require('express');

let _internStartDate = new Date('2020-06-15T00:00');
let _internEndDate = new Date('2020-08-31T00:00');
let _finalReportdDate = new Date('2020-08-31T00:00');
let _finalReportPlace = "prof.address@mail.com";
let _finalReportInstruction = "www.reportinstruction.com";
let _internInfoGenerale = "www.slides.com";
let _conventionSignataire = "prof.address@mail.com";
let _conventionProcess = "www.convention.com";


const router = new Router();
router.get('/', (req, res) => res.status(200).json('ok'));

// Chatbot-stage
router.post('/webhook/intern', (req, res) => {
  try {

    let action = req.body.queryResult.action;

    if(action === "testwebhook"){
      console.log("ok action testwebhook")
    }else if(action === "getInternStartDate"){
      let defaultRes = "Vous pouvez commencer le stage dès le 22 Juin.";
      let textRes = "Vous pouvez commencer le stage dès le " + getInternStartDate();
      let responseObj = getFulfillmentResponseFormat(defaultRes, textRes);
      res.status(200).json(responseObj)
    }else if(action === "getInternEndDate"){
      let defaultRes = "Normalement, le stage devrait finir à la fin du mois d'Août mais possibilité de faire un avenant pour le continuer en Septembre avant la rentrée.";
      let textRes = "Normalement, le stage devrait finir à la fin du mois d'Août y compris "+getInternEndDate()+" mais possibilité de faire un avenant pour le continuer en Septembre avant la rentrée.";
      let responseObj = getFulfillmentResponseFormat(defaultRes, textRes);
      res.status(200).json(responseObj)
    }else if(action === "getFinalReportDate"){
      let defaultRes = "Le rapport final est à rendre à la fin d'août";
      let textRes = "Le rapport final est à rendre à la fin d'août y compris "+getFinalReportDate();
      let responseObj = getFulfillmentResponseFormat(defaultRes, textRes);
      res.status(200).json(responseObj)
    }else if(action === "getFinalReportPlace"){
      let defaultRes = "Vous devez envoyer le rapport final à Mdm Diane Lingrand par mail";
      let textRes = "Vous devez envoyer le rapport final à Mdm Diane Lingrand par mails: "+getFinalReportPlace();
      let responseObj = getFulfillmentResponseFormat(defaultRes, textRes);
      res.status(200).json(responseObj)
    }else if(action === "verifInternStartDate"){
      //Fulfillment params
      let date = req.body.queryResult.parameters.date;

      let defaultRes = "iduno";
      let textRes = checkInternStartDate(date);
      let responseObj = getFulfillmentResponseFormat(defaultRes, textRes);
      res.status(200).json(responseObj)
    }else if(action === "verifInternEndDate"){
      //Fulfillment params
      let startDate = req.body.queryResult.parameters.startDate;
      let finalDate = req.body.queryResult.parameters.finalDate;

      let defaultRes = "iduno";
      let textRes = checkInternEndDate(startDate, finalDate);
      let responseObj = getFulfillmentResponseFormat(defaultRes, textRes);
      res.status(200).json(responseObj)
      }else if(action === "getInfoGeneral") {
      let defaultRes = "get intern info generale default";
      let textRes = "Intern report info generale:  " + getIternInfoGenerale();
      let responseObj = getFulfillmentResponseFormat(defaultRes, textRes);
      res.status(200).json(responseObj)
    }else if(action === "getConventionProcedure") {
      let defaultRes = "get convention process default";
      let textRes = "Convention process:  " + getConventionProcess();
      let responseObj = getFulfillmentResponseFormat(defaultRes, textRes);
      res.status(200).json(responseObj)
    }else if(action === "getConventionSignataire") {
      let defaultRes = "get convention signataire default";
      let textRes = "Convention signataire:  " + getConventionSignataire();
      let responseObj = getFulfillmentResponseFormat(defaultRes, textRes);
      res.status(200).json(responseObj)
    }else if(action === "getInfoAdminFinStage") {
      let defaultRes = "A la fin du stage il vous faut de rendre le rapport";
      let textRes = "A la fin du stage il vous faut de rendre le rapport à " + getFinalReportPlace() + " avant le " + getFinalReportDate();
      let responseObj = getFulfillmentResponseFormat(defaultRes, textRes);
      res.status(200).json(responseObj)
    }else if(action === "getInfoSujetValidation") {
      let defaultRes = "Afin de valider le sujet de stage, vous devez contacter avec le responsable";
      let textRes = "Afin de valider stage, vous devez contacter avec " + getConventionSignataire();
      let responseObj = getFulfillmentResponseFormat(defaultRes, textRes);
      res.status(200).json(responseObj)
    }else if(action === "getInfoStageEtranger") {
      let defaultRes = "Afin de valider l'expérience à l'étranger, vous avez besoin de faire l'étude l'étranger pendant au moins une semestre ou de valider le stage à l'étranger pendant au moins 10 semaines";
      let textRes = "Afin de valider l'expérience à l'étranger, vous avez besoin de faire l'étude l'étranger pendant au moins une semestre ou de valider le stage à l'étranger pendant au moins 10 semaines";
      let responseObj = getFulfillmentResponseFormat(defaultRes, textRes);
      res.status(200).json(responseObj)
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


// Chatbot-survey
router.post('/webhook/survey', (req, res) => {
  try {
    let action = req.body.queryResult.action;

    if(action === "testwebhook"){
      console.log("ok action testwebhook")
    }else if(action === "surveyGetInternEndDate"){
      let defaultRes = "get intern end date default";
      let textRes = "Intern end date:  "+getInternEndDate()+" - Would you like to modify?";
      let responseObj = getFulfillmentResponseFormat(defaultRes, textRes);
      res.status(200).json(responseObj)
    }else if(action === "surveyModifyInternEndDate"){
      let endDateToModify = new Date(req.body.queryResult.parameters.endDateToModify);
      modifyEndDate(endDateToModify);
      let defaultRes = "modify intern end date default";
      let textRes = "Intern end date modified:  "+getInternEndDate();
      let responseObj = getFulfillmentResponseFormat(defaultRes, textRes);
      res.status(200).json(responseObj)
    }else if(action === "surveyGetInternStartDate"){
      let defaultRes = "get intern start date default";
      let textRes = "Intern start date:  "+getInternStartDate()+" - Would you like to modify?";
      let responseObj = getFulfillmentResponseFormat(defaultRes, textRes);
      res.status(200).json(responseObj)
    }else if(action === "surveyModifyInternStartDate"){
      let startDateToModify = new Date(req.body.queryResult.parameters.startDateToModify);
      modifyStartDate(startDateToModify);
      let defaultRes = "modify intern start date default";
      let textRes = "Intern start date modified:  "+getInternStartDate();
      let responseObj = getFulfillmentResponseFormat(defaultRes, textRes);
      res.status(200).json(responseObj)
    }else if(action === "surveyGetInternReportDate"){
      let defaultRes = "get intern report date default";
      let textRes = "Intern report date:  "+getFinalReportDate()+" - Would you like to modify?";
      let responseObj = getFulfillmentResponseFormat(defaultRes, textRes);
      res.status(200).json(responseObj)
    }else if(action === "surveyModifyInternReportDate"){
      let reportDateToModify = new Date(req.body.queryResult.parameters.reportDateToModify);
      modifyReportDate(reportDateToModify);
      let defaultRes = "modify intern report date default";
      let textRes = "Intern report date modified:  "+getFinalReportDate();
      let responseObj = getFulfillmentResponseFormat(defaultRes, textRes);
      res.status(200).json(responseObj)
    }else if(action === "surveyGetInternReportPlace") {
      let defaultRes = "get intern report place default";
      let textRes = "Intern report place:  " + getFinalReportPlace() + " - Would you like to modify?";
      let responseObj = getFulfillmentResponseFormat(defaultRes, textRes);
      res.status(200).json(responseObj)
    }else if(action === "surveyModifyInternReportPlace"){
      let reportPlaceToModify = req.body.queryResult.parameters.reportPLaceToModify;
      modifyReportPlace(reportPlaceToModify);
      let defaultRes = "modify intern report place default";
      let textRes = "Intern report place modified:  "+ getFinalReportPlace();
      let responseObj = getFulfillmentResponseFormat(defaultRes, textRes);
      res.status(200).json(responseObj)
    }else if(action === "surveyGetReportConsignes") {
      let defaultRes = "get intern report instructions default";
      let textRes = "Intern report instructions:  " + getFinalReportInstruction() + " - Would you like to modify?";
      let responseObj = getFulfillmentResponseFormat(defaultRes, textRes);
      res.status(200).json(responseObj)
    }else if(action === "surveyModifyReportConsignes"){
      let url = req.body.queryResult.parameters.consigneURL;
      modifyReportInstruction(url);
      let defaultRes = "modify intern report instructions default";
      let textRes = "Intern report instructions modified:  "+ getFinalReportInstruction();
      let responseObj = getFulfillmentResponseFormat(defaultRes, textRes);
      res.status(200).json(responseObj)
    }else if(action === "surveyGetInfoGeneral") {
      let defaultRes = "get intern info generale default";
      let textRes = "Intern report info generale:  " + getIternInfoGenerale() + " - Would you like to modify?";
      let responseObj = getFulfillmentResponseFormat(defaultRes, textRes);
      res.status(200).json(responseObj)
    }else if(action === "surveyModifyInfoGeneral"){
      let url = req.body.queryResult.parameters.infoGeneralURL;
      modifyInternInfoGenerale(url);
      let defaultRes = "modify intern info generale default";
      let textRes = "Intern report info generale modified:  "+ getIternInfoGenerale();
      let responseObj = getFulfillmentResponseFormat(defaultRes, textRes);
      res.status(200).json(responseObj)
    }else if(action === "surveyGetConventionSignataire") {
      let defaultRes = "get convention signataire default";
      let textRes = "Convention signataire:  " + getConventionSignataire() + " - Would you like to modify?";
      let responseObj = getFulfillmentResponseFormat(defaultRes, textRes);
      res.status(200).json(responseObj)
    }else if(action === "surveyModifyConventionSignataire"){
      let responsable = req.body.queryResult.parameters.signataireEmail;
      modifyConventionSignataire(responsable);
      let defaultRes = "modify convention signataire default";
      let textRes = "Convention signataire modified:  "+ getConventionSignataire();
      let responseObj = getFulfillmentResponseFormat(defaultRes, textRes);
      res.status(200).json(responseObj)
    }else if(action === "surveyGetConventionProcedure") {
      let defaultRes = "get convention process default";
      let textRes = "Convention process:  " + getConventionProcess() + " - Would you like to modify?";
      let responseObj = getFulfillmentResponseFormat(defaultRes, textRes);
      res.status(200).json(responseObj)
    }else if(action === "surveyModifyConventionProcedure"){
      let url = req.body.queryResult.parameters.conventionURL;
      modifyConventionProcess(url);
      let defaultRes = "modify convention process default";
      let textRes = "Convention process modified:  "+ getConventionProcess();
      let responseObj = getFulfillmentResponseFormat(defaultRes, textRes);
      res.status(200).json(responseObj)
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



function getStringDate(param){
  console.log(param.toString());
  let date = param.getDate();
  let month = param.getMonth()+1;
  let year = param.getFullYear();
  return year.toString()+ "-" + month.toString()+ "-" + date.toString();
}

function getInternStartDate(){
  return getStringDate(_internStartDate);
}

function getInternEndDate(){
  return getStringDate(_internEndDate);
}

function getFinalReportDate(){
  return getStringDate(_finalReportdDate);
}

function getFinalReportPlace(){
  return _finalReportPlace;
}

function getFinalReportInstruction(){
  return _finalReportInstruction;
}

function getIternInfoGenerale(){
  return _internInfoGenerale;
}

function getConventionSignataire(){
  return _conventionSignataire;
}

function getConventionProcess(){
  return _conventionProcess;
}

/*
* 1st require: après 22/06
* 2nd require: duration >= 10 weeks
* */
function checkInternStartDate(startDate){
  let schoolDate = new Date('2020-09-05T00:00');
  let sdate = new Date(startDate);
  sdate.setFullYear(2020);

  if(sdate > _internStartDate){
    let fdate = new Date(sdate);
    fdate.setDate(sdate.getDate() + 10*7);

    if(fdate <= schoolDate){
      return "Oui vous pouvez commencer le stage à la date indiquée et réaliser pendant 10 semaines en minimum. Dans le cas le durée de stage est plus que 10 semaines, il vous faut faire un avenant"
    }else{
      return "Afin de faire le stage à la date indiquée pendant un durée minimum de 10 semaines, il vous faut faire un avenant";
    }
  }else{
    return "Vous ne pouvez pas faire le stage avant la date début officielle étant " + getInternStartDate();
  }
}

/*
* 1st require: final date < back to school date
* 2nd require: duration >= 10 weeks
* */
function checkInternEndDate(startDate, finalDate){
  let schoolDate = new Date('2020-09-05T00:00');
  let sdate = new Date(startDate);
  sdate.setFullYear(2020);
  let fdate = new Date(finalDate);
  let diff = Math.abs(fdate - sdate);
  let diffDays = Math.ceil(diff / (24 * 60 * 60 * 1000));
  let durationWeeks = Math.floor(diffDays/7);
  let durationDays = diffDays - durationWeeks*7;

  if(fdate < schoolDate){
    if(durationWeeks >= 10) {
      return "Oui, vous pouvez finir le stage à la date indiquée ce qui signifie que la durée de stage sera " +durationWeeks +" semaines et "+durationDays +" jours"
    }else{
      return "La durée de stage minimum est de 10 semaines.";
    }
  }else{
    return "Votre stage est terminé après la date de rentrée scolaire étant  " + schoolDate.getFullYear().toString()+ "-" + (schoolDate.getMonth()+1).toString()+ "-" + schoolDate.getDate().toString() +". Afin de continuer votre stage, il vous faut faire un avenant";
  }
}

function modifyEndDate(date){
  _internEndDate = new Date(date);
}

function modifyStartDate(date){
  _internStartDate = new Date(date);
}

function modifyReportDate(date){
  _finalReportdDate = new Date(date);
}

function modifyReportPlace(place){
  _finalReportPlace = place;
}

function modifyReportInstruction(url){
  _finalReportInstruction = url;
}

function modifyInternInfoGenerale(url){
  _internInfoGenerale= url;
}

function modifyConventionSignataire(email){
  _conventionSignataire = email;
}

function modifyConventionProcess(url){
  _conventionProcess = url;
}

function getFulfillmentResponseFormat(defaultRes, textRes){
  return {
    "fulfillmentText": defaultRes,
    "fulfillmentMessages": [
      {
        "text": {
          "text": [
            textRes
          ]
        }
      }
    ],
  };
}


module.exports = router;
