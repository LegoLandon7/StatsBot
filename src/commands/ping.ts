import { SlashCommandBuilder } from "discord.js";

export const data = new SlashCommandBuilder()
    .setName("ping")
    .setDescription("gets StatsBot's latency")

export async function execute(interaction: any) {
    await interaction.reply("pong!");
}