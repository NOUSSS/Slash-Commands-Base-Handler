module.exports = {

    name: "ping",
    description: "Donne le ping du bot.",

    run: async (interaction, client) => {

        interaction.reply({ content: `🏓 Pong\n\`${client.ws.ping}\` MS!` });

    },

};