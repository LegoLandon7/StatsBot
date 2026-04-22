import { Client, Interaction } from "discord.js";
import { errorLog } from "../utils/logger.js";

export default function interactionCreateHandler(client: Client, commands: Map<string, any>) {
    client.on("interactionCreate", async (interaction: Interaction) => {
        if (!interaction.isChatInputCommand()) return;

        const command = commands.get(interaction.commandName);
        if (!command) return;

        try {
            await command.execute(interaction);
        } catch (err) {
            errorLog(err, `command error: ${interaction.commandName}`);

            if (interaction.replied || interaction.deferred) {
                await interaction.followUp({
                    content: "There was an error executing this command.",
                    ephemeral: true
                });
            } else {
                await interaction.reply({
                    content: "There was an error executing this command.",
                    ephemeral: true
                });
            }
        }
    });
}