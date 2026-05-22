# 🎬 AI Movie Maven

> *Because "what should we watch tonight?" deserves a better answer than scrolling for 45 minutes.*

A full-stack, AI-powered movie recommendation system built for my **Software Engineering** class but built like it actually has to ship.

## Overview
AI Movie Maven serves up personalized movie picks based on what users watch, rate, and click. **Guest users** get to browse without commitment; **registered users** get recommendations that actually know them. **A/B testing** runs quietly in the background, figuring out which experience keeps people watching.

Under the hood: **Next.js** for the app, **FastAPI** for the ML, **PostgreSQL + Prisma** for the data, and **Docker** to make sure it runs the same everywhere because "works on my machine" isn't a deliverable.

## Tech Stack
- **Next.js** : frontend + backend in one
- **FastAPI (Python)** : serves the recommendation logic
- **PostgreSQL + Prisma** : data layer with type-safe access
- **Docker** : reproducible setup, no surprises
- **Azure Data Studio** : for when the database needs a closer look

## How Recommendations Work
The engine blends **collaborative filtering** (what similar users liked) with **content-based** signals (genre, metadata, the usual suspects), exposed through FastAPI endpoints. Guest users see general picks; registered users get results shaped by their history. A/B tests compare the two flows to learn what's actually working.

## 🍿 A Peek Inside

A quick walkthrough of Movie Maven in the wild popcorn optional.

### Landing Experience
<img width="1414" alt="AI Movie Maven landing page" src="https://github.com/user-attachments/assets/3e1628e5-fb94-4209-906b-d1673aaeb941" />

*Where every movie night begins clean entry point for guests and returning users alike.*

<img width="1411" alt="Movie browsing and discovery interface" src="https://github.com/user-attachments/assets/87899c0a-572e-4b13-af92-b457325a8a74" />

<img width="1404" alt="Personalized movie recommendations" src="https://github.com/user-attachments/assets/1411277d-9912-4289-ac43-e861e9ab9677" />

### User Experience in Action
<img width="1433" alt="Movie Maven user experience" src="https://github.com/user-attachments/assets/e67bcfab-55aa-4e20-98da-a3fb37124caf" />

*A/B testing quietly running in the background the user just gets a better experience.*

*The recommendation engine doing its thing collaborative filtering meets content-based logic.*



