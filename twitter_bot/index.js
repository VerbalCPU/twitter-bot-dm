//Author : Manos Chalvatzopoulos
//Title  : Over-simplified DM Twitter Bot

// Include the package and the API keys
const Twit = require('twit');
const config = require('./config.js');

let T = new Twit(config);

let stream = T.stream('user');

//on 'follow' event send a DM
stream.on('follow', followed);

//the callback function for the 'follow' event
function followed(pmsg) {
  console.log("Follow Event!");
  let screenName = pmsg.source.screen_name;
  let msg ="Thank you for following me, I wish you a good day!";
  send_twitter_dm(screenName,msg);
  console.log("done");
}

//the DM function
function send_twitter_dm(username, message) {

  let details = {
    screen_name: username,
    text: message
  }

  function errorHandling(err, data, response) {
    if (err) {
      console.log('Error:', err);
    }
    else {
      console.log('Everything is Fine');
    }
  }

  T.post('direct_messages/new', details, errorHandling);

}
