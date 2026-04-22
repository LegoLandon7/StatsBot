import { Client, VoiceState } from "discord.js";
import { errorLog } from "../utils/logger.js";
import { addVCHours } from "../stats/statsCache.js";

const vcSessions = new Map<string, number>();

export default function voiceStateUpdateHandler(client: Client) {
    client.on("voiceStateUpdate", (oldState: VoiceState, newState: VoiceState) => {
        const userId = newState.member?.id;
        const guildId = newState.guild.id;
        if (!userId) return;

        const sessionKey = `${userId}_${guildId}`;

        try {
            if (oldState.channel && !newState.channel) {
                const joinTime = vcSessions.get(sessionKey);
                if (joinTime) {
                    const hours = (Date.now() - joinTime) / (1000 * 60 * 60);
                    addVCHours(userId, guildId, hours);
                    vcSessions.delete(sessionKey);
                }
            } else if (!oldState.channel && newState.channel) {
                vcSessions.set(sessionKey, Date.now());
            }
        } catch (err) {
            errorLog(err, `voiceStateUpdate | guild:${guildId} user:${userId}`);
        }
    });
}
