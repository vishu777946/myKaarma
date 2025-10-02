require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { GoogleGenerativeAI } = require('@google/generative-ai');
const phoneDatabase = require('./database');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Initialize Google Generative AI
// Note: In production, you would use an actual API key from environment variables
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || 'YOUR_API_KEY');

// Safety patterns to detect adversarial queries
const safetyPatterns = {
  systemPrompt: /\b(system prompt|ignore rules|ignore instructions|reveal prompt|prompt injection)\b/i,
  apiKey: /\b(api key|secret key|access key|token)\b/i,
  internalLogic: /\b(internal logic|how do you work|your code|your algorithm)\b/i,
  defamation: /\b(trash|sucks|terrible|worst|garbage)\b/i,
  irrelevant: /\b(politics|religion|dating|gambling|drugs|weapons)\b/i
};

// Technical terms explanations
const technicalTerms = {
  "OIS": "Optical Image Stabilization (OIS) is a technology that physically moves the camera sensor or lens elements to compensate for hand shake, resulting in sharper photos and smoother videos.",
  "EIS": "Electronic Image Stabilization (EIS) uses software algorithms to reduce shakiness in videos by cropping the frame slightly and adjusting the image position, which is less effective than OIS but uses less power.",
  "AMOLED": "Active-Matrix Organic Light-Emitting Diode (AMOLED) is a display technology that offers vibrant colors, deep blacks, and better power efficiency as each pixel emits its own light and can be turned off completely for true blacks.",
  "LCD": "Liquid Crystal Display (LCD) is a flat panel display technology that uses liquid crystals to produce visible images. It requires a backlight, which means it can't achieve the same deep blacks as AMOLED.",
  "Refresh Rate": "Refresh rate, measured in Hertz (Hz), is how many times per second a screen updates with new images. Higher refresh rates (90Hz, 120Hz, 144Hz) result in smoother scrolling and animations compared to the standard 60Hz.",
  "IP Rating": "Ingress Protection (IP) ratings indicate how resistant a device is to dust and water. For example, IP68 means the device is dust-tight and can withstand continuous immersion in water.",
  "Fast Charging": "Fast charging technology allows a phone to charge at higher wattages (measured in W), significantly reducing charging time. Different brands have their own versions like SuperVOOC (OnePlus/OPPO), SuperCharge (Huawei), etc.",
  "RAM": "Random Access Memory (RAM) is a type of memory that temporarily stores data that active apps are using. More RAM generally allows for better multitasking and app performance.",
  "Processor": "The processor (or chipset) is the brain of the phone that handles all computations. Common mobile processors include Snapdragon (Qualcomm), Dimensity (MediaTek), Exynos (Samsung), and A-series (Apple)."
};

// Check if query is adversarial or unsafe
function checkSafety(query) {
  // Check for system prompt/instructions reveal attempts
  if (safetyPatterns.systemPrompt.test(query)) {
    return {
      unsafe: true,
      response: "I'm designed to help you find the perfect mobile phone. I can't reveal my internal instructions or modify my core functionality. How can I assist you with mobile shopping today?"
    };
  }
  
  // Check for API key/secrets reveal attempts
  if (safetyPatterns.apiKey.test(query)) {
    return {
      unsafe: true,
      response: "I don't have access to API keys or sensitive credentials. I'm here to help you find the right mobile phone. What features are you looking for in your next phone?"
    };
  }
  
  // Check for internal logic reveal attempts
  if (safetyPatterns.internalLogic.test(query)) {
    return {
      unsafe: true,
      response: "I'm a specialized shopping assistant for mobile phones. I can help you find phones based on your preferences, compare models, and explain features. What kind of phone are you looking for today?"
    };
  }
  
  // Check for brand defamation attempts
  if (safetyPatterns.defamation.test(query)) {
    return {
      unsafe: true,
      response: "I aim to provide objective information about mobile phones based on their specifications and features. I can help you compare phones or find ones that match your requirements. What specific features are important to you?"
    };
  }
  
  // Check for irrelevant topics
  if (safetyPatterns.irrelevant.test(query)) {
    return {
      unsafe: true,
      response: "I'm specialized in helping with mobile phone shopping. I can assist with finding phones based on features, comparing models, or explaining technical specifications. How can I help with your phone search today?"
    };
  }
  
  return { unsafe: false };
}

// API endpoint to process user queries
app.post('/api/chat', async (req, res) => {
  try {
    const { message } = req.body;
    
    // Check for safety
    const safetyCheck = checkSafety(message);
    if (safetyCheck.unsafe) {
      return res.json({
        message: safetyCheck.response,
        displayProducts: false,
        compareProducts: false
      });
    }
    
    // Check for technical term explanation
    for (const [term, explanation] of Object.entries(technicalTerms)) {
      if (message.toLowerCase().includes(term.toLowerCase())) {
        return res.json({
          message: `${term}: ${explanation}`,
          displayProducts: false,
          compareProducts: false
        });
      }
    }
    
    // Use Google Gemini to process the query
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    
    // Create a prompt for Gemini
    const prompt = `
      You are a mobile phone shopping assistant. Based on the user query: "${message}", 
      determine the user's intent and extract relevant search criteria.
      
      Possible intents: search, compare, explain, details.
      Possible criteria: brand, price, camera, battery, display, performance, storage.
      
      Format your response as JSON with the following structure:
      {
        "intent": "search|compare|explain|details",
        "criteria": {
          "brand": "brand name if mentioned",
          "maxPrice": number if mentioned,
          "camera": boolean if camera quality is important,
          "battery": boolean if battery life is important,
          "display": boolean if display quality is important,
          "performance": boolean if performance is important,
          "storage": boolean if storage is important
        },
        "compareModels": ["model1", "model2"] if intent is compare,
        "explanation": "term to explain" if intent is explain,
        "detailsModel": "model name" if intent is details
      }
    `;
    
    // For demo purposes, we'll simulate the AI response
    // In production, you would use: const result = await model.generateContent(prompt);
    
    let aiResponse;
    
    // Simulate AI response based on query patterns
    if (message.toLowerCase().includes("compare")) {
      // Extract phone models to compare
      const phones = phoneDatabase.getAllPhones();
      const randomIndex1 = Math.floor(Math.random() * phones.length);
      let randomIndex2 = Math.floor(Math.random() * phones.length);
      while (randomIndex2 === randomIndex1) {
        randomIndex2 = Math.floor(Math.random() * phones.length);
      }
      
      const comparison = phoneDatabase.comparePhones(phones[randomIndex1].id, phones[randomIndex2].id);
      
      return res.json({
        message: `Here's a comparison between ${phones[randomIndex1].brand} ${phones[randomIndex1].model} and ${phones[randomIndex2].brand} ${phones[randomIndex2].model}:`,
        comparison: comparison,
        displayProducts: false,
        compareProducts: true
      });
    } else if (message.toLowerCase().includes("under") || message.toLowerCase().includes("budget")) {
      // Extract budget
      const budgetMatch = message.match(/under (?:Rs\.?|₹)?(\d+[k]?)|below (?:Rs\.?|₹)?(\d+[k]?)|less than (?:Rs\.?|₹)?(\d+[k]?)|(?:Rs\.?|₹)?(\d+[k]?) budget/i);
      let budget = 50000; // Default budget
      
      if (budgetMatch) {
        for (let i = 1; i < budgetMatch.length; i++) {
          if (budgetMatch[i]) {
            budget = budgetMatch[i];
            break;
          }
        }
        
        // Handle 'k' notation (e.g., 30k)
        if (typeof budget === 'string' && budget.toLowerCase().endsWith('k')) {
          budget = parseFloat(budget.slice(0, -1)) * 1000;
        } else {
          budget = parseFloat(budget);
        }
      }
      
      const matchingPhones = phoneDatabase.filterPhones({ maxPrice: budget });
      
      return res.json({
        message: `Here are phones under ₹${budget}:`,
        products: matchingPhones,
        displayProducts: true,
        compareProducts: false
      });
    } else {
      // Default to showing all phones
      const allPhones = phoneDatabase.getAllPhones();
      
      return res.json({
        message: "Here are some popular mobile phones:",
        products: allPhones,
        displayProducts: true,
        compareProducts: false
      });
    }
    
  } catch (error) {
    console.error('Error processing query:', error);
    res.status(500).json({ error: 'Failed to process your query' });
  }
});

// Get all phones
app.get('/api/phones', (req, res) => {
  res.json(phoneDatabase.getAllPhones());
});

// Get phone by ID
app.get('/api/phones/:id', (req, res) => {
  const phone = phoneDatabase.getPhoneById(parseInt(req.params.id));
  if (phone) {
    res.json(phone);
  } else {
    res.status(404).json({ error: 'Phone not found' });
  }
});

// Compare phones
app.get('/api/compare', (req, res) => {
  const { id1, id2 } = req.query;
  
  if (!id1 || !id2) {
    return res.status(400).json({ error: 'Two phone IDs are required for comparison' });
  }
  
  const comparison = phoneDatabase.comparePhones(parseInt(id1), parseInt(id2));
  
  if (comparison) {
    res.json(comparison);
  } else {
    res.status(404).json({ error: 'One or both phones not found' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});