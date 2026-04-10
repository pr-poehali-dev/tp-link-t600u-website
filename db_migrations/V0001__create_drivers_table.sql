CREATE TABLE IF NOT EXISTS drivers (
    id SERIAL PRIMARY KEY,
    os_name TEXT NOT NULL,
    filename TEXT NOT NULL,
    version TEXT,
    size_mb REAL,
    cdn_url TEXT NOT NULL,
    uploaded_at TIMESTAMP DEFAULT NOW()
);
