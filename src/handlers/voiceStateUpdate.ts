import { Client, VoiceState } from "discord.js";
import { errorLog } from "../utils/logger.js";
import { addVCHours } from "../stats/statsCache.js";

const vcTracker = new Map<string, number>();

export default function voiceStateUpdateHandler(client: Client) {
    client.on("voiceStateUpdate", (oldState: VoiceState, newState: VoiceState) => {
        const userId = newState.member?.id;
        const guildId = newState.guild.id;
        if (!userId) return;

        const key = `${userId}_${guildId}`;

        try {
            if (oldState.channel && !newState.channel) {
                const joinTime = vcTracker.get(key);
                if (joinTime) {
                    const hours = (Date.now() - joinTime) / (1000 * 60 * 60);
                    addVCHours(userId, guildId, hours);
                    vcTracker.delete(key);
                }
            } else if (!oldState.channel && newState.channel) {
                vcTracker.set(key, Date.now());
            }
        } catch (err) {
            errorLog(err, `voiceStateUpdate | guild:${guildId} user:${userId}`);
        }
    });
}
