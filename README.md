# AI Movie Maven  

## Project Overview  
**AI Movie Maven** is an AI-powered movie recommendation system designed to offer personalized movie suggestions based on user preferences. It features a seamless user interface for both guest and registered users, with **A/B testing** to compare the performance of different interfaces. The project uses **Next.js** for both frontend and backend development, **Python FastAPI** for running recommendation algorithms, and **Prisma Client** for database management. It integrates with **Azure Data Studio** for managing the backend database.  

## Key Features  
- **Personalized Movie Recommendations**: Movie suggestions based on user preferences and interactions.  
- **Guest & Registered User Interfaces**: Two distinct interfaces are used to provide a better experience for both guest users and registered users.  
- **A/B Testing**: Allows users to compare and optimize the interface for guest vs. registered users.  
- **Deep Learning**: The recommendation system uses deep learning models to enhance prediction accuracy.  
- **Efficient Data Management**: **Prisma Client** is used to interact with the database, ensuring high performance and ease of use.  

## Technologies Used  
- **Frontend & Backend**:  
  - **Next.js**: Framework for building both the frontend and backend of the application.  
- **Recommendation Algorithms**:  
  - **Python FastAPI**: Fast and efficient API framework to serve machine learning recommendation models.  
- **Database**:  
  - **Prisma Client**: To connect and interact with the database.  
  - **Azure Data Studio**: To manage and analyze the backend data.  
- **Testing & Optimization**:  
  - **A/B Testing**: Comparing user interfaces for guest and registered users for better user experience.  

## Project Structure  

## Recommendation System  
1. **Data Collection**:  
   - User interaction data (ratings, reviews, etc.) is collected and stored in a PostgreSQL database managed with Prisma Client.  
   - Movie metadata (genre, year, director, etc.) is also stored and used for better recommendations.  

2. **Recommendation Algorithm**:  
   - The system uses deep learning models, such as **Collaborative Filtering**,**Content-based filtering** to make personalized movie recommendations.  
   - The **FastAPI** service is responsible for running the recommendation algorithms.  

3. **User Interfaces**:  
   - **Guest Users**: They can explore movie recommendations without creating an account.  
   - **Registered Users**: After logging in, registered users receive tailored movie recommendations based on their interactions and preferences.  

4. **A/B Testing**:  
   - Two distinct interfaces are provided for guest and registered users to optimize the user experience. A/B testing is used to compare the effectiveness of both interfaces and gather feedback.  

## How to Run 

npm run dev  

## Run the FastAPI recommendation server

uvicorn recommendation.main:app --reload  


