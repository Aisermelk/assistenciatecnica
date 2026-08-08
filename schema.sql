CREATE TABLE IF NOT EXISTS leads (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    phone TEXT NOT NULL,
    device TEXT,
    message TEXT,
    status TEXT NOT NULL DEFAULT 'novo',
    created_at TEXT NOT NULL
);
