const TwitchPS = require('twitchps');
const fs = require('fs');
require('dotenv').config()

console.log(`Starting Twitch PubSub with channel Id: ${process.env.CHANNELID} and token ${process.env.TOKEN}`)

// Initial topics are required
let init_topics = [{topic: `channel-points-channel-v1.${process.env.CHANNELID}`, token: `${process.env.TOKEN}`}];
// Optional reconnect, debug options (Defaults: reconnect: true, debug: false)
var ps = new TwitchPS({init_topics: init_topics, reconnect: true, debug: false});
   
ps.on('channel-points', (data) => {

  let title = data.redemption.reward.title;

  console.log(title);
});

function executeRedemption(redemptionTitle){
  switch(redemptionTitle){
    case "MC tester":
      
      break;
  }
}