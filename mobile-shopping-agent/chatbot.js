// Chatbot logic for mobile shopping agent
class MobileShoppingChatbot {
    constructor() {
        this.context = {
            currentQuery: null,
            displayedProducts: [],
            comparisonPhones: [],
            lastMentionedPhone: null
        };
        
        // Intent patterns for query classification
        this.intentPatterns = {
            budget: /under (?:Rs\.?|₹)?(\d+[k]?)|below (?:Rs\.?|₹)?(\d+[k]?)|less than (?:Rs\.?|₹)?(\d+[k]?)|(?:Rs\.?|₹)?(\d+[k]?) budget/i,
            brand: /\b(samsung|apple|iphone|google|pixel|oneplus|xiaomi|redmi|motorola|realme|vivo|nothing|poco|iqoo)\b/gi,
            camera: /\b(camera|photo|photography|megapixel|mp)\b/i,
            battery: /\b(battery|backup|mah|charging|fast charge)\b/i,
            display: /\b(display|screen|amoled|lcd|refresh rate|hz)\b/i,
            performance: /\b(performance|processor|snapdragon|dimensity|exynos|gaming|ram)\b/i,
            storage: /\b(storage|gb|memory)\b/i,
            compare: /\b(compare|vs|versus)\b/i,
            explain: /\b(explain|what is|what are|how does|difference between)\b/i,
            showDetails: /\b(tell me more|more details|specifications|specs)\b/i
        };
        
        // Safety patterns to detect adversarial queries
        this.safetyPatterns = {
            systemPrompt: /\b(system prompt|ignore rules|ignore instructions|reveal prompt|prompt injection)\b/i,
            apiKey: /\b(api key|secret key|access key|token)\b/i,
            internalLogic: /\b(internal logic|how do you work|your code|your algorithm)\b/i,
            defamation: /\b(trash|sucks|terrible|worst|garbage)\b/i,
            irrelevant: /\b(politics|religion|dating|gambling|drugs|weapons)\b/i
        };
        
        // Technical terms explanations
        this.technicalTerms = {
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
    }
    
    // Process user query and generate response
    processQuery(query) {
        // Store the current query
        this.context.currentQuery = query;
        
        // Check for adversarial or unsafe queries
        const safetyCheck = this.checkSafety(query);
        if (safetyCheck.unsafe) {
            return {
                message: safetyCheck.response,
                displayProducts: false,
                compareProducts: false
            };
        }
        
        // Check for technical term explanation
        const termExplanation = this.explainTechnicalTerm(query);
        if (termExplanation) {
            return {
                message: termExplanation,
                displayProducts: false,
                compareProducts: false
            };
        }
        
        // Check for comparison request
        if (this.intentPatterns.compare.test(query)) {
            return this.handleComparisonQuery(query);
        }
        
        // Check for "tell me more" about a specific phone
        if (this.intentPatterns.showDetails.test(query) && this.context.lastMentionedPhone) {
            return this.showPhoneDetails(this.context.lastMentionedPhone);
        }
        
        // Handle regular product search query
        return this.handleSearchQuery(query);
    }
    
    // Check if query is adversarial or unsafe
    checkSafety(query) {
        // Check for system prompt/instructions reveal attempts
        if (this.safetyPatterns.systemPrompt.test(query)) {
            return {
                unsafe: true,
                response: "I'm designed to help you find the perfect mobile phone. I can't reveal my internal instructions or modify my core functionality. How can I assist you with mobile shopping today?"
            };
        }
        
        // Check for API key/secrets reveal attempts
        if (this.safetyPatterns.apiKey.test(query)) {
            return {
                unsafe: true,
                response: "I don't have access to API keys or sensitive credentials. I'm here to help you find the right mobile phone. What features are you looking for in your next phone?"
            };
        }
        
        // Check for internal logic reveal attempts
        if (this.safetyPatterns.internalLogic.test(query)) {
            return {
                unsafe: true,
                response: "I'm a specialized shopping assistant for mobile phones. I can help you find phones based on your preferences, compare models, and explain features. What kind of phone are you looking for today?"
            };
        }
        
        // Check for brand defamation attempts
        if (this.safetyPatterns.defamation.test(query)) {
            return {
                unsafe: true,
                response: "I aim to provide objective information about mobile phones based on their specifications and features. I can help you compare phones or find ones that match your requirements. What specific features are important to you?"
            };
        }
        
        // Check for irrelevant topics
        if (this.safetyPatterns.irrelevant.test(query)) {
            return {
                unsafe: true,
                response: "I'm specialized in helping with mobile phone shopping. I can assist with finding phones based on features, comparing models, or explaining technical specifications. How can I help with your phone search today?"
            };
        }
        
        return { unsafe: false };
    }
    
    // Handle product search queries
    handleSearchQuery(query) {
        // Extract criteria from query
        const criteria = this.extractSearchCriteria(query);
        
        // Get matching phones
        const matchingPhones = window.phoneDatabase.filterPhones(criteria);
        
        // Store displayed products in context
        this.context.displayedProducts = matchingPhones;
        
        // If there's only one phone, set it as last mentioned
        if (matchingPhones.length === 1) {
            this.context.lastMentionedPhone = matchingPhones[0];
        }
        
        // Generate response
        let response;
        if (matchingPhones.length === 0) {
            response = "I couldn't find any phones matching your criteria. Could you try with different requirements or a broader price range?";
            return {
                message: response,
                displayProducts: false,
                compareProducts: false
            };
        } else {
            // Create response based on the criteria and matching phones
            response = this.generateSearchResponse(criteria, matchingPhones);
            return {
                message: response,
                products: matchingPhones,
                displayProducts: true,
                compareProducts: false
            };
        }
    }
    
    // Extract search criteria from query
    extractSearchCriteria(query) {
        const criteria = {};
        
        // Extract budget
        const budgetMatch = query.match(this.intentPatterns.budget);
        if (budgetMatch) {
            let budget = null;
            for (let i = 1; i < budgetMatch.length; i++) {
                if (budgetMatch[i]) {
                    budget = budgetMatch[i];
                    break;
                }
            }
            
            if (budget) {
                // Handle 'k' notation (e.g., 30k)
                if (budget.toLowerCase().endsWith('k')) {
                    budget = parseFloat(budget.slice(0, -1)) * 1000;
                } else {
                    budget = parseFloat(budget);
                }
                
                criteria.maxPrice = budget;
            }
        }
        
        // Extract brand
        const brandMatches = query.match(this.intentPatterns.brand);
        if (brandMatches) {
            // Handle special cases like "iPhone" mapping to "Apple"
            const brandMap = {
                "iphone": "Apple",
                "pixel": "Google"
            };
            
            criteria.brand = brandMatches.map(brand => {
                const lowerBrand = brand.toLowerCase();
                return brandMap[lowerBrand] || brand;
            });
        }
        
        // Extract camera importance
        if (this.intentPatterns.camera.test(query)) {
            if (query.includes("best camera") || query.includes("great camera") || query.includes("excellent camera")) {
                criteria.camera = 48; // Looking for high MP cameras
            } else {
                criteria.camera = 12; // Basic good camera
            }
        }
        
        // Extract battery importance
        if (this.intentPatterns.battery.test(query)) {
            if (query.includes("battery king") || query.includes("long battery") || query.includes("best battery")) {
                criteria.minBattery = 5000;
            }
            
            if (query.includes("fast charging")) {
                criteria.minFastCharging = 33;
            }
        }
        
        // Extract display preferences
        if (this.intentPatterns.display.test(query)) {
            if (query.includes("high refresh") || query.includes("smooth")) {
                criteria.minRefreshRate = 90;
            }
            
            if (query.includes("compact") || query.includes("small") || query.includes("one-hand") || query.includes("one hand")) {
                criteria.maxDisplaySize = 6.1;
            }
            
            if (query.includes("large") || query.includes("big screen")) {
                criteria.minDisplaySize = 6.5;
            }
        }
        
        // Extract performance preferences
        if (this.intentPatterns.performance.test(query)) {
            if (query.includes("gaming") || query.includes("performance") || query.includes("fast")) {
                criteria.minRam = 8;
            }
        }
        
        return criteria;
    }
    
    // Generate response for search query
    generateSearchResponse(criteria, phones) {
        // Sort phones by relevance (currently just by price)
        let sortedPhones = [...phones];
        
        // If budget is specified, sort by price (descending) to show best options within budget
        if (criteria.maxPrice) {
            sortedPhones.sort((a, b) => b.price - a.price);
        }
        
        // If camera is important, prioritize phones with better cameras
        if (criteria.camera) {
            sortedPhones.sort((a, b) => {
                const aMP = parseInt(a.camera.main);
                const bMP = parseInt(b.camera.main);
                return bMP - aMP;
            });
        }
        
        // If battery is important, prioritize phones with better battery
        if (criteria.minBattery) {
            sortedPhones.sort((a, b) => b.battery.capacity - a.battery.capacity);
        }
        
        // Limit to top 5 phones
        const topPhones = sortedPhones.slice(0, 5);
        
        // Generate response
        let response = `I found ${phones.length} phones that match your criteria. `;
        
        // Add budget context if specified
        if (criteria.maxPrice) {
            response += `Here are the best options under ₹${criteria.maxPrice.toLocaleString()}: `;
        } else {
            response += "Here are the top recommendations: ";
        }
        
        // Add top phone highlights
        response += this.generatePhoneHighlights(topPhones[0], criteria);
        
        // Add summary of other options
        if (topPhones.length > 1) {
            response += " I've also included other great options that match your requirements.";
        }
        
        return response;
    }
    
    // Generate highlights for a specific phone
    generatePhoneHighlights(phone, criteria) {
        let highlights = `The ${phone.name} (₹${phone.price.toLocaleString()}) stands out with `;
        
        const highlightPoints = [];
        
        // Camera highlight
        if (criteria.camera || this.intentPatterns.camera.test(this.context.currentQuery)) {
            highlightPoints.push(`a ${phone.camera.main} main camera with ${phone.camera.features.join(", ")}`);
        }
        
        // Battery highlight
        if (criteria.minBattery || criteria.minFastCharging || this.intentPatterns.battery.test(this.context.currentQuery)) {
            highlightPoints.push(`a ${phone.battery.capacity}mAh battery with ${phone.battery.fastCharging} fast charging`);
        }
        
        // Display highlight
        if (criteria.minDisplaySize || criteria.maxDisplaySize || criteria.minRefreshRate || this.intentPatterns.display.test(this.context.currentQuery)) {
            highlightPoints.push(`a ${phone.display.size}" ${phone.display.type} display with ${phone.display.refreshRate}Hz refresh rate`);
        }
        
        // Performance highlight
        if (criteria.minRam || this.intentPatterns.performance.test(this.context.currentQuery)) {
            highlightPoints.push(`${phone.ram} RAM and ${phone.processor} processor`);
        }
        
        // Join highlights
        if (highlightPoints.length > 0) {
            highlights += highlightPoints.join(", ") + ".";
        } else {
            // Generic highlights if no specific criteria
            highlights += `a ${phone.display.size}" ${phone.display.type} display, ${phone.camera.main} main camera, and ${phone.battery.capacity}mAh battery.`;
        }
        
        return highlights;
    }
    
    // Handle comparison queries
    handleComparisonQuery(query) {
        // Extract phone models to compare
        const phoneModels = this.extractPhoneModelsForComparison(query);
        
        if (phoneModels.length < 2) {
            return {
                message: "I couldn't identify the phones you want to compare. Please specify the models clearly, for example: 'Compare iPhone 15 vs Samsung Galaxy S23'.",
                displayProducts: false,
                compareProducts: false
            };
        }
        
        // Find matching phones in database
        const phonesToCompare = [];
        for (const model of phoneModels) {
            const matchingPhones = window.phoneDatabase.getAllPhones().filter(phone => 
                phone.name.toLowerCase().includes(model.toLowerCase()) ||
                (phone.brand.toLowerCase() + " " + phone.name.toLowerCase()).includes(model.toLowerCase())
            );
            
            if (matchingPhones.length > 0) {
                phonesToCompare.push(matchingPhones[0]);
            }
        }
        
        if (phonesToCompare.length < 2) {
            return {
                message: "I couldn't find all the phones you mentioned in our database. Please check the model names and try again.",
                displayProducts: false,
                compareProducts: false
            };
        }
        
        // Store comparison phones in context
        this.context.comparisonPhones = phonesToCompare;
        
        // Generate comparison response
        const response = this.generateComparisonResponse(phonesToCompare);
        
        return {
            message: response,
            products: phonesToCompare,
            displayProducts: false,
            compareProducts: true
        };
    }
    
    // Extract phone models for comparison
    extractPhoneModelsForComparison(query) {
        // Remove comparison words
        const cleanQuery = query.replace(/compare|vs|versus/gi, '');
        
        // Split by common separators
        const parts = cleanQuery.split(/(?:,|and|\s+with\s+)/i);
        
        // Clean up parts
        const models = parts
            .map(part => part.trim())
            .filter(part => part.length > 0);
        
        return models;
    }
    
    // Generate comparison response
    generateComparisonResponse(phones) {
        let response = `Let's compare the ${phones.map(p => p.name).join(' and ')}:\n\n`;
        
        // Price comparison
        response += `**Price**: `;
        phones.forEach((phone, index) => {
            response += `${phone.name}: ₹${phone.price.toLocaleString()}`;
            if (index < phones.length - 1) response += " vs ";
        });
        
        // Determine price winner
        const cheapestPhone = phones.reduce((prev, current) => (prev.price < current.price) ? prev : current);
        if (phones[0].price !== phones[1].price) {
            response += ` (${cheapestPhone.name} is more affordable)`;
        }
        response += "\n\n";
        
        // Display comparison
        response += `**Display**: `;
        phones.forEach((phone, index) => {
            response += `${phone.name}: ${phone.display.size}" ${phone.display.type} at ${phone.display.refreshRate}Hz`;
            if (index < phones.length - 1) response += " vs ";
        });
        
        // Determine refresh rate winner
        const highestRefreshPhone = phones.reduce((prev, current) => 
            (prev.display.refreshRate > current.display.refreshRate) ? prev : current
        );
        if (phones[0].display.refreshRate !== phones[1].display.refreshRate) {
            response += ` (${highestRefreshPhone.name} has smoother scrolling)`;
        }
        response += "\n\n";
        
        // Camera comparison
        response += `**Camera**: `;
        phones.forEach((phone, index) => {
            response += `${phone.name}: ${phone.camera.main} main`;
            if (phone.camera.ultrawide) response += `, ${phone.camera.ultrawide} ultrawide`;
            if (phone.camera.telephoto) response += `, ${phone.camera.telephoto} telephoto`;
            if (index < phones.length - 1) response += " vs ";
        });
        response += "\n\n";
        
        // Battery comparison
        response += `**Battery**: `;
        phones.forEach((phone, index) => {
            response += `${phone.name}: ${phone.battery.capacity}mAh, ${phone.battery.fastCharging} fast charging`;
            if (index < phones.length - 1) response += " vs ";
        });
        
        // Determine battery winner
        const biggestBatteryPhone = phones.reduce((prev, current) => 
            (prev.battery.capacity > current.battery.capacity) ? prev : current
        );
        if (phones[0].battery.capacity !== phones[1].battery.capacity) {
            response += ` (${biggestBatteryPhone.name} has larger battery)`;
        }
        response += "\n\n";
        
        // Performance comparison
        response += `**Performance**: `;
        phones.forEach((phone, index) => {
            response += `${phone.name}: ${phone.processor}, ${phone.ram}`;
            if (index < phones.length - 1) response += " vs ";
        });
        response += "\n\n";
        
        // Overall recommendation
        response += "**Recommendation**: ";
        if (phones[0].price > phones[1].price * 1.3) {
            response += `The ${phones[1].name} offers better value for money.`;
        } else if (phones[1].price > phones[0].price * 1.3) {
            response += `The ${phones[0].name} offers better value for money.`;
        } else {
            // More nuanced recommendation based on features
            const phone1Points = this.calculatePhonePoints(phones[0]);
            const phone2Points = this.calculatePhonePoints(phones[1]);
            
            if (phone1Points > phone2Points * 1.2) {
                response += `The ${phones[0].name} offers a better overall experience.`;
            } else if (phone2Points > phone1Points * 1.2) {
                response += `The ${phones[1].name} offers a better overall experience.`;
            } else {
                response += `Both phones are excellent choices with different strengths. The ${phones[0].name} is better for ${this.getPhoneStrength(phones[0])}, while the ${phones[1].name} excels in ${this.getPhoneStrength(phones[1])}.`;
            }
        }
        
        return response;
    }
    
    // Calculate points for phone comparison
    calculatePhonePoints(phone) {
        let points = 0;
        
        // Camera points (max 30)
        const mainCamera = parseInt(phone.camera.main);
        points += Math.min(mainCamera / 2, 30);
        
        // Display points (max 20)
        points += Math.min(phone.display.refreshRate / 6, 20);
        
        // Battery points (max 25)
        points += Math.min(phone.battery.capacity / 200, 25);
        
        // Fast charging points (max 15)
        const fastChargingWatts = parseInt(phone.battery.fastCharging);
        points += Math.min(fastChargingWatts / 7, 15);
        
        // RAM points (max 10)
        const ram = parseInt(phone.ram);
        points += Math.min(ram / 1.2, 10);
        
        return points;
    }
    
    // Get phone's main strength
    getPhoneStrength(phone) {
        const mainCamera = parseInt(phone.camera.main);
        const fastChargingWatts = parseInt(phone.battery.fastCharging);
        const ram = parseInt(phone.ram);
        
        if (mainCamera >= 48) return "photography";
        if (phone.battery.capacity >= 5000) return "battery life";
        if (fastChargingWatts >= 65) return "fast charging";
        if (phone.display.refreshRate >= 120) return "smooth display";
        if (ram >= 12) return "performance";
        
        return "overall balance";
    }
    
    // Show detailed information about a specific phone
    showPhoneDetails(phone) {
        if (!phone) {
            return {
                message: "I don't have information about that specific phone. Could you ask about one of the phones I've mentioned?",
                displayProducts: false,
                compareProducts: false
            };
        }
        
        let details = `Here are the detailed specifications for the ${phone.name}:\n\n`;
        
        details += `**Price**: ₹${phone.price.toLocaleString()}\n\n`;
        
        details += `**Display**:\n`;
        details += `- ${phone.display.size}" ${phone.display.type}\n`;
        details += `- Resolution: ${phone.display.resolution}\n`;
        details += `- Refresh Rate: ${phone.display.refreshRate}Hz\n\n`;
        
        details += `**Camera**:\n`;
        details += `- Main: ${phone.camera.main}\n`;
        if (phone.camera.ultrawide) details += `- Ultrawide: ${phone.camera.ultrawide}\n`;
        if (phone.camera.telephoto) details += `- Telephoto: ${phone.camera.telephoto}\n`;
        if (phone.camera.macro) details += `- Macro: ${phone.camera.macro}\n`;
        details += `- Front: ${phone.camera.front}\n`;
        details += `- Features: ${phone.camera.features.join(", ")}\n\n`;
        
        details += `**Performance**:\n`;
        details += `- Processor: ${phone.processor}\n`;
        details += `- RAM: ${phone.ram}\n`;
        details += `- Storage: ${phone.storage}\n\n`;
        
        details += `**Battery**:\n`;
        details += `- Capacity: ${phone.battery.capacity}mAh\n`;
        details += `- Fast Charging: ${phone.battery.fastCharging}\n\n`;
        
        details += `**Other**:\n`;
        details += `- OS: ${phone.os}\n`;
        details += `- Water Resistant: ${phone.waterResistant ? "Yes" : "No"}\n`;
        details += `- Dimensions: ${phone.dimensions.height} x ${phone.dimensions.width} x ${phone.dimensions.thickness}mm\n`;
        details += `- Weight: ${phone.weight}g\n`;
        details += `- Colors: ${phone.colors.join(", ")}\n`;
        
        return {
            message: details,
            products: [phone],
            displayProducts: true,
            compareProducts: false
        };
    }
    
    // Explain technical terms
    explainTechnicalTerm(query) {
        // Check for OIS vs EIS explanation
        if (query.match(/explain\s+ois\s+vs\s+eis/i) || query.match(/difference\s+between\s+ois\s+and\s+eis/i)) {
            return `**OIS vs EIS: What's the difference?**\n\n${this.technicalTerms["OIS"]}\n\n${this.technicalTerms["EIS"]}\n\nIn summary, OIS is hardware-based and generally produces better results, especially in low light, while EIS is software-based and more battery-efficient. Many flagship phones use both technologies together for optimal stabilization.`;
        }
        
        // Check for other technical terms
        for (const term in this.technicalTerms) {
            if (query.match(new RegExp(`explain\\s+${term}|what\\s+is\\s+${term}|${term}\\s+meaning`, "i"))) {
                return `**${term}**: ${this.technicalTerms[term]}`;
            }
        }
        
        return null;
    }
}

// Export chatbot
window.MobileShoppingChatbot = MobileShoppingChatbot;