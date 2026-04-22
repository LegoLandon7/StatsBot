import { Client, GatewayIntentBits } from "discord.js";
import dotenv from "dotenv";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { runLog, errorLog } from "./utils/logger.js";
import interactionCreateHandler from "./handlers/interactionCreate.js";
import messageCreateHandler from "./handlers/messageCreate.js";
import voiceStateUpdateHandler from "./handlers/voiceStateUpdate.js";
import { startFlushInterval } from "./stats/statsFlush.js";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildVoiceStates
    ]
});

runLog('bot starting...');

client.once("ready", () => {
    runLog(`logged in as ${client.user?.tag}`);
});

const commands = new Map();
const commandsPath = path.join(__dirname, "commands");
const commandFiles = fs.readdirSync(commandsPath);

for (const file of commandFiles) {
    const command = await import(`./commands/${file}`);
    commands.set(command.data.name, command);
}

interactionCreateHandler(client, commands);
messageCreateHandler(client);
voiceStateUpdateHandler(client);
startFlushInterval();

client.login(process.env.BOT_TOKEN).catch((error) => {
    errorLog(error, "login error");
});