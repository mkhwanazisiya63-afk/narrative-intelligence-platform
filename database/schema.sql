PRAGMA foreign_keys = ON;

-- ==========================
-- MEDIA
-- ==========================

CREATE TABLE IF NOT EXISTS media (

    id TEXT PRIMARY KEY,

    title TEXT NOT NULL,

    mediaType TEXT NOT NULL,

    creator TEXT,

    year INTEGER,

    description TEXT,

    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP

);

-- ==========================
-- THEMES
-- ==========================

CREATE TABLE IF NOT EXISTS themes (

    id INTEGER PRIMARY KEY AUTOINCREMENT,

    name TEXT UNIQUE NOT NULL,

    description TEXT

);

-- ==========================
-- EMOTIONS
-- ==========================

CREATE TABLE IF NOT EXISTS emotions (

    id INTEGER PRIMARY KEY AUTOINCREMENT,

    name TEXT UNIQUE NOT NULL,

    description TEXT

);

-- ==========================
-- NARRATIVE STRUCTURES
-- ==========================

CREATE TABLE IF NOT EXISTS narrative_structures (

    id INTEGER PRIMARY KEY AUTOINCREMENT,

    name TEXT UNIQUE NOT NULL,

    description TEXT

);

-- ==========================
-- CHARACTER ARCHETYPES
-- ==========================

CREATE TABLE IF NOT EXISTS archetypes (

    id INTEGER PRIMARY KEY AUTOINCREMENT,

    name TEXT NOT NULL UNIQUE

);

-- ==========================
-- MECHANICS
-- ==========================

CREATE TABLE IF NOT EXISTS mechanics (

    id INTEGER PRIMARY KEY AUTOINCREMENT,

    name TEXT UNIQUE NOT NULL,

    description TEXT

);

-- ==========================
-- MEDIA ↔ THEMES
-- ==========================

CREATE TABLE IF NOT EXISTS media_themes (

    media_id INTEGER,

    theme_id INTEGER,

    PRIMARY KEY(media_id, theme_id),

    FOREIGN KEY(media_id) REFERENCES media(id),

    FOREIGN KEY(theme_id) REFERENCES themes(id)

);


-- ==========================
-- MEDIA ↔ EMOTIONS
-- ==========================

CREATE TABLE IF NOT EXISTS media_emotions (

    media_id INTEGER,

    emotion_id INTEGER,

    PRIMARY KEY(media_id, emotion_id),

    FOREIGN KEY(media_id) REFERENCES media(id),

    FOREIGN KEY(emotion_id) REFERENCES emotions(id)

);

-- ==========================
-- MEDIA ↔ STRUCTURES
-- ==========================

CREATE TABLE IF NOT EXISTS media_structures (

    media_id INTEGER,

    structure_id INTEGER,

    PRIMARY KEY(media_id, structure_id),

    FOREIGN KEY(media_id) REFERENCES media(id),

    FOREIGN KEY(structure_id) REFERENCES narrative_structures(id)

);

-- ==========================
-- MEDIA ↔ ARCHETYPES
-- ==========================

CREATE TABLE IF NOT EXISTS media_archetypes (

    mediaId TEXT NOT NULL,

    archetypeId INTEGER NOT NULL,

    PRIMARY KEY(mediaId, archetypeId),

    FOREIGN KEY(mediaId) REFERENCES media(id) ON DELETE CASCADE,

    FOREIGN KEY(archetypeId) REFERENCES archetypes(id) ON DELETE CASCADE

);

-- ==========================
-- MEDIA ↔ MECHANICS
-- ==========================

CREATE TABLE IF NOT EXISTS media_mechanics (

    media_id INTEGER,

    mechanic_id INTEGER,

    PRIMARY KEY(media_id, mechanic_id),

    FOREIGN KEY(media_id) REFERENCES media(id),

    FOREIGN KEY(mechanic_id) REFERENCES mechanics(id)

);

CREATE TABLE IF NOT EXISTS research_notes (

    id INTEGER PRIMARY KEY AUTOINCREMENT,

    media_id INTEGER,

    title TEXT,

    note TEXT,

    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY(media_id) REFERENCES media(id)

);

CREATE INDEX IF NOT EXISTS idx_media_title
ON media(title);

CREATE INDEX IF NOT EXISTS idx_media_creator
ON media(creator);

CREATE INDEX IF NOT EXISTS idx_media_year
ON media(year);

CREATE INDEX IF NOT EXISTS idx_media_type
ON media(mediaType);