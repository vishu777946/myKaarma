import { useState, useEffect, useRef } from 'react';
import axios from 'axios';

// API base URL
const API_URL = 'https://mykaarma-1.onrender.com';
export default function Home() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [products, setProducts] = useState([]);
  const [comparison, setComparison] = useState(null);
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  // Scroll to bottom of messages
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Send message to API
  const sendMessage = async (e) => {
    e.preventDefault();
    
    if (!input.trim()) return;
    
    // Add user message to chat
    const userMessage = { sender: 'user', text: input };
    setMessages(prev => [...prev, userMessage]);
    
    // Clear input and show loading
    setInput('');
    setLoading(true);
    
    try {
      // Send request to API
      const response = await axios.post(`${API_URL}/chat`, { message: input });
      
      // Add bot response to chat
      const botMessage = { 
        sender: 'bot', 
        text: response.data.message,
        products: response.data.products || [],
        comparison: response.data.comparison || null
      };
      
      setMessages(prev => [...prev, botMessage]);
      
      // Update products or comparison if provided
      if (response.data.displayProducts && response.data.products) {
        setProducts(response.data.products);
        setComparison(null);
      } else if (response.data.compareProducts && response.data.comparison) {
        setComparison(response.data.comparison);
        setProducts([]);
      } else {
        setProducts([]);
        setComparison(null);
      }
    } catch (error) {
      console.error('Error sending message:', error);
      
      // Add error message
      const errorMessage = { 
        sender: 'bot', 
        text: 'Sorry, I encountered an error processing your request. Please try again.'
      };
      
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-blue-600 text-white p-4 shadow-md">
        <h1 className="text-xl font-bold">Mobile Shopping Assistant</h1>
      </header>
      
      <div className="flex flex-1 overflow-hidden">
        {/* Main content area */}
        <main className="flex-1 flex flex-col">
          {/* Chat messages */}
          <div className="flex-1 overflow-y-auto p-4">
            {messages.length === 0 ? (
              <div className="flex items-center justify-center h-full text-gray-500">
                <div className="text-center">
                  <h2 className="text-xl font-semibold mb-2">Welcome to Mobile Shopping Assistant!</h2>
                  <p>Ask me about phones, compare models, or get recommendations based on your needs.</p>
                  <div className="mt-4">
                    <p className="font-medium">Try asking:</p>
                    <ul className="mt-2 space-y-1">
                      <li>"Show me phones under ₹50,000"</li>
                      <li>"Which phone has the best camera?"</li>
                      <li>"Compare iPhone 15 Pro and Galaxy S23 Ultra"</li>
                      <li>"What is AMOLED display?"</li>
                    </ul>
                  </div>
                </div>
              </div>
            ) : (
              messages.map((msg, index) => (
                <div 
                  key={index} 
                  className={`mb-4 ${msg.sender === 'user' ? 'flex justify-end' : 'flex justify-start'}`}
                >
                  <div 
                    className={`max-w-[80%] rounded-lg p-3 ${
                      msg.sender === 'user' 
                        ? 'bg-blue-600 text-white rounded-br-none' 
                        : 'bg-white text-gray-800 shadow-sm rounded-bl-none'
                    }`}
                  >
                    <p>{msg.text}</p>
                  </div>
                </div>
              ))
            )}
            <div ref={messagesEndRef} />
          </div>
          
          {/* Product display */}
          {products.length > 0 && (
            <div className="bg-white border-t border-gray-200 p-4 overflow-x-auto">
              <h2 className="text-lg font-semibold mb-3">Recommended Phones</h2>
              <div className="flex space-x-4 pb-2">
                {products.map(phone => (
                  <div key={phone.id} className="flex-shrink-0 w-64 border rounded-lg overflow-hidden shadow-sm">
                    <div className="h-40 bg-gray-200 flex items-center justify-center">
                      <img 
                        src={phone.imageUrl} 
                        alt={`${phone.brand} ${phone.model}`} 
                        className="max-h-full max-w-full object-contain"
                      />
                    </div>
                    <div className="p-3">
                      <h3 className="font-medium">{phone.brand} {phone.model}</h3>
                      <p className="text-blue-600 font-bold">₹{phone.price.toLocaleString()}</p>
                      <div className="mt-2 text-sm text-gray-600">
                        <p>• {phone.camera.main} Main Camera</p>
                        <p>• {phone.display.size} {phone.display.type}</p>
                        <p>• {phone.processor}, {phone.ram}</p>
                        <p>• {phone.battery} Battery</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {/* Comparison display */}
          {comparison && (
            <div className="bg-white border-t border-gray-200 p-4 overflow-x-auto">
              <h2 className="text-lg font-semibold mb-3">Phone Comparison</h2>
              <div className="flex">
                <div className="w-1/3"></div>
                <div className="w-1/3 text-center font-medium">{comparison.phone1.brand} {comparison.phone1.model}</div>
                <div className="w-1/3 text-center font-medium">{comparison.phone2.brand} {comparison.phone2.model}</div>
              </div>
              
              <div className="mt-4 space-y-4">
                {/* Price comparison */}
                <div className="flex">
                  <div className="w-1/3 font-medium">Price</div>
                  <div className={`w-1/3 text-center ${comparison.comparison.price.winner === comparison.phone1.id ? 'text-green-600 font-bold' : ''}`}>
                    ₹{comparison.phone1.price.toLocaleString()}
                  </div>
                  <div className={`w-1/3 text-center ${comparison.comparison.price.winner === comparison.phone2.id ? 'text-green-600 font-bold' : ''}`}>
                    ₹{comparison.phone2.price.toLocaleString()}
                  </div>
                </div>
                
                {/* Camera comparison */}
                <div className="flex">
                  <div className="w-1/3 font-medium">Camera</div>
                  <div className={`w-1/3 text-center ${comparison.comparison.camera.winner === comparison.phone1.id ? 'text-green-600 font-bold' : ''}`}>
                    {comparison.phone1.camera.main} Main
                  </div>
                  <div className={`w-1/3 text-center ${comparison.comparison.camera.winner === comparison.phone2.id ? 'text-green-600 font-bold' : ''}`}>
                    {comparison.phone2.camera.main} Main
                  </div>
                </div>
                
                {/* Display comparison */}
                <div className="flex">
                  <div className="w-1/3 font-medium">Display</div>
                  <div className={`w-1/3 text-center ${comparison.comparison.display.winner === comparison.phone1.id ? 'text-green-600 font-bold' : ''}`}>
                    {comparison.phone1.display.size}, {comparison.phone1.display.refreshRate}Hz
                  </div>
                  <div className={`w-1/3 text-center ${comparison.comparison.display.winner === comparison.phone2.id ? 'text-green-600 font-bold' : ''}`}>
                    {comparison.phone2.display.size}, {comparison.phone2.display.refreshRate}Hz
                  </div>
                </div>
                
                {/* Battery comparison */}
                <div className="flex">
                  <div className="w-1/3 font-medium">Battery</div>
                  <div className={`w-1/3 text-center ${comparison.comparison.battery.winner === comparison.phone1.id ? 'text-green-600 font-bold' : ''}`}>
                    {comparison.phone1.battery}
                  </div>
                  <div className={`w-1/3 text-center ${comparison.comparison.battery.winner === comparison.phone2.id ? 'text-green-600 font-bold' : ''}`}>
                    {comparison.phone2.battery}
                  </div>
                </div>
                
                {/* Processor comparison */}
                <div className="flex">
                  <div className="w-1/3 font-medium">Processor</div>
                  <div className="w-1/3 text-center">{comparison.phone1.processor}</div>
                  <div className="w-1/3 text-center">{comparison.phone2.processor}</div>
                </div>
                
                {/* Storage comparison */}
                <div className="flex">
                  <div className="w-1/3 font-medium">Storage</div>
                  <div className="w-1/3 text-center">{comparison.phone1.storage}</div>
                  <div className="w-1/3 text-center">{comparison.phone2.storage}</div>
                </div>
              </div>
            </div>
          )}
          
          {/* Input area */}
          <div className="bg-white border-t border-gray-200 p-4">
            <form onSubmit={sendMessage} className="flex space-x-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about phones..."
                className="flex-1 border border-gray-300 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                disabled={loading}
              />
              <button
                type="submit"
                className="bg-blue-600 text-white rounded-full p-2 w-10 h-10 flex items-center justify-center focus:outline-none hover:bg-blue-700 disabled:opacity-50"
                disabled={loading}
              >
                {loading ? (
                  <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13a1 1 0 102 0V9.414l1.293 1.293a1 1 0 001.414-1.414z" clipRule="evenodd" />
                  </svg>
                )}
              </button>
            </form>
          </div>
        </main>
      </div>
    </div>
  );
}