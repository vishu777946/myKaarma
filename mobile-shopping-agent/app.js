// Main application logic
document.addEventListener('DOMContentLoaded', () => {
    // Initialize chatbot
    const chatbot = new window.MobileShoppingChatbot();
    
    // DOM elements
    const chatMessages = document.getElementById('chat-messages');
    const userInput = document.getElementById('user-input');
    const sendButton = document.getElementById('send-btn');
    const productDisplay = document.getElementById('product-display');
    const comparisonView = document.getElementById('comparison-view');
    
    // Add event listeners
    sendButton.addEventListener('click', handleUserInput);
    userInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            handleUserInput();
        }
    });
    
    // Focus input on load
    userInput.focus();
    
    // Handle user input
    function handleUserInput() {
        const query = userInput.value.trim();
        
        // Don't process empty queries
        if (!query) return;
        
        // Add user message to chat
        addMessageToChat(query, 'user');
        
        // Clear input
        userInput.value = '';
        
        // Process query with chatbot
        const response = chatbot.processQuery(query);
        
        // Add bot response to chat
        addMessageToChat(response.message, 'bot');
        
        // Handle product display
        if (response.displayProducts && response.products) {
            showProducts(response.products);
        } else {
            hideProducts();
        }
        
        // Handle comparison view
        if (response.compareProducts && response.products) {
            showComparison(response.products);
        } else {
            hideComparison();
        }
    }
    
    // Add message to chat
    function addMessageToChat(message, sender) {
        const messageElement = document.createElement('div');
        messageElement.classList.add('message', sender);
        
        const contentElement = document.createElement('div');
        contentElement.classList.add('message-content');
        
        // Convert markdown-like syntax to HTML
        let formattedMessage = message
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            .replace(/\n\n/g, '<br><br>')
            .replace(/\n/g, '<br>');
        
        contentElement.innerHTML = formattedMessage;
        messageElement.appendChild(contentElement);
        
        chatMessages.appendChild(messageElement);
        
        // Scroll to bottom
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }
    
    // Show products in product display
    function showProducts(products) {
        // Clear previous products
        productDisplay.innerHTML = '';
        
        // Create product cards
        products.forEach(phone => {
            const card = createProductCard(phone);
            productDisplay.appendChild(card);
        });
        
        // Show product display
        productDisplay.classList.add('active');
        
        // Hide comparison view
        hideComparison();
    }
    
    // Create product card
    function createProductCard(phone) {
        const card = document.createElement('div');
        card.classList.add('product-card');
        
        // Create image container
        const imageContainer = document.createElement('div');
        imageContainer.classList.add('product-image');
        
        // Use a placeholder image if no image is available
        const img = document.createElement('img');
        img.src = phone.image || 'https://via.placeholder.com/150?text=Phone';
        img.alt = phone.name;
        imageContainer.appendChild(img);
        
        // Create info container
        const infoContainer = document.createElement('div');
        infoContainer.classList.add('product-info');
        
        // Add phone name
        const nameElement = document.createElement('div');
        nameElement.classList.add('product-name');
        nameElement.textContent = phone.name;
        
        // Add price
        const priceElement = document.createElement('div');
        priceElement.classList.add('product-price');
        priceElement.textContent = `₹${phone.price.toLocaleString()}`;
        
        // Add specs
        const specsElement = document.createElement('div');
        specsElement.classList.add('product-specs');
        
        // Add key specs
        const displaySpec = document.createElement('div');
        displaySpec.textContent = `${phone.display.size}" ${phone.display.type}, ${phone.display.refreshRate}Hz`;
        
        const cameraSpec = document.createElement('div');
        cameraSpec.textContent = `Camera: ${phone.camera.main} main`;
        
        const processorSpec = document.createElement('div');
        processorSpec.textContent = `${phone.processor}, ${phone.ram}`;
        
        const batterySpec = document.createElement('div');
        batterySpec.textContent = `${phone.battery.capacity}mAh, ${phone.battery.fastCharging} charging`;
        
        // Append specs
        specsElement.appendChild(displaySpec);
        specsElement.appendChild(cameraSpec);
        specsElement.appendChild(processorSpec);
        specsElement.appendChild(batterySpec);
        
        // Append all elements to info container
        infoContainer.appendChild(nameElement);
        infoContainer.appendChild(priceElement);
        infoContainer.appendChild(specsElement);
        
        // Append image and info to card
        card.appendChild(imageContainer);
        card.appendChild(infoContainer);
        
        return card;
    }
    
    // Hide products
    function hideProducts() {
        productDisplay.classList.remove('active');
    }
    
    // Show comparison
    function showComparison(phones) {
        // Clear previous comparison
        comparisonView.innerHTML = '';
        
        // Create comparison table
        const table = document.createElement('table');
        table.classList.add('comparison-table');
        
        // Create header row
        const headerRow = document.createElement('tr');
        const emptyHeader = document.createElement('th');
        headerRow.appendChild(emptyHeader);
        
        phones.forEach(phone => {
            const header = document.createElement('th');
            header.textContent = phone.name;
            headerRow.appendChild(header);
        });
        
        table.appendChild(headerRow);
        
        // Create rows for each specification
        const specs = [
            { name: 'Price', getValue: (phone) => `₹${phone.price.toLocaleString()}` },
            { name: 'Display', getValue: (phone) => `${phone.display.size}" ${phone.display.type}` },
            { name: 'Resolution', getValue: (phone) => phone.display.resolution },
            { name: 'Refresh Rate', getValue: (phone) => `${phone.display.refreshRate}Hz` },
            { name: 'Main Camera', getValue: (phone) => phone.camera.main },
            { name: 'Ultrawide', getValue: (phone) => phone.camera.ultrawide || 'N/A' },
            { name: 'Telephoto', getValue: (phone) => phone.camera.telephoto || 'N/A' },
            { name: 'Front Camera', getValue: (phone) => phone.camera.front },
            { name: 'Processor', getValue: (phone) => phone.processor },
            { name: 'RAM', getValue: (phone) => phone.ram },
            { name: 'Storage', getValue: (phone) => phone.storage },
            { name: 'Battery', getValue: (phone) => `${phone.battery.capacity}mAh` },
            { name: 'Fast Charging', getValue: (phone) => phone.battery.fastCharging },
            { name: 'OS', getValue: (phone) => phone.os },
            { name: 'Weight', getValue: (phone) => `${phone.weight}g` },
            { name: 'Water Resistant', getValue: (phone) => phone.waterResistant ? 'Yes' : 'No' }
        ];
        
        specs.forEach(spec => {
            const row = document.createElement('tr');
            
            const nameCell = document.createElement('td');
            nameCell.textContent = spec.name;
            row.appendChild(nameCell);
            
            phones.forEach(phone => {
                const valueCell = document.createElement('td');
                valueCell.textContent = spec.getValue(phone);
                row.appendChild(valueCell);
            });
            
            table.appendChild(row);
        });
        
        comparisonView.appendChild(table);
        
        // Show comparison view
        comparisonView.classList.add('active');
        
        // Hide product display
        hideProducts();
    }
    
    // Hide comparison
    function hideComparison() {
        comparisonView.classList.remove('active');
    }
});