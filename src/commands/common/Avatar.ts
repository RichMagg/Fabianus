import { ApplicationCommandType, MessageFlags } from "discord.js";
import { Command } from "../../types/Commands";

export default new Command({
    name: "Ver avatar",
    type: ApplicationCommandType.User,
    run({ interaction, options }) {
        if (!interaction.isUserContextMenuCommand()) return;
        const avatarUrl = interaction.targetUser.displayAvatarURL({ size: 512 });

        interaction.reply({ flags: [MessageFlags.Ephemeral], content: `${avatarUrl}` });
    }
});