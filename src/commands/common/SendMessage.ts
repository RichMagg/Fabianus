import { ApplicationCommandOptionType, ApplicationCommandType, ChannelType, MessageFlags, TextChannel } from "discord.js";
import { Command } from "../../types/Commands";

export default new Command({
    name: "mensagem",
    description: "Manda uma mensagem em um canal de texto.",
    type: ApplicationCommandType.ChatInput,
    options: [
        {
            name: "channel",
            description: "O canal que você quer enviar a mensagem.",
            type: ApplicationCommandOptionType.Channel,
            required: true,
            channelTypes: [ ChannelType.GuildText, ChannelType.AnnouncementThread ]
        },
        {
            name: "message",
            description: "A mensagem que você quer enviar.",
            type: ApplicationCommandOptionType.String,
            required: true
        }
    ],
    async run({interaction, options}) {
        const channel = options.getChannel("channel", false);
        const message = options.getString("message", true);

        if (channel instanceof TextChannel) {
            await channel.send(`${message}`);
        }

        interaction.reply({ flags: [MessageFlags.Ephemeral], content: "Mensagem enviada!" });
    }
});