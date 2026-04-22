import { Client, Message } from "discord.js";
import { errorLog } from "../utils/logger.js";
import { incrementGuild } from "../stats/statsCache.js";
import { addXP } from "../utils/leveling.js";

export default function messageCreateHandler(client: Client) {
    client.on("messageCreate", (message: Message) => {
        if (!message.inGuild()) return;

        const { guildId, author } = message;

        try {
            incrementGuild(guildId, author.id);
            if (!author.bot) addXP(author.id, guildId, 1);
        } catch (err) {
            errorLog(err, `messageCreate | guild:${guildId} user:${author.id}`);
        }
    });
}