import os
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from dotenv import load_dotenv
import google.generativeai as genai
import re
# Use local database by default, but allow for Supabase in production
try:
    from supabase import phone_database
    print("Using Supabase database")
except ImportError:
    from database import phone_database
    print("Using local database")

# Load environment variables
load_dotenv()

app = FastAPI()

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, specify your frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize Google Generative AI
genai.configure(api_key=os.getenv("GEMINI_API_KEY", "AIzaSyDcfmOpQpFr1jUy22KseXHbCuc6bm2wygU"))

# Safety patterns to detect adversarial queries
safety_patterns = {
    "system_prompt": re.compile(r'\b(system prompt|ignore rules|ignore instructions|reveal prompt|prompt injection)\b', re.IGNORECASE),
    "api_key": re.compile(r'\b(api key|secret key|access key|token)\b', re.IGNORECASE),
    "internal_logic": re.compile(r'\b(internal logic|how do you work|your code|your algorithm)\b', re.IGNORECASE),
    "defamation": re.compile(r'\b(trash|sucks|terrible|worst|garbage)\b', re.IGNORECASE),
    "irrelevant": re.compile(r'\b(politics|religion|dating|gambling|drugs|weapons)\b', re.IGNORECASE)
}

# Technical terms explanations
technical_terms = {
    "OIS": "Optical Image Stabilization (OIS) is a technology that physically moves the camera sensor or lens elements to compensate for hand shake, resulting in sharper photos and smoother videos.",
    "EIS": "Electronic Image Stabilization (EIS) uses software algorithms to reduce shakiness in videos by cropping the frame slightly and adjusting the image position, which is less effective than OIS but uses less power.",
    "AMOLED": "Active-Matrix Organic Light-Emitting Diode (AMOLED) is a display technology that offers vibrant colors, deep blacks, and better power efficiency as each pixel emits its own light and can be turned off completely for true blacks.",
    "LCD": "Liquid Crystal Display (LCD) is a flat panel display technology that uses liquid crystals to produce visible images. It requires a backlight, which means it can't achieve the same deep blacks as AMOLED.",
    "Refresh Rate": "Refresh rate, measured in Hertz (Hz), is how many times per second a screen updates with new images. Higher refresh rates (90Hz, 120Hz, 144Hz) result in smoother scrolling and animations compared to the standard 60Hz.",
    "IP Rating": "Ingress Protection (IP) ratings indicate how resistant a device is to dust and water. For example, IP68 means the device is dust-tight and can withstand continuous immersion in water.",
    "Fast Charging": "Fast charging technology allows a phone to charge at higher wattages (measured in W), significantly reducing charging time. Different brands have their own versions like SuperVOOC (OnePlus/OPPO), SuperCharge (Huawei), etc.",
    "RAM": "Random Access Memory (RAM) is a type of memory that temporarily stores data that active apps are using. More RAM generally allows for better multitasking and app performance.",
    "Processor": "The processor (or chipset) is the brain of the phone that handles all computations. Common mobile processors include Snapdragon (Qualcomm), Dimensity (MediaTek), Exynos (Samsung), and A-series (Apple)."
}

def check_safety(query):
    """Check if query is adversarial or unsafe"""
    # Check for system prompt/instructions reveal attempts
    if safety_patterns["system_prompt"].search(query):
        return {
            "unsafe": True,
            "response": "I'm designed to help you find the perfect mobile phone. I can't reveal my internal instructions or modify my core functionality. How can I assist you with mobile shopping today?"
        }
    
    # Check for API key/secrets reveal attempts
    if safety_patterns["api_key"].search(query):
        return {
            "unsafe": True,
            "response": "I don't have access to API keys or sensitive credentials. I'm here to help you find the right mobile phone. What features are you looking for in your next phone?"
        }
    
    # Check for internal logic reveal attempts
    if safety_patterns["internal_logic"].search(query):
        return {
            "unsafe": True,
            "response": "I'm a specialized shopping assistant for mobile phones. I can help you find phones based on your preferences, compare models, and explain features. What kind of phone are you looking for today?"
        }
    
    # Check for brand defamation attempts
    if safety_patterns["defamation"].search(query):
        return {
            "unsafe": True,
            "response": "I aim to provide objective information about mobile phones based on their specifications and features. I can help you compare phones or find ones that match your requirements. What specific features are important to you?"
        }
    
    # Check for irrelevant topics
    if safety_patterns["irrelevant"].search(query):
        return {
            "unsafe": True,
            "response": "I'm specialized in helping with mobile phone shopping. I can assist with finding phones based on features, comparing models, or explaining technical specifications. How can I help with your phone search today?"
        }
    
    return {"unsafe": False}

class ChatRequest(BaseModel):
    message: str

@app.post("/api/chat")
async def process_chat(request: ChatRequest):
    try:
        message = request.message
        
        # Check for safety
        safety_check = check_safety(message)
        if safety_check["unsafe"]:
            return {
                "message": safety_check["response"],
                "displayProducts": False,
                "compareProducts": False
            }
        
        # Check for technical term explanation
        for term, explanation in technical_terms.items():
            if term.lower() in message.lower():
                return {
                    "message": f"{term}: {explanation}",
                    "displayProducts": False,
                    "compareProducts": False
                }
        
        # Use Google Gemini to process the query (simulated for now)
        model = genai.GenerativeModel("gemini-pro")
        
        # Create a prompt for Gemini
        prompt = f"""
        You are a mobile phone shopping assistant. Based on the user query: "{message}", 
        determine the user's intent and extract relevant search criteria.
        
        Possible intents: search, compare, explain, details.
        Possible criteria: brand, price, camera, battery, display, performance, storage.
        
        Format your response as JSON with the following structure:
        {{
            "intent": "search|compare|explain|details",
            "criteria": {{
                "brand": "brand name if mentioned",
                "maxPrice": number if mentioned,
                "camera": boolean if camera quality is important,
                "battery": boolean if battery life is important,
                "display": boolean if display quality is important,
                "performance": boolean if performance is important,
                "storage": boolean if storage is important
            }},
            "compareModels": ["model1", "model2"] if intent is compare,
            "explanation": "term to explain" if intent is explain,
            "detailsModel": "model name" if intent is details
        }}
        """
        
        # For demo purposes, we'll simulate the AI response
        # In production, you would use: result = await model.generate_content(prompt)
        
        # Simulate AI response based on query patterns
        if "compare" in message.lower():
            # Extract phone models to compare from the message
            phones = phone_database.get_all_phones()
            phone_models = []
            
            # Find mentioned phone models in the message
            for phone in phones:
                brand_model = f"{phone['brand']} {phone['model']}".lower()
                model_only = f"{phone['model']}".lower()
                
                # Check for full name (brand + model) or just model name
                if brand_model in message.lower() or model_only in message.lower():
                    phone_models.append(phone)
            
            # Special case for Galaxy S23 Ultra vs S23 Ultra
            if "galaxy s23" in message.lower() or "s23 ultra" in message.lower():
                for phone in phones:
                    if phone["model"] == "Galaxy S23 Ultra":
                        if phone not in phone_models:
                            phone_models.append(phone)
            
            # If we found exactly 2 phones, compare them
            if len(phone_models) == 2:
                comparison = phone_database.compare_phones(phone_models[0]["id"], phone_models[1]["id"])
                return {
                    "message": f"Here's a comparison between {phone_models[0]['brand']} {phone_models[0]['model']} and {phone_models[1]['brand']} {phone_models[1]['model']}:",
                    "comparison": comparison,
                    "displayProducts": False,
                    "compareProducts": True
                }
            # If we found more than 2 phones, use the first two
            elif len(phone_models) > 2:
                comparison = phone_database.compare_phones(phone_models[0]["id"], phone_models[1]["id"])
                return {
                    "message": f"Here's a comparison between {phone_models[0]['brand']} {phone_models[0]['model']} and {phone_models[1]['brand']} {phone_models[1]['model']}:",
                    "comparison": comparison,
                    "displayProducts": False,
                    "compareProducts": True
                }
            # Otherwise fall back to specific phones for common comparisons
            else:
                # Check for common comparison phrases
                if "iphone" in message.lower() and "galaxy" in message.lower():
                    iphone = None
                    galaxy = None
                    
                    # Find iPhone and Galaxy models
                    for phone in phones:
                        if phone["brand"] == "Apple" and "iPhone" in phone["model"]:
                            iphone = phone
                        if phone["brand"] == "Samsung" and "Galaxy" in phone["model"]:
                            if "s23" in message.lower() and "Galaxy S23 Ultra" == phone["model"]:
                                galaxy = phone
                            elif "s24" in message.lower() and "Galaxy S24 Ultra" == phone["model"]:
                                galaxy = phone
                            elif not galaxy:  # Default to any Galaxy if specific model not found
                                galaxy = phone
                    
                    if iphone and galaxy:
                        comparison = phone_database.compare_phones(iphone["id"], galaxy["id"])
                        return {
                            "message": f"Here's a comparison between {iphone['brand']} {iphone['model']} and {galaxy['brand']} {galaxy['model']}:",
                            "comparison": comparison,
                            "displayProducts": False,
                            "compareProducts": True
                        }
                
                # Default fallback
                comparison = phone_database.compare_phones(phones[0]["id"], phones[1]["id"])
                return {
                    "message": f"Here's a comparison between {phones[0]['brand']} {phones[0]['model']} and {phones[1]['brand']} {phones[1]['model']}:",
                    "comparison": comparison,
                    "displayProducts": False,
                    "compareProducts": True
                }
        elif any(keyword in message.lower() for keyword in ["under", "budget"]):
            # Extract budget
            import re
            budget_match = re.search(r'under (?:Rs\.?|₹)?(\d+[k]?)|below (?:Rs\.?|₹)?(\d+[k]?)|less than (?:Rs\.?|₹)?(\d+[k]?)|(?:Rs\.?|₹)?(\d+[k]?) budget', message, re.IGNORECASE)
            budget = 50000  # Default budget
            
            if budget_match:
                for i in range(1, len(budget_match.groups()) + 1):
                    if budget_match.group(i):
                        budget = budget_match.group(i)
                        break
                
                # Handle 'k' notation (e.g., 30k)
                if isinstance(budget, str) and budget.lower().endswith('k'):
                    budget = float(budget[:-1]) * 1000
                else:
                    budget = float(budget)
            
            matching_phones = phone_database.filter_phones({"maxPrice": budget})
            
            return {
                "message": f"Here are phones under ₹{budget}:",
                "products": matching_phones,
                "displayProducts": True,
                "compareProducts": False
            }
        else:
            # Default to showing all phones
            all_phones = phone_database.get_all_phones()
            
            return {
                "message": "Here are some popular mobile phones:",
                "products": all_phones,
                "displayProducts": True,
                "compareProducts": False
            }
            
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to process your query: {str(e)}")

@app.get("/api/phones")
async def get_all_phones():
    return phone_database.get_all_phones()

@app.get("/api/phones/{phone_id}")
async def get_phone_by_id(phone_id: int):
    phone = phone_database.get_phone_by_id(phone_id)
    if phone:
        return phone
    else:
        raise HTTPException(status_code=404, detail="Phone not found")

@app.get("/api/compare")
async def compare_phones(id1: int, id2: int):
    if not id1 or not id2:
        raise HTTPException(status_code=400, detail="Two phone IDs are required for comparison")
    
    comparison = phone_database.compare_phones(id1, id2)
    
    if comparison:
        return comparison
    else:
        raise HTTPException(status_code=404, detail="One or both phones not found")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("server:app", host="0.0.0.0", port=int(os.getenv("PORT", 5000)), reload=True)