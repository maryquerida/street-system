const { Client, GatewayIntentBits } = require("discord.js");

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers
  ]
});

client.once("ready", () => {
  console.log(`Bot online como ${client.user.tag}`);
});

client.on("messageCreate", (message) => {
  if (message.author.bot) return;

  // comando ping
  if (message.content === "ping") {
    message.reply("pong");
  }

  // comando set (dar cargo)
  if (message.content.startsWith("set")) {
    if (!message.member.permissions.has("ManageRoles")) {
      return message.reply("Você não tem permissão.");
    }

    const member = message.mentions.members.first();
    if (!member) {
      return message.reply("Marca um usuário. Ex: set @user");
    }

    const role = message.guild.roles.cache.find(r => r.name === "Membro");
    if (!role) {
      return message.reply("Crie o cargo 'Membro' no Discord.");
    }

    member.roles.add(role);
    message.reply(`Cargo dado para ${member.user.username}`);
  }
});

client.login(process.env.TOKEN);
