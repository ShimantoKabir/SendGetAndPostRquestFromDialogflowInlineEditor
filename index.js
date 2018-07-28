'use strict';
 
const functions = require('firebase-functions');
var admin = require("firebase-admin");
var req = require('request');

admin.initializeApp({
  credential: admin.credential.applicationDefault(),
  databaseURL: '--- your firebase database url ---'
});

process.env.DEBUG = 'dialogflow:debug'; // enables lib debugging statements

exports.dialogflowFirebaseFulfillment = functions.https.onRequest((request, response) => {
    
    console.log("Request Header "+JSON.stringify(request.header));
    console.log("Request Body "+JSON.stringify(request.body));
    
    let action = request.body.result.action;
    const parameters = request.body.result.parameters;
    
    let responseJson = {};
    
    const actionHandlers = {
        
        'GetEntities': () => {
            getResponse();
        }

    };
    
    function getResponse(){
        
        var options = {
          url: 'https://api.dialogflow.com/v1/entities/274cb16b-61fc-4e62-883d-eb5fee4a6b0f?v=20150910',
          method: "GET",
          headers: {
            "Authorization" : "Bearer --- your developer access token ----",
            "content-type": "application/json",  
          }
        };

        function callback(err, res, bdy) {
          if (!err && res.statusCode == 200) {
              
            var info = JSON.parse(bdy);
            console.log(info);
            console.log(info);
            
            responseJson.speech = JSON.stringify(bdy);
            response.json(responseJson);
            
          }
        }
        
        req(options, callback);
        
    }
    
    console.log('action:', action);
    if (!actionHandlers[action]) {
        action = 'default';
    }
    
    actionHandlers[action]();
    
});





