const TwitchPS = require('twitchps');
const fs = require('fs');
const dgram = require('dgram');
const client = dgram.createSocket('udp4');
const dns = require('dns')
require('dotenv').config()


let init_topics = [{topic: `channel-points-channel-v1.${process.env.CHANNELID}`, token: `${process.env.TOKEN}`}];
let ps = new TwitchPS({init_topics: init_topics, reconnect: true, debug: false});

console.log(`Starting Twitch PubSub with channel Id: ${process.env.CHANNELID} and token ${process.env.TOKEN}`)

ps.on('channel-points', (data) => {

  let title = data.redemption.reward.title;
  let user = data.redemption.user.display_name;
  let prompt = data.redemption.reward.prompt;
  executeRedemption(title,user,prompt)
});

function executeRedemption(redemption,user,prompt){
  dns.lookup(`${process.env.HOST}`, function(err, result) {
    switch(redemption){
      case "MC tester":
        console.log("Sending packet...")
        client.send(redemptionFormat(redemption,user,prompt), 25565, result, (err) => {
          client.close();
        });
        break;
    }
  })
}


function redemptionFormat(Redemption,Redeemer,Inputs){
  return JSON.stringify({
    "Redemption" : Redemption,
    "Redeemer" : Redeemer,
    "Inputs" : Inputs
  })
}