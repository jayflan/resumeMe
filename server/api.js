const express = require('express');
const path = require('path');

const app = express();

app.use(express.static(path.join(__dirname, "..", "public")));

const checkWebsiteStatus = async(url) => {
    try {
  
      const response = await fetch(url);
        if(response.status === 200) {
          console.log(url + ' is up and running!');
        } else {
          console.log(url + ` is responding with ${response.status} status.`);
        };
      
    } catch(err) {
  
      console.log('ERROR---> ',err);
  
    };
};

//middleware build
const websiteStatusMiddleware = (req, res, next) => {
  console.log('Inside-->', 'websiteCheckMiddleware')
  const websiteUrl = 'null'; //todo Refactor to simplify url input
  let intervalId; //To store interval ID value
  
  const checkAndHandleError = async() => {
    console.log('Inside-->', 'checkAndHandleError')
    try {
  
      await checkWebsiteStatus(websiteUrl);
      
    } catch(err) {
  
      console.log('Website status check failed: ',err);
      clearInterval(intervalId); // Stop interval on error
  
    };
    
  };

  //execute function immediatly
  checkAndHandleError();
  //set interval
  intervalId = setInterval(checkAndHandleError, 15 * 60 * 1000);
  // next();

};

//use middleware
// app.use(websiteStatusMiddleware);
websiteStatusMiddleware();




//test run
// checkWebsiteStatus('https://poshleaf.onrender.com');
// checkWebsiteStatus('https://podify-uih9.onrender.com');
// checkWebsiteStatus('null');



module.exports = app;
