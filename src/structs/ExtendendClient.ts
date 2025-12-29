import { Client, Collection, GatewayIntentBits, type ApplicationCommandDataResolvable, type ClientEvents } from "discord.js";
import { config } from "../Config";
import type { CommandType, ComponentsButton, ComponentsModal, ComponentsSelect } from "../types/Commands";
import path from "node:path";
import { readdirSync } from "node:fs";
import type { EventType } from "../types/Event";

export class ExtendedClient extends Client {
    public commands: Collection<string, CommandType> = new Collection();
    public buttons: ComponentsButton = new Collection();
    public selects: ComponentsSelect = new Collection();
    public modals: ComponentsModal = new Collection();

    private commandsPath = path.join(__dirname, "..", "commands");
    private eventsPath = path.join(__dirname, "..", "events");
    private fileCondition = (fileName: string) => fileName.endsWith(".ts") || fileName.endsWith(".js");

    constructor() {
        super({
            intents: [
                GatewayIntentBits.Guilds,
                GatewayIntentBits.GuildMessages,
                GatewayIntentBits.MessageContent,
                GatewayIntentBits.GuildMembers,
                GatewayIntentBits.GuildVoiceStates,
                GatewayIntentBits.GuildPresences
            ]
        });
    }

    public start() {
        this.registerModules();
        this.registerEvents();
        this.login(config.discordToken);
    }

    private registerCommands(commands: Array<ApplicationCommandDataResolvable>) {
        this.application?.commands.set(commands)
            .then(() => {
                console.log(`✅ Slash Commands registrados!`);
            })
            .catch((error) => {
                console.log(`❌ Erro ao registrar Slash Commands: ${error}`);
            });
    }

    private registerModules() {
        const slashCommands: Array<ApplicationCommandDataResolvable> = new Array();

        readdirSync(this.commandsPath)
            .forEach(local => {
                readdirSync(this.commandsPath + `/${local}/`)
                    .filter(this.fileCondition)
                    .forEach(async fileName => {
                        const command: CommandType = (await import(`../commands/${local}/${fileName}`))?.default;
                        const { name, buttons, selects, modals } = command;

                        if (name) {
                            this.commands.set(name, command);
                            slashCommands.push(command);

                            if (buttons) 
                                buttons.forEach((run, key) => this.buttons.set(key, run));
                            if (selects) 
                                selects.forEach((run, key) => this.selects.set(key, run));
                            if (modals) 
                                modals.forEach((run, key) => this.modals.set(key, run));
                        }
                    })
            });
        
        this.on("clientReady", () => this.registerCommands(slashCommands));
    }
    
    private registerEvents() {
        readdirSync(this.eventsPath)
            .forEach(local => {
                readdirSync(this.eventsPath + `/${local}/`)
                    .filter(this.fileCondition)
                    .forEach(async fileName => {
                        const { name, once, run }: EventType<keyof ClientEvents> = (await import(`../events/${local}/${fileName}`))?.default;

                        try {
                            if (name) (once) ? this.once(name, run) : this.on(name, run);
                            
                            console.log(`✅ Evento ${name} registrado com sucesso!`);
                        } catch (error) {
                            console.log(`❌ Erro ao registrar evento ${name}: ${error}`)
                        }
                    })
            });
    }
}