
/*
'use strict';
const Lien = require('../../models/lien.model');
const Utils = require('./utils');


exports.crudForm = function(req, res) {
    res.render('/src/views/lien.html');
};
exports.findAll = function(req, res) {
Lien.findAll(function(err, lien) {
  console.log('controller')
  if (err)
  res.send(err);
  console.log('res', lien);
  res.send(lien);
});
};
exports.create = function(req, res) {
const new_lien = new Lien(req.body);
//handles null error
if(req.body.constructor === Object && Object.keys(req.body).length === 0){
  res.status(400).send({ error:true, message: 'Please provide all required field' });
}else{
Lien.create(new_lien, function(err, lien) {
  if (err)
  res.send(err);
  res.json({error:false,message:"Lien added successfully!",data:lien});
});
}
};
exports.findById = function(req, res) {
Lien.findById(req.params.id, function(err, lien) {
  if (err)
  res.send(err);
  res.json(lien);
});
};
exports.update = function(req, res) {
  if(req.body.constructor === Object && Object.keys(req.body).length === 0){
    res.status(400).send({ error:true, message: 'Please provide all required field' });
  }else{
    Lien.update(req.params.id, new Lien(req.body), function(err, lien) {
   if (err)
   res.send(err);
   res.json({ error:false, message: 'Lien successfully updated' });
});
}
};
exports.delete = function(req, res) {
Lien.delete( req.params.id, function(err, lien) {
  if (err)
  res.send(err);
  res.json({ error:false, message: 'Lien successfully deleted' });
});
};
*/




/* TEST GETTING attribute's model */
/*
exports.getTestById = function(id, res) {
  Lien.findById(id, function(err, lien) {
    if (err)
      res.send(err);
    console.log(lien);
    console.log(lien[0].titre);
    res.json(lien[0].titre);
  });
};
exports.getTestByYear = function(year, res) {
  Lien.findByYear(year, function(err, lien) {
    if (err)
      res.send(err);
    console.log(lien);
    console.log(lien[0].titre);
    res.json(lien[0].titre);
  });
};
exports.getTestByTitreAndYear = function(titre, year, res) {
  Lien.findByTitreAndYear(titre, year, function(err, lien) {
    if (err)
      res.send(err);
    console.log(lien);
    console.log(lien[0].titre);
    res.json(lien[0].titre);
  });
};
*/
/* TEST UPDATE attribute's model */
/*
exports.updateTest = function(id, res) {
  Lien.findById(id, function(err, lien) {
    if (err)
      res.send(err);
    console.log(lien);
    lien[0].url = 'www.sdsd.com';
    //anneeScolaire[0].responsableStage = 'test2';
    //anneeScolaire[0].signataireConvention = 'test2';
    Lien.update(id, new Lien(lien[0]), function(err, tmp) {
      if (err)
        res.send(err);
      res.json({ error:false, message: 'Lien successfully updated' });
    });

  });
};
/* TEST CREATE entity model */
/*
exports.createTest1 = function(req, res) {
  const tmp = {
    anneeScolaire: 1,
    titre: 'report-consigne',
    url: 'url-report-consigne',
    emplacement: 'test-report-consigne',
  };

  const new_lien = new Lien(tmp);

  Lien.create(new_lien, function(err, lien) {
    if (err)
      res.send(err);
//   res.redirect('/procedure/')
    res.json({error:false,message:"Lien added successfully!",data:lien});
  });
};
exports.createTest2 = function(req, res) {
  const tmp = {
    anneeScolaire: 1,
    titre: 'info-general',
    url: 'url-info-general',
    emplacement: 'test-info-general',
  };

  const new_lien = new Lien(tmp);

  Lien.create(new_lien, function(err, lien) {
    if (err)
      res.send(err);
//   res.redirect('/procedure/')
    res.json({error:false,message:"Lien added successfully!",data:lien});
  });
};
*/

/* CHAT BOT STAGE*/
/*
exports.getInternInfoGeneral = function(titre, year, res) {
  Lien.findByTitreAndYear(titre, year, function(err, lien) {
    let defaultRes = "get intern info generale default";
    let textRes = "Intern report info generale:  " + lien[0].url;
    let responseObj = Utils.getFulfillmentResponseFormat(defaultRes, textRes);
    res.status(200).json(responseObj)
  });
};
*/
/* CHAT BOT SURVEY */
/* GETTER */
/*
exports.getSurveyReportConsignes = function(titre, year, res) {
  Lien.findByTitreAndYear(titre, year, function(err, lien) {
    let defaultRes = "get intern report instructions default";
    let textRes = "Intern report instructions:  " + lien[0].url + " - Would you like to modify?";
    let responseObj = Utils.getFulfillmentResponseFormat(defaultRes, textRes);
    res.status(200).json(responseObj)
  });
};

exports.getSurveyInfoGeneral = function(titre, year, res) {
  Lien.findByTitreAndYear(titre, year, function(err, lien) {
    let defaultRes = "get intern info generale default";
    let textRes = "Intern report info generale:  " + lien[0].url + " - Would you like to modify?";
    let responseObj = Utils.getFulfillmentResponseFormat(defaultRes, textRes);
    res.status(200).json(responseObj)
  });
};

*/
/* SETTER */
/*
exports.modifyReportConsines = function(titre, year, req, res) {
  Lien.findByTitreAndYear(titre, year, function(err, lien) {
    if (err)
      res.send(err);
    console.log(lien);
    lien[0].url = req.body.queryResult.parameters.consigneURL;
    Lien.update(lien[0].id, new Lien(lien[0]), function(err, tmp) {
      if (err)
        res.send(err);
      let defaultRes = "modify intern report instructions default";
      let textRes = "Intern report instructions modified:  "+ lien[0].url;
      let responseObj = Utils.getFulfillmentResponseFormat(defaultRes, textRes);
      res.status(200).json(responseObj)
    });
  });
};

exports.modifyInfoGeneral = function(titre, year, req, res) {
  Lien.findByTitreAndYear(titre, year, function(err, lien) {
    if (err)
      res.send(err);
    console.log(lien);
    lien[0].url = req.body.queryResult.parameters.infoGeneralURL;
    Lien.update(lien[0].id, new Lien(lien[0]), function(err, tmp) {
      if (err)
        res.send(err);
      let defaultRes = "modify intern info generale default";
      let textRes = "Intern report info generale modified:  "+ lien[0].url;
      let responseObj = Utils.getFulfillmentResponseFormat(defaultRes, textRes);
      res.status(200).json(responseObj)
    });
  });


};

*/
