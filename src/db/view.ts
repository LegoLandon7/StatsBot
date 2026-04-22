// view.ts
// view the tables as they are

import db from "./database.js"
import { tableLog } from "../utils/logger.js"

const messageData = db.prepare(`SELECT * FROM MESSAGE_STATS ORDER BY GUILD_ID, USER_ID, TIMESTAMP;`).all();
const guildMessageTotals = db.prepare(`SELECT GUILD_ID, TIMESTAMP, SUM(MESSAGE_COUNT) as TOTAL_MESSAGES FROM MESSAGE_STATS GROUP BY GUILD_ID, TIMESTAMP ORDER BY GUILD_ID, TIMESTAMP;`).all();
const vcData = db.prepare(`SELECT * FROM VC_STATS ORDER BY GUILD_ID, VC_HOURS DESC;`).all();
const levelData = db.prepare(`SELECT * FROM LEVEL_STATS ORDER BY GUILD_ID, LEVEL DESC;`).all();

tableLog('MESSAGE_STATS', messageData);
tableLog('GUILD_MESSAGE_TOTALS', guildMessageTotals);
tableLog('VC_STATS', vcData);
tableLog('LEVEL_STATS', levelData);