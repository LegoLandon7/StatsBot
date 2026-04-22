// database.ts
// initialize database

import Database from "better-sqlite3";
import { errorLog, log, runLog } from "../utils/logger.js";

const db = new Database('src/data/stats.db');

log('creating tables...');

db.exec(`
    
    CREATE TABLE IF NOT EXISTS MESSAGE_STATS (
        GUILD_ID TEXT NOT NULL,
        USER_ID TEXT NOT NULL,
        TIMESTAMP INTEGER NOT NULL,
        MESSAGE_COUNT INTEGER DEFAULT 0,
        PRIMARY KEY (GUILD_ID, USER_ID, TIMESTAMP)
    );

    CREATE TABLE IF NOT EXISTS VC_STATS (
        GUILD_ID TEXT NOT NULL,
        USER_ID TEXT NOT NULL,
        VC_HOURS REAL DEFAULT 0,
        PRIMARY KEY (GUILD_ID, USER_ID)
    );

    CREATE TABLE IF NOT EXISTS LEVEL_STATS (
        GUILD_ID TEXT NOT NULL,
        USER_ID TEXT NOT NULL,
        LEVEL INTEGER DEFAULT 0,
        XP INTEGER DEFAULT 0,
        PRIMARY KEY (GUILD_ID, USER_ID)
    );
`);

runLog('tables created')

export default db;