# XPD AI Meme Generator

This project is an AI-powered meme generator that allows users to create text and image memes using advanced language models. It consists of a React frontend and a Node.js/Express backend, with AI integration via the Together.xyz API.

## Features
- Generate funny text memes or meme ideas from your input
- Choose between text or image meme types
- View chat history of generated memes
- User authentication (login/signup)

## Project Structure
```
AIBuilding/
  Backend/         # Node.js/Express backend
  expMeme/         # React frontend (Vite)
```

## Prerequisites
- Node.js (v16+ recommended)
- npm or yarn
- MongoDB instance (local or cloud)
- Together.xyz API key

## Setup Instructions

### 1. Backend
1. Navigate to the backend directory:
   ```sh
   cd Backend
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Create a `.env` file with the following variables:
   ```env
   MONGODB_URI=your_mongodb_connection_string
   TOGETHER_API_KEY=your_together_api_key
   GEMINI_API_KEY=your_gemini_api_key (if used)
   PORT=5000
   ```
4. Start the backend server:
   ```sh
   npm start
   ```

### 2. Frontend
1. Navigate to the frontend directory:
   ```sh
   cd expMeme
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Start the frontend development server:
   ```sh
   npm run dev
   ```
4. Open your browser at [http://localhost:5173](http://localhost:5173)

## API Endpoints

### Meme Generation
- **POST** `/generate-meme`
  - Description: Generate a meme (text or image idea) based on user input.
  - Request Body (JSON):
    ```json
    {
      "inputText": "Describe your meme idea here",
      "memeType": "text" | "image"
    }
    ```
  - Response (JSON):
    - Success:
      ```json
      { "result": "Generated meme text or image description" }
      ```
    - Error:
      ```json
      { "error": "Failed to generate meme", "details": "Error details" }
      ```

### Auth Endpoints
- **POST** `/api/auth/signup` — User registration
- **POST** `/api/auth/login` — User login
- **GET** `/api/auth/logout` — User logout

## Notes
- The image meme feature currently returns a description/idea, not an actual image URL.
- Make sure your backend and frontend are running on the correct ports (default: 5000 for backend, 5173 for frontend).
- Update CORS settings in `Backend/server.js` if you deploy to production.

## License
MIT 