// deploy.ts
// deploys all commands from commands/

import { REST, Routes } from "discord.js";
import dotenv from "dotenv";

import fs from "fs";
import path from "path";

import { fileURLToPath } from "url";

import { runLog, errorLog, log } from "../utils/logger.js";

dotenv.config();

// fix __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname  = path.dirname(__filename);

// load commands
const commands: any[] = [];
const commandsPath = path.join(__dirname, "../commands");
const commandFiles = fs.readdirSync(commandsPath);

for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file);
    const command = await import(filePath);

    if ('data' in command) { // only add command if it is valid
        commands.push(command.data.toJSON());
    }
}

// discord REST (api) setup
const rest = new REST({ version: "10" }).setToken(process.env.BOT_TOKEN!);

// deploy commands
(async() => { try {
    log(`deploying ${commands.length} commands...`);

    await rest.put(
        Routes.applicationCommands(process.env.CLIENT_ID!),
        { body: commands }
    );

    runLog('commands deployed')

} catch(error) {
    errorLog(error, 'deploy error');
}})();