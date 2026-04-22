interface MessageBucket { MESSAGE_COUNT: number; }

const messageCache = new Map<string, Map<string, Map<number, MessageBucket>>>();
const vcCache = new Map<string, Map<string, number>>();

function get5MinBucket(): number {
    return Math.floor(Date.now() / 1000 / 300) * 300;
}

export function incrementGuild(guildId: string, userId: string) {
    const bucket = get5MinBucket();
    if (!messageCache.has(guildId)) messageCache.set(guildId, new Map());
    const users = messageCache.get(guildId)!;
    if (!users.has(userId)) users.set(userId, new Map());
    const buckets = users.get(userId)!;
    if (!buckets.has(bucket)) buckets.set(bucket, { MESSAGE_COUNT: 0 });
    buckets.get(bucket)!.MESSAGE_COUNT++;
}

export function addVCHours(userId: string, guildId: string, hours: number) {
    if (!vcCache.has(guildId)) vcCache.set(guildId, new Map());
    const users = vcCache.get(guildId)!;
    if (!users.has(userId)) users.set(userId, 0);
    users.set(userId, users.get(userId)! + hours);
}

export function drainMessageCache() {
    const snapshot = new Map(messageCache);
    messageCache.clear();
    return snapshot;
}

export function drainVCCache() {
    const snapshot = new Map(vcCache);
    vcCache.clear();
    return snapshot;
}