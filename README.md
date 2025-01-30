# Bet System

Welcome to the **Bet System** project! This README provides a detailed guide for running, exploring, and evaluating the project. Whether you're testing the application as a developer or assessing its technical structure, you'll find everything you need here.

---

## 🛠 Project Overview
The **Bet System** is a simple web application built for demonstration purposes. It includes both a frontend interface and a backend API, showcasing core functionality that can be expanded for larger applications.

---

## 🚀 Getting Started

### Prerequisites
Ensure you have the following tools installed:
- [Docker](https://www.docker.com/)  
- [Docker Compose](https://docs.docker.com/compose/)  

### Clone the Repository using SSH
```bash
git clone git@github.com:ArthurRF/bet-system.git
cd bet-system
```

### Or Clone the Repository using HTTPS
```bash
git clone https://github.com/ArthurRF/bet-system.git
cd bet-system
```

### Run the Project
Start the application using Docker Compose:
```bash
docker-compose up -d
```
This command will spin up both the frontend and backend services.

### Accessing the Application
- **Frontend:** Open your browser and navigate to [http://localhost:5173](http://localhost:5173)  
- **API:** The backend API is available at [http://localhost:4000/api](http://localhost:4000/api)

---

## 📦 Project Structure
- **Frontend:** A React application served at port `5173`  
- **Backend:** A Node.js/Express API exposed at port `4000`  
- **Docker:** Contains `docker-compose.yml` and Dockerfiles for containerization  
- **Postman Collections:** JSON collections located at the root for API testing

---

## 🔧 API Testing
If you'd like to test the API endpoints directly:
1. Import the provided Postman collections from the root directory.
2. Use the API base URL: `http://localhost:4000/api`

---

## 🌟 Improvement Suggestions
Below are some technical enhancements that would make this project more robust and production-ready:

1. **API State Management:**
   - Implement [React Query](https://react-query.tanstack.com/) for efficient data fetching and caching.

2. **Production-Ready Docker Configuration:**
   - Optimize Dockerfiles and Docker Compose for production environments by:  
     - Multi-stage builds for smaller image sizes  
     - Environment variable configuration  
     - Enhanced security settings

3. **Testing Coverage:**
   - Add unit and integration tests for both the frontend and backend using frameworks like:  
     - **Frontend:** Jest, React Testing Library  
     - **Backend:** Supertest, Jest

---

## 🧑‍💻 Technical Notes
- The current setup is designed for local development only.
- Basic error handling and input validation are implemented.
- Performance optimizations are pending.

Feel free to explore, test, and tell me what you think!