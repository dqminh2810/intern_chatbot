
exports.getFulfillmentResponseFormat = function(defaultRes, textRes){
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
};


exports.getStringDate = function (param){
  console.log(param.toString());
  let date = param.getDate();
  let month = param.getMonth()+1;
  let year = param.getFullYear();
  return year.toString()+ "-" + month.toString()+ "-" + date.toString();
};


/*
* 1st require: après 22/06
* 2nd require: duration >= 10 weeks
* */
exports.checkInternStartDate = function(startDate){
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
};


/*
* 1st require: final date < back to school date
* 2nd require: duration >= 10 weeks
* */
exports.checkInternEndDate = function(startDate, finalDate){
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
};
