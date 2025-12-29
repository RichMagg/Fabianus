import { ApplicationCommandType, MessageFlags } from "discord.js";
import { Command } from "../../types/Commands";

export default new Command({
    name: "ping",
    description: "Responde sua mensagem com \"pong\".",
    type: ApplicationCommandType.ChatInput,
    run({interaction}) {
        interaction.reply({ flags: [ MessageFlags.Ephemeral ], content: "pong!" });
    }
});