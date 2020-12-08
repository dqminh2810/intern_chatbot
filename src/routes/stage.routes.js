// 'use strict';

const dbConn = require('./../../config/db.config');

module.exports = {
  succesPage: (req, res) => {
    res.render('./../views/succes');// , {
    // title: Welcome
    // });
  },
  addAnneeScolairePage: (req, res) => {
    res.render('anneeScolaire');// , {
    // title: Welcome
    // });
  },
  addAnneeScolaire: (req, res) => {
    console.log('enter method');
    const typesDeStages = req.body.typesDeStages;
    const dureeMinStage = req.body.dureeMinStage;
    const dureeMaxStage = req.body.dureeMaxStage;
    const dateDebutMinStage = req.body.dateDebutMinStage;
    const dateDebutMaxStage = req.body.dateDebutMaxStage;
    const dateFinMinStage = req.body.dateFinMinStage;
    const dateFinMaxStage = req.body.dateFinMaxStage;
    const responsableStage = req.body.responsableStage;
    const signataireConvention = req.body.signataireConvention;


    const annee = req.body.anneeScolaire;
    const dateRenduRapportStage = req.body.dateRenduRapportStage;
    const dateRenduRapportIntermediaireStage = req.body.dateRenduRapportIntermediaireStage;
    const consigneRapport = req.body.consigneRapport;
    const emplacementRenduRapport = req.body.emplacementRenduRapport;
    const emplacementRenduRapportIntermediaire = req.body.emplacementRenduRapportIntermediaire;
    const lienSlidePresentationStage = req.body.lienSlidePresentationStage;
    const procedureSignatureConvention = req.body.procedureSignatureConvention;
    const procedureValidationSujetStage = req.body.procedureValidationSujetStage;
    const actionsAfaireAlaFinDuStage = req.body.actionsAfaireAlaFinDuStage;
    const rdvPourSignatureConvention = req.body.rdvPourSignatureConvention;
    const coupureStage = req.body.coupureStage;
    const stageDansUnLaboratoire = req.body.stageDansUnLaboratoire;
    const numeroArenseignerPourLesConventions = req.body.numeroArenseignerPourLesConventions;
    const stageEtConvention = req.body.stageEtConvention;
    const validationStageParCDD = req.body.validationStageParCDD;
    const contactLorsqueLeStageSePasseMal = req.body.contactLorsqueLeStageSePasseMal;
    const stageEtProjetPersonnel = req.body.stageEtProjetPersonnel;
    const stageEtFreelance = req.body.stageEtFreelance;
    const stageEtTeletravail = req.body.stageEtTeletravail;
    const stageNonInformatique = req.body.stageNonInformatique;
    const stageEtMineure = req.body.stageEtMineure;
    const stageEtEtranger = req.body.stageEtEtranger;
    const stageEtMonaco = req.body.stageEtMonaco;
    const soutenance = req.body.soutenance;


    const created_at = new Date();
    const updated_at = new Date();

    console.log('OK APRES LES LET');

    const anneeScolaireQuery = `SELECT * FROM \`stages\` WHERE anneeScolaire = '${annee}'`;


    db.query(anneeScolaireQuery, (err, result) => {
      console.log('OK EXECUTION REQUETE EN COURS');

      if (err) {
        console.log('ERREUR DEXECUTION');

        return res.status(500).send(err);
      }
      if (result.length > 0) {
        console.log('ANNEE DEJA EXISTANTE');
        message = 'L annee scolaire deja existe deja';
        res.render('anneeScolaire', {
          message,
          // title: Welcome
        });
      } else {
        // send the anneeScolaire details to the database
        console.log('GOODD now, INSERT REQUEST');
        const query = `INSERT INTO \`stages\` (typesDeStages, dureeMinStage, dureeMaxStage, dateDebutMinStage, dateDebutMaxStage, dateFinMinStage, dateFinMaxStage, responsableStage, signataireConvention, anneeScolaire, dateRenduRapportStage, dateRenduRapportIntermediaireStage, consigneRapport, emplacementRenduRapport, emplacementRenduRapportIntermediaire, lienSlidePresentationStage, procedureSignatureConvention, procedureValidationSujetStage, actionsAfaireAlaFinDuStage, rdvPourSignatureConvention, coupureStage, stageDansUnLaboratoire, numeroArenseignerPourLesConventions, stageEtConvention, validationStageParCDD, contactLorsqueLeStageSePasseMal, stageEtProjetPersonnel, stageEtFreelance, stageEtTeletravail, stageNonInformatique, stageEtMineure, stageEtEtranger, stageEtMonaco, soutenance, created_at, updated_at) VALUES ('${

          typesDeStages}', '${
          dureeMinStage}', '${
          dureeMaxStage}', '${
          dateDebutMinStage}', '${
          dateDebutMaxStage}', '${
          dateFinMinStage}', '${
          dateFinMaxStage}', '${
          responsableStage}', '${
          signataireConvention}', '${

          annee}', '${
          dateRenduRapportStage}', '${
          dateRenduRapportIntermediaireStage}', '${
          consigneRapport}', '${
          emplacementRenduRapport}', '${
          emplacementRenduRapportIntermediaire}', '${
          lienSlidePresentationStage}', '${
          procedureSignatureConvention}', '${
          procedureValidationSujetStage}', '${
          actionsAfaireAlaFinDuStage}', '${
          rdvPourSignatureConvention}', '${
          coupureStage}', '${
          stageDansUnLaboratoire}', '${
          numeroArenseignerPourLesConventions}', '${
          stageEtConvention}', '${
          validationStageParCDD}', '${
          contactLorsqueLeStageSePasseMal}', '${
          stageEtProjetPersonnel}', '${
          stageEtFreelance}', '${
          stageEtTeletravail}', '${
          stageNonInformatique}', '${
          stageEtMineure}', '${
          stageEtEtranger}', '${
          stageEtMonaco}', '${
          soutenance}', '${

          created_at}', '${
          updated_at}')`;
        db.query(query, (err, result) => {
          if (err) {
            return res.status(500).send(err);
          }
          res.redirect('/');
        });
      }
    });
  },
  editAnneeScolairePage: (req, res) => {
    const annneScolaireId = req.params.id;
    const query = `SELECT * FROM \`stages\` WHERE id = '${annneScolaireId}' `;
    db.query(query, (err, result) => {
      if (err) {
        return res.status(500).send(err);
      }
      res.render('editAnneeScolaire', {
        // title: Welcome
        /* , */anneeScolaire: result[0],
        message: '',
      });
    });
  },
  editAnneeScolaire: (req, res) => {
    const anneeScolaireId = req.params.id;

    const typesDeStages = req.body.typesDeStages;
    const dureeMinStage = req.body.dureeMinStage;
    const dureeMaxStage = req.body.dureeMaxStage;
    const dateDebutMinStage = req.body.dateDebutMinStage;
    const dateDebutMaxStage = req.body.dateDebutMaxStage;
    const dateFinMinStage = req.body.dateFinMinStage;
    const dateFinMaxStage = req.body.dateFinMaxStage;
    const responsableStage = req.body.responsableStage;
    const signataireConvention = req.body.signataireConvention;


    const annee = req.body.anneeScolaire;
    const dateRenduRapportStage = req.body.dateRenduRapportStage;
    const dateRenduRapportIntermediaireStage = req.body.dateRenduRapportIntermediaireStage;
    const consigneRapport = req.body.consigneRapport;
    const emplacementRenduRapport = req.body.emplacementRenduRapport;
    const emplacementRenduRapportIntermediaire = req.body.emplacementRenduRapportIntermediaire;
    const lienSlidePresentationStage = req.body.lienSlidePresentationStage;
    const procedureSignatureConvention = req.body.procedureSignatureConvention;
    const procedureValidationSujetStage = req.body.procedureValidationSujetStage;
    const actionsAfaireAlaFinDuStage = req.body.actionsAfaireAlaFinDuStage;
    const rdvPourSignatureConvention = req.body.rdvPourSignatureConvention;
    const coupureStage = req.body.coupureStage;
    const stageDansUnLaboratoire = req.body.stageDansUnLaboratoire;
    const numeroArenseignerPourLesConventions = req.body.numeroArenseignerPourLesConventions;
    const stageEtConvention = req.body.stageEtConvention;
    const validationStageParCDD = req.body.validationStageParCDD;
    const contactLorsqueLeStageSePasseMal = req.body.contactLorsqueLeStageSePasseMal;
    const stageEtProjetPersonnel = req.body.stageEtProjetPersonnel;
    const stageEtFreelance = req.body.stageEtFreelance;
    const stageEtTeletravail = req.body.stageEtTeletravail;
    const stageNonInformatique = req.body.stageNonInformatique;
    const stageEtMineure = req.body.stageEtMineure;
    const stageEtEtranger = req.body.stageEtEtranger;
    const stageEtMonaco = req.body.stageEtMonaco;
    const soutenance = req.body.soutenance;


    const created_at = req.body.created_at;
    const updated_at = new Date();

    const query = `UPDATE \`stages\` SET \`typesDeStages\` = '${
      typesDeStages
    }', \`dureeMinStage\` = '${
      dureeMinStage
    }', \`dureeMaxStage\` = '${
      dureeMaxStage
    }', \`dateDebutMinStage\` = '${
      dateDebutMinStage
    }', \`dateDebutMaxStage\` = '${
      dateDebutMaxStage
    }', \`dateFinMinStage\` = '${
      dateFinMinStage
    }', \`dateFinMaxStage\` = '${
      dateFinMaxStage
    }', \`responsableStage\` = '${
      responsableStage
    }', \`signataireConvention\` = '${
      signataireConvention


    }', \`anneeScolaire\` = '${
      annee
    }', \`dateRenduRapportStage\` = '${
      dateRenduRapportStage
    }', \`dateRenduRapportIntermediaireStage\` = '${
      dateRenduRapportIntermediaireStage
    }', \`consigneRapport\` = '${
      consigneRapport
    }', \`emplacementRenduRapport\` = '${
      emplacementRenduRapport
    }', \`emplacementRenduRapportIntermediaire\` = '${
      emplacementRenduRapportIntermediaire
    }', \`lienSlidePresentationStage\` = '${
      lienSlidePresentationStage
    }', \`procedureValidationSujetStage\` = '${
      procedureValidationSujetStage
    }', \`actionsAfaireAlaFinDuStage\` = '${
      actionsAfaireAlaFinDuStage
    }', \`rdvPourSignatureConvention\` = '${
      rdvPourSignatureConvention
    }', \`coupureStage\` = '${
      coupureStage
    }', \`stageDansUnLaboratoire\` = '${
      stageDansUnLaboratoire
    }', \`numeroArenseignerPourLesConventions\` = '${
      numeroArenseignerPourLesConventions
    }', \`stageEtConvention\` = '${
      stageEtConvention
    }', \`validationStageParCDD\` = '${
      validationStageParCDD
    }', \`contactLorsqueLeStageSePasseMal\` = '${
      contactLorsqueLeStageSePasseMal
    }', \`stageEtProjetPersonnel\` = '${
      stageEtProjetPersonnel
    }', \`stageEtFreelance\` = '${
      stageEtFreelance
    }', \`stageEtTeletravail\` = '${
      stageEtTeletravail
    }', \`stageNonInformatique\` = '${
      stageNonInformatique
    }', \`stageEtMineure\` = '${
      stageEtMineure
    }', \`stageEtEtranger\` = '${
      stageEtEtranger
    }', \`stageEtMonaco\` = '${
      stageEtMonaco
    }', \`soutenance\` = '${
      soutenance

    }', \`created_at\` = '${
      created_at
    }', , \`updated_at\` = '${
      updated_at
    }' WHERE \`stages\`.\`id\` = '${anneeScolaireId}'`;
    db.query(query, (err, result) => {
      if (err) {
        return res.status(500).send(err);
      }
      res.redirect('/');
    });
  },

  deleteAnneeScolairePage: (req, res) => {
    const annneScolaireId = req.params.id;
    const query = `SELECT * FROM \`stages\` WHERE id = '${annneScolaireId}' `;
    db.query(query, (err, result) => {
      if (err) {
        return res.status(500).send(err);
      }
      res.render('deleteAnneeScolaire', {
        // title: Welcome
        /* , */anneeScolaire: result[0],
        message: '',
      });
    });
  },
  deleteAnneeScolaire: (req, res) => {
    const anneeScolaireId = req.params.id;
    const deleteAnneeScolaireQuery = `DELETE FROM stages WHERE id = "${anneeScolaireId}"`;

    if (err) {
      return res.status(500).send(err);
    }
    db.query(deleteAnneeScolaireQuery, (err, result) => {
      if (err) {
        return res.status(500).send(err);
      }
      res.redirect('/');
    });
  },
};
