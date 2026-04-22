// statsFlush.ts
// flushes current stored stats

import db from "../db/database.js";
import { drainMessageCache, drainVCCache } from "./statsCache.js";

const upsertMessage = db.prepare(`
    INSERT INTO MESSAGE_STATS (GUILD_ID, USER_ID, TIMESTAMP, MESSAGE_COUNT)
    VALUES (@GUILD_ID, @USER_ID, @TIMESTAMP, @MESSAGE_COUNT)
    ON CONFLICT (GUILD_ID, USER_ID, TIMESTAMP)
    DO UPDATE SET MESSAGE_COUNT = @MESSAGE_COUNT
`);

const upsertVC = db.prepare(`
    INSERT INTO VC_STATS (GUILD_ID, USER_ID, VC_HOURS)
    VALUES (@GUILD_ID, @USER_ID, @VC_HOURS)
    ON CONFLICT (GUILD_ID, USER_ID)
    DO UPDATE SET VC_HOURS = VC_HOURS + @VC_HOURS
`);

export function flushStats() {
    const messages = drainMessageCache();
    const vc = drainVCCache();
    if (messages.size === 0 && vc.size === 0) return;

    db.transaction(() => {
        for (const [GUILD_ID, users] of messages)
            for (const [USER_ID, buckets] of users)
                for (const [TIMESTAMP, { MESSAGE_COUNT }] of buckets)
                    upsertMessage.run({ GUILD_ID, USER_ID, TIMESTAMP, MESSAGE_COUNT });

        for (const [GUILD_ID, users] of vc)
            for (const [USER_ID, VC_HOURS] of users)
                upsertVC.run({ GUILD_ID, USER_ID, VC_HOURS });
    })();
}

export function startFlushInterval() {
    setInterval(flushStats, 5 * 60 * 1000);
    process.on("SIGINT", () => { flushStats(); process.exit(0); });
}