// index.ts
// main entry point for the bot

import { Client, GatewayIntentBits } from "discord.js";
import * as dotenv from "dotenv";

import { runLog, errorLog, log } from "./utils/logger.js";
import interactionCreateHandler from "./handlers/interactionCreate.js";

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// fix __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

export const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.MessageContent
    ]
});

runLog('bot started');

client.once("ready", () => {
    runLog(`logged in as ${client.user?.tag}`);
});

// load commands
const commands = new Map();

const commandsPath = path.join(__dirname, "commands");
const commandFiles = fs.readdirSync(commandsPath);

for (const file of commandFiles) {
    const command = await import(`./commands/${file}`);
    commands.set(command.data.name, command);
}

// handlers
interactionCreateHandler(client, commands);

// login
client.login(process.env.BOT_TOKEN).catch((error) => {
    errorLog(error, "login error");
});