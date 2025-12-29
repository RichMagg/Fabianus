import type { ApplicationCommandData, ButtonInteraction, ChatInputCommandInteraction, Collection, UserContextMenuCommandInteraction, MessageContextMenuCommandInteraction, CommandInteractionOptionResolver, ModalSubmitInteraction, StringSelectMenuInteraction } from "discord.js";
import type { ExtendedClient } from "../structs/ExtendendClient";

export type CommandInteractionType = 
    | ChatInputCommandInteraction 
    | UserContextMenuCommandInteraction 
    | MessageContextMenuCommandInteraction;

export interface CommandProps {
    client: ExtendedClient,
    interaction: CommandInteractionType,
    options: CommandInteractionOptionResolver
}

export type ComponentsButton = Collection<string, (interaction: ButtonInteraction) => any>;
export type ComponentsSelect = Collection<string, (interaction: StringSelectMenuInteraction) => any>;
export type ComponentsModal = Collection<string, (interaction: ModalSubmitInteraction) => any>;

export interface CommandComponents {
    buttons?: ComponentsButton,
    selects?: ComponentsSelect,
    modals?: ComponentsModal
}

export type CommandType = ApplicationCommandData & CommandComponents & {
    run(props: CommandProps): any;
}

export class Command {
    constructor(options: CommandType) {
        options.dmPermission = false;
        Object.assign(this, options);
    }
}