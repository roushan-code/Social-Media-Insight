# Social Media Performance Analysis Project

## Overview
This project is designed to analyze social media engagement data and generate actionable insights using advanced tools such as Langflow, OpenAI, and Astra DB. It combines a backend built with Node.js and Express, integrated with Astra DB for database operations, and Langflow for GPT-based insights generation.

## Features
- **CRUD Operations**:
  - Add, retrieve, update, and delete social media engagement data.
- **Insights Generation**:
  - Query Astra DB for aggregated data.
  - Pass user questions and data to Langflow for AI-powered insights.

## Workflow Explanation
1. **Langflow Setup**:
   - Visit the [Langflow website](https://www.langflow.org/).
   - Create a basic workflow that takes input values, passes them to OpenAI, and generates responses based on the input.

2. **Backend Project**:
   - Built using Node.js and Express.
   - Integrated with Astra DB for database operations.

3. **API Routes**:
   - **Add Media Details**:
     ```
     POST /add-media-details
     ```
     Adds new media engagement data to Astra DB.
   - **Get Media Details**:
     ```
     GET /get-media-details
     ```
     Retrieves all stored media engagement data.
   - **CRUD for Specific Media Detail**:
     ```
     GET /media-detail/:id
     PUT /media-detail/:id
     DELETE /media-detail/:id
     ```
     Retrieve, update, or delete specific media engagement data by ID.
   - **Generate Insights**:
     ```
     GET /get-insight
     ```
     Queries data from Astra DB, combines it with user input, and sends it to Langflow for generating insights.

## Tech Stack
- **Backend**:
  - Node.js
  - Express
- **Database**:
  - Astra DB
- **AI Integration**:
  - Langflow
  - OpenAI

## How to Run
### Prerequisites
- Node.js installed on your machine.
- Astra DB account and keyspace setup.
- OpenAI API key for Langflow integration.

### Steps
1. Clone the repository:
   ```bash
   git clone <repository-url>
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Configure environment variables:
   - Create a `.env` file with the following:
     ```env
     PORT=<your-port>
     ASTRA_DB_TOKEN=<your-token>
     ```
4. Start the server:
   ```bash
   npm start
   ```
5. Access the API endpoints via tools like Postman or your browser.

## Example Input and Output
### Input
- Media engagement data:
  ```json
  {
    "type": "carousel",
    "likes": 150,
    "comments": 30,
    "shares": 20
  }
  ```
- User question:
  ```
  "Which post type performs best?"
  ```

### Output
Generated insight from Langflow:
```text
"Carousel posts have moderate engagement. Reels perform better in terms of likes and comments. Static images receive less overall interaction."
```

## Submission Requirements
- Link your project to the Level Supermind Hackathon.
- Record a demo video explaining:
  - Langflow workflow.
  - Database operations with Astra DB.
  - Insights generation using Langflow.
- Submit:
  - GitHub repository link.
  - Demo video link.

## Contact
If you have any questions or need further assistance, feel free to reach out!

