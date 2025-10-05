# Mobile Shopping Chat Agent

A conversational AI shopping assistant that helps customers discover, compare, and buy mobile phones.

## Features

- Natural language query processing for mobile phone recommendations
- Product filtering based on user preferences (budget, brand, features)
- Detailed product comparisons with visual comparison tables
- Technical term explanations (OIS vs EIS, refresh rates, etc.)
- Adversarial prompt handling and safety measures
- Responsive UI with product cards and comparison views

## Tech Stack & Architecture

- **Frontend**: HTML, CSS, JavaScript (Vanilla)
- **AI Logic**: Custom-built natural language processing using pattern matching and intent classification
- **Database**: Mock database with detailed specifications of popular mobile phones
- **Deployment**: Static site hosting (can be deployed on Vercel, GitHub Pages, etc.)

### Architecture Overview

The application follows a simple client-side architecture:

1. **User Interface Layer**: Handles chat display, user input, and product visualization
2. **Chatbot Logic Layer**: Processes queries, extracts intents, and generates responses
3. **Data Layer**: Provides access to the mobile phone database with filtering capabilities

## Setup Instructions

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/mobile-shopping-agent.git
   cd mobile-shopping-agent
   ```

2. Open the application:
   - Simply open `index.html` in any modern web browser
   - No build steps or server setup required

3. For development:
   - Edit the HTML, CSS, and JavaScript files directly
   - Refresh the browser to see changes

## Prompt Design & Safety Strategy

The chatbot implements several safety measures:

1. **Intent Classification**: Identifies user intents (budget, brand preference, feature requirements) while filtering out irrelevant or unsafe queries

2. **Safety Pattern Detection**: Recognizes and gracefully handles:
   - Attempts to reveal system prompts or internal logic
   - Requests for API keys or sensitive information
   - Brand defamation attempts
   - Irrelevant topics outside the shopping domain

3. **Response Generation**: Provides factual, neutral information based solely on the product database to avoid hallucinations

4. **Adversarial Query Handling**: Redirects users back to the mobile shopping domain when detecting off-topic or potentially harmful queries

## Known Limitations

1. **Natural Language Understanding**: The pattern-matching approach has limitations compared to advanced LLMs:
   - Limited understanding of complex or ambiguous queries
   - May miss nuanced preferences or requirements

2. **Product Database**: 
   - Limited to the pre-defined set of mobile phones
   - Specifications are static and would need manual updates

3. **Comparison Logic**:
   - Simple scoring system for recommendations
   - Limited to comparing visible specifications

4. **No Backend Integration**:
   - No real-time pricing or availability information
   - Cannot process actual purchases

## Future Improvements

1. Integration with a real mobile phone API or database
2. Advanced NLP using a proper LLM (like Google's Gemini)
3. User accounts and preference tracking
4. Price alerts and availability notifications
5. Integration with e-commerce platforms for actual purchases