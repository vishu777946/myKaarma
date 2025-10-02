# Mobile Shopping Chat Agent

A conversational AI shopping assistant for mobile phones that helps users find, compare, and learn about smartphones through natural language interaction.

## Features

- **Natural Language Understanding**: Chat with the agent using everyday language to find phones
- **Product Search**: Find phones based on budget, brand, features, and specifications
- **Product Comparison**: Compare different phone models side by side
- **Technical Explanations**: Get explanations for technical terms and features
- **Safety Measures**: Protection against adversarial prompts and irrelevant queries
- **Responsive UI**: Mobile-friendly interface with product cards and comparison views
- **Cloud Database**: Persistent storage with Supabase
- **Deployment**: Hosted on Vercel for global access

## Tech Stack

- **Frontend**: Next.js, React, Tailwind CSS
- **Backend**: Node.js, Express
- **AI/ML**: Google Gemini API for natural language processing
- **Database**: Supabase (PostgreSQL)

## Project Structure

```
mobile-shopping-agent-v2/
├── frontend/               # Next.js frontend application
│   ├── pages/              # React pages
│   │   └── index.js        # Main chat interface
│   └── next.config.js      # Next.js configuration
├── backend/                # Node.js backend
│   ├── database.js         # Mock phone database
│   └── server.js           # Express server with API endpoints
└── README.md               # Project documentation
```

## Setup Instructions

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Backend Setup

1. Navigate to the backend directory:
   ```
   cd backend
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Create a `.env` file with your Google Gemini API key:
   ```
   GEMINI_API_KEY=your_api_key_here
   PORT=5000
   ```

4. Start the backend server:
   ```
   npm run dev
   ```

### Frontend Setup

1. Navigate to the frontend directory:
   ```
   cd frontend
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Start the development server:
   ```
   npm run dev
   ```

4. Open your browser and visit `http://localhost:3000`

## API Endpoints

- `POST /api/chat`: Process user queries and return responses
- `GET /api/phones`: Get all available phones
- `GET /api/phones/:id`: Get details for a specific phone
- `GET /api/compare?id1=X&id2=Y`: Compare two phones by their IDs

## Safety Strategy

The agent implements multiple safety measures:
- Detection of system prompt/instruction reveal attempts
- Protection against API key/secrets extraction
- Prevention of internal logic reveal attempts
- Filtering of brand defamation attempts
- Blocking of irrelevant topics

## Limitations and Future Improvements

- Currently uses mock data; could be connected to a real product database
- Limited to predefined technical term explanations
- Could be enhanced with more sophisticated NLP for better intent recognition
- UI could be improved with animations and more detailed product information
- Add user authentication and personalized recommendations
- Implement conversation history and context awareness