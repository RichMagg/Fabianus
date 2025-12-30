import type { CommandInteractionOptionResolver } from "discord.js";
import { client } from "../../Main";
import { Event } from "../../types/Event";
import type { CommandInteractionType } from "../../types/Commands";

export default new Event({
    name: "interactionCreate",
    run(interaction) {
        if (!interaction.isCommand()) return;
        const command = client.commands.get(interaction.commandName);

        if (!command) return;
        const options = ("options" in interaction) ? (interaction.options as CommandInteractionOptionResolver) : null;

        command.run({ client, options: options as CommandInteractionOptionResolver, interaction: interaction as CommandInteractionType });
    }
});