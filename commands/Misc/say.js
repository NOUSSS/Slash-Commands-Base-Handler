module.exports = {

    name: "say",
    description: "Permet de faire parler le bot.",

    options: [
        {
            name: "texte",
            description: "Le texte a envoyer.",
            type: 3,
            required: true,
        },
    ],

    run: (interaction, client) => {

        const text = interaction.options.getString('texte');

        interaction.reply({ content: text });

    },

};