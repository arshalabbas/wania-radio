const { MessageEmbed } = require('discord.js');

module.exports = {
  name: "ping",
  cooldown: 3,
  description: "Show the bot's average ping",
  execute(message) {
    const permissions = message.channel.permissionsFor(message.client.user);
    const loaidngEm = "<a:spect:802865740059377704>"
    const emoji = "<a:music:802866736152051712>";
    const pingEmb = new MessageEmbed()
      .setTitle("My Latency")
    pingEmb.setDescription(`${loaidngEm} Loading...`);
    message.channel.send(pingEmb)
      .then(msg => {
        const ping = Math.round(message.client.ws.ping);
        pingEmb.setColor(16747679);
        pingEmb.setDescription(`${emoji} ${ping} ms`);
        msg.edit(pingEmb);
      })
      .catch(console.error);
  }
};