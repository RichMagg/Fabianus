import { config as loadEnv } from "dotenv";

loadEnv(); 

interface BotConfig {
    discordToken: string;
}

if (!process.env.DISCORD_TOKEN) {
    throw new Error("❌ Variável de ambiente DISCORD_TOKEN não encontrada!");
}

export const config: BotConfig = {
    discordToken: process.env.DISCORD_TOKEN
};