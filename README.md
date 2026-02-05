# AI Movie Maven

## Project Overview
AI Movie Maven is a full stack, AI powered movie recommendation system built to provide personalized movie suggestions based on user preferences and interaction history. The application supports both guest and registered users and uses A/B testing to evaluate and improve user experience. The web application is developed with Next.js, the recommendation services are implemented in Python using FastAPI, and PostgreSQL is used as the primary database accessed through Prisma. The system is containerized using Docker, and Azure Data Studio is used as a database management and inspection tool.

## Key Features
- Personalized movie recommendations based on user interactions and preferences  
- Separate experiences for guest users and registered users  
- A/B testing to compare user flows and interface performance  
- Machine learning based recommendation models  
- Database access and management through Prisma with PostgreSQL  

## Technologies Used
- Next.js for frontend and backend application development  
- FastAPI (Python) for serving machine learning and recommendation services  
- PostgreSQL as the main database  
- Prisma Client for database access and schema management  
- Docker for containerizing services and simplifying setup  
- Azure Data Studio for database monitoring and administration  

## Recommendation System
- User interaction data such as ratings and activity is stored in a PostgreSQL database managed using Prisma  
- Movie metadata including genre and other attributes is used to improve recommendation quality  
- The recommendation layer uses collaborative filtering and content based approaches, implemented in Python and exposed through FastAPI  
- Guest users can explore recommendations without an account, while registered users receive personalized results based on their history  
- A/B testing is used to evaluate and compare the guest and registered user experiences

