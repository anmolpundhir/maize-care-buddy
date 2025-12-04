import { useState, useRef, useEffect } from "react";
import { Send, Bot, User, Loader2, Sprout } from "lucide-react";
import { Button } from "./ui/button";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

const predefinedResponses: Record<string, string> = {
  "fertilizer": "For maize crops, apply NPK fertilizer (20-10-10) at the rate of 120 kg N, 60 kg P2O5, and 40 kg K2O per hectare. Apply nitrogen in split doses - half at planting and half at knee-high stage.",
  "water": "Maize requires 500-800mm of water during its growth period. Water stress during tasseling and silking can reduce yield by up to 50%. Ensure consistent moisture especially during flowering.",
  "pest": "Common maize pests include stem borers, armyworms, and aphids. Use integrated pest management: monitor regularly, use resistant varieties, apply neem-based pesticides, and release beneficial insects like Trichogramma.",
  "harvest": "Harvest maize when kernels are hard and moisture content is below 25%. The husk should be dry and brown. For grain, wait until moisture is 13-14%. Use a shelling machine or hand-shell for small quantities.",
  "plant": "Plant maize when soil temperature is above 12°C. Space rows 75cm apart with 25cm between plants. Plant seeds 5-7cm deep. Best planting time is early monsoon for rainfed areas.",
  "soil": "Maize grows best in well-drained loamy soils with pH 5.8-7.0. Add organic matter before planting. Avoid waterlogged soils. Test soil annually and apply lime if pH is too low.",
};

const Chatbot = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "assistant",
      content: "Hello! I'm your farming assistant. Ask me anything about maize cultivation, disease prevention, or crop management. I'm here to help! 🌽",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const generateResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();
    
    // Check for keyword matches
    for (const [keyword, response] of Object.entries(predefinedResponses)) {
      if (lowerMessage.includes(keyword)) {
        return response;
      }
    }
    
    // Check for disease-related queries
    if (lowerMessage.includes("disease") || lowerMessage.includes("blight") || lowerMessage.includes("rust") || lowerMessage.includes("spot")) {
      return "For disease identification, please use our image upload feature above. Upload a clear photo of the affected leaf, and our AI will detect the disease and suggest remedies. Common maize diseases include Northern Leaf Blight, Common Rust, and Gray Leaf Spot.";
    }
    
    // Check for government scheme queries
    if (lowerMessage.includes("scheme") || lowerMessage.includes("subsidy") || lowerMessage.includes("government") || lowerMessage.includes("loan")) {
      return "Check our Government Schemes section below for information about PM-KISAN, Kisan Credit Card, and Crop Insurance schemes. You can also visit your local Krishi Vigyan Kendra for personalized assistance.";
    }
    
    // Default response
    return "I can help you with maize farming queries about fertilizers, watering, pest control, planting, harvesting, and soil management. For disease detection, please upload a leaf image using the feature above. What specific aspect of maize farming can I assist you with?";
  };

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input.trim(),
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    // Simulate typing delay
    await new Promise((resolve) => setTimeout(resolve, 1000 + Math.random() * 1000));

    const response = generateResponse(userMessage.content);

    const assistantMessage: Message = {
      id: (Date.now() + 1).toString(),
      role: "assistant",
      content: response,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, assistantMessage]);
    setIsTyping(false);
  };

  const quickQuestions = [
    "How much water does maize need?",
    "Best fertilizer for maize?",
    "How to prevent pests?",
    "When to harvest maize?",
  ];

  return (
    <section id="chat" className="py-16 md:py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-primary/10 rounded-full px-4 py-2 mb-4">
              <Sprout className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">AI Farming Expert</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Ask Your Farming Questions
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Get instant answers about maize cultivation, pest control, disease prevention, and more.
            </p>
          </div>

          {/* Chat Container */}
          <div className="bg-card rounded-2xl shadow-elevated overflow-hidden">
            {/* Messages Area */}
            <div className="h-96 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex gap-3 ${
                    message.role === "user" ? "flex-row-reverse" : ""
                  } animate-fade-up`}
                >
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                      message.role === "user"
                        ? "bg-primary"
                        : "bg-secondary"
                    }`}
                  >
                    {message.role === "user" ? (
                      <User className="w-4 h-4 text-primary-foreground" />
                    ) : (
                      <Bot className="w-4 h-4 text-secondary-foreground" />
                    )}
                  </div>
                  <div
                    className={`max-w-[75%] p-3 rounded-2xl ${
                      message.role === "user"
                        ? "bg-primary text-primary-foreground rounded-tr-sm"
                        : "bg-muted text-foreground rounded-tl-sm"
                    }`}
                  >
                    <p className="text-sm leading-relaxed">{message.content}</p>
                  </div>
                </div>
              ))}
              
              {isTyping && (
                <div className="flex gap-3 animate-fade-up">
                  <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center">
                    <Bot className="w-4 h-4 text-secondary-foreground" />
                  </div>
                  <div className="bg-muted p-3 rounded-2xl rounded-tl-sm">
                    <div className="flex gap-1">
                      <span className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                      <span className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                      <span className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                    </div>
                  </div>
                </div>
              )}
              
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Questions */}
            <div className="px-4 py-3 border-t border-border overflow-x-auto">
              <div className="flex gap-2">
                {quickQuestions.map((question) => (
                  <button
                    key={question}
                    onClick={() => setInput(question)}
                    className="px-3 py-1.5 text-xs font-medium text-muted-foreground bg-muted hover:bg-primary/10 hover:text-primary rounded-full whitespace-nowrap transition-colors"
                  >
                    {question}
                  </button>
                ))}
              </div>
            </div>

            {/* Input Area */}
            <div className="p-4 border-t border-border">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSend();
                }}
                className="flex gap-3"
              >
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Type your farming question..."
                  className="flex-1 px-4 py-3 bg-muted rounded-xl border border-border focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all text-foreground placeholder:text-muted-foreground"
                />
                <Button type="submit" size="lg" disabled={!input.trim() || isTyping}>
                  {isTyping ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <Send className="w-5 h-5" />
                  )}
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Chatbot;
