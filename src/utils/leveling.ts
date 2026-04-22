import db from "../db/database.js";

function getXPToLevel(level: number): number {
    return Math.floor(100 * Math.pow(1.5, level - 1));
}

export function addXP(userId: string, guildId: string, xp: number) {
    let select = db.prepare(`
        SELECT LEVEL, XP FROM LEVEL_STATS WHERE USER_ID = ? AND GUILD_ID = ?
    `);

    let data = select.get(userId, guildId) as any;

    if (!data) {
        db.prepare(`
            INSERT INTO LEVEL_STATS (USER_ID, GUILD_ID, LEVEL, XP)
            VALUES (?, ?, 1, 0)
        `).run(userId, guildId);
        data = { LEVEL: 1, XP: 0 };
    }

    let newXP = data.XP + xp;
    let newLevel = data.LEVEL;

    while (newXP >= getXPToLevel(newLevel)) {
        newXP -= getXPToLevel(newLevel);
        newLevel++;
    }

    db.prepare(`
        UPDATE LEVEL_STATS SET XP = ?, LEVEL = ? WHERE USER_ID = ? AND GUILD_ID = ?
    `).run(newXP, newLevel, userId, guildId);
}
