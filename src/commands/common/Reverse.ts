import { ApplicationCommandType, MessageFlags } from "discord.js";
import { Command } from "../../types/Commands";

export default new Command({
    name: "Inverter mensagem",
    type: ApplicationCommandType.Message,
    run({ interaction, options }) {
        if (!interaction.isMessageContextMenuCommand()) return;
        const invertedMessage = interaction.targetMessage.content.split("").reverse().join("");

        interaction.reply({ flags: [MessageFlags.Ephemeral], content: invertedMessage });
    }
});