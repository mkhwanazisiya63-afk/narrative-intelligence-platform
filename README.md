# Narrative Intelligence Platform

A research and analysis platform for studying how stories are constructed across different forms of media.

The Narrative Intelligence Platform organizes media through a structured narrative taxonomy, allowing works to be analyzed through themes, emotions, game mechanics, narrative structures, and character archetypes.

The project combines software engineering, data organization, narrative analysis, and interactive research into one application.

## Overview

Stories communicate through more than plot.

They use recurring themes, emotional patterns, character archetypes, narrative structures, and, in interactive media, mechanics and player choices.

This platform was created to make those elements easier to organize, annotate, compare, and explore.

The system currently contains a curated dataset of **25 media works** across five categories:

- Anime
- Books
- Games
- Movies
- TV Series

Each work can be analyzed using the platform's narrative taxonomy and connected to related works through shared characteristics.


## Features

### Media Library

Browse and explore the platform's collection of media works.

Each entry contains structured information that can be used throughout the research and analysis system.

### Narrative Annotation

Media can be annotated across multiple narrative dimensions:

- Themes
- Emotions
- Game Mechanics
- Narrative Structures
- Character Archetypes

This allows individual works to be represented through a structured narrative profile.

### Taxonomy Management

The administration interface allows narrative categories and taxonomy entries to be managed directly through the application.

### Research Notes

Research notes can be created and associated with the broader media analysis workflow.

### Search

The platform includes search functionality for finding relevant media and exploring the dataset.

### Related Works

Media can be compared through shared narrative characteristics, allowing the system to surface works with similar profiles.

### Analytics Dashboard

The analytics system provides an overview of the collected data, including:

- Media distribution
- Theme frequency
- Emotion frequency
- Game mechanics
- Narrative structures
- Character archetypes
- Annotation coverage
- Research notes


## Current Dataset

The current dataset contains:

| Category  | Entries |
|---        |---:|
| Anime     | 5 |
| Books     | 5 |
| Games     | 5 |
| Movies    | 5 |
| TV Series | 5 |
| **Total** | **25** |

All **25 media works** currently have narrative annotations.

The research system currently contains **7 research notes**.

## Technology

### Backend

- Node.js
- Express.js
- SQLite
- REST-style API routes

### Frontend

- HTML
- CSS
- JavaScript

### Database

The application uses SQLite to store:

- Media
- Themes
- Emotions
- Mechanics
- Narrative Structures
- Archetypes
- Media relationships
- Research Notes

## Application Structure

```text
narrative-intelligence-platform/
│
├── api/
├── assets/
├── controllers/
├── database/
├── docs/
├── engine/
├── models/
├── public/
│   ├── css/
│   ├── js/
│   ├── images/
│   └── data/
├── routes/
├── services/
├── mediaData.js
├── server.js
├── package.json
└── README.md