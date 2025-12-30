
import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Send, Bot, User, Loader2, ShieldCheck, Sparkles } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { GoogleGenAI } from '@google/genai';
import { MOCK_PRICES } from '../../constants';

interface Message {
  role: 'user' | 'model';
  text: string;
}

export const AIAssistant: React.FC = () => {
  const { t, language, dir } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const MotionAny = motion as any;

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSend = async () => {
    if (!input.trim() || isTyping) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setIsTyping(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
      
      const priceContext = MOCK_PRICES.map(p => 
        `- ${language === 'ar' ? p.nameAr : p.nameEn}: ${p.price} YER (Code: ${p.code})`
      ).join('\n');

      const systemInstruction = `
        You are the official AI Assistant for the Consumer Protection Association (CPA) in Taiz, Yemen.
        Your goal is to help citizens understand their rights, verify official prices, and guide them in reporting market violations.
        
        Current Official Prices Context for Taiz:
        ${priceContext}
        
        Guidelines:
        - If a user asks for a price, check the context above first.
        - Encourage users to report violations via the "Report" section if they find discrepancies.
        - Be professional, empathetic, and helpful.
        - Respond in the user's language (${language === 'ar' ? 'Arabic' : 'English'}).
        - For Arabic responses, use a formal yet friendly tone suitable for Taiz citizens.
      `;

      const chat = ai.chats.create({
        model: 'gemini-3-flash-preview',
        config: {
          systemInstruction,
        }
      });

      const response = await chat.sendMessage({ message: userMessage });
      const aiText = response.text || (language === 'ar' ? "عذراً، واجهت مشكلة في المعالجة." : "Sorry, I encountered an error processing your request.");
      
      setMessages(prev => [...prev, { role: 'model', text: aiText }]);
    } catch (error) {
      console.error('AI Error:', error);
      setMessages(prev => [...prev, { 
        role: 'model', 
        text: language === 'ar' ? "حدث خطأ في الاتصال بالذكاء الاصطناعي." : "Connection error with the AI service." 
      }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="fixed bottom-8 end-8 z-[100] font-cairo" dir={dir}>
      <AnimatePresence>
        {isOpen && (
          <MotionAny.div
            initial={{ opacity: 0, scale: 0.8, y: 20, transformOrigin: 'bottom right' }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            className="absolute bottom-20 end-0 w-[350px] md:w-[400px] h-[550px] bg-white rounded-[2.5rem] shadow-elegant border border-gray-100 flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="bg-primary p-6 text-white flex justify-between items-center shadow-lg">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-accent rounded-xl">
                  <Bot size={24} className="text-white" />
                </div>
                <div>
                  <h3 className="font-black text-lg leading-none mb-1">{t('ai_assistant_title')}</h3>
                  <div className="flex items-center gap-1.5 opacity-60">
                    <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
                    <span className="text-[10px] font-bold uppercase tracking-widest">Online Support</span>
                  </div>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="p-2 hover:bg-white/10 rounded-xl transition-all"
              >
                <X size={20} />
              </button>
            </div>

            {/* Chat Content */}
            <div 
              ref={scrollRef}
              className="flex-1 overflow-y-auto p-6 space-y-4 bg-gray-50/50"
            >
              <div className="flex gap-3 items-start">
                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary flex-shrink-0">
                  <Bot size={16} />
                </div>
                <div className="bg-white p-4 rounded-2xl rounded-ss-none shadow-sm border border-gray-100 max-w-[85%]">
                  <p className="text-sm font-bold text-gray-700 leading-relaxed">
                    {t('ai_assistant_welcome')}
                  </p>
                </div>
              </div>

              {messages.map((msg, idx) => (
                <div 
                  key={idx} 
                  className={`flex gap-3 items-start ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}
                >
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${msg.role === 'user' ? 'bg-accent text-white' : 'bg-primary/10 text-primary'}`}>
                    {msg.role === 'user' ? <User size={16} /> : <Bot size={16} />}
                  </div>
                  <div className={`p-4 rounded-2xl shadow-sm border max-w-[85%] ${msg.role === 'user' ? 'bg-accent text-white border-transparent rounded-se-none' : 'bg-white text-gray-700 border-gray-100 rounded-ss-none'}`}>
                    <p className="text-sm font-bold leading-relaxed whitespace-pre-wrap">
                      {msg.text}
                    </p>
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="flex gap-3 items-start">
                  <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary flex-shrink-0">
                    <Loader2 size={16} className="animate-spin" />
                  </div>
                  <div className="bg-white p-4 rounded-2xl rounded-ss-none shadow-sm border border-gray-100">
                    <div className="flex gap-1">
                      <motion.span animate={{ opacity: [0, 1, 0] }} transition={{ repeat: Infinity, duration: 1 }} className="w-1.5 h-1.5 bg-gray-300 rounded-full" />
                      <motion.span animate={{ opacity: [0, 1, 0] }} transition={{ repeat: Infinity, duration: 1, delay: 0.2 }} className="w-1.5 h-1.5 bg-gray-300 rounded-full" />
                      <motion.span animate={{ opacity: [0, 1, 0] }} transition={{ repeat: Infinity, duration: 1, delay: 0.4 }} className="w-1.5 h-1.5 bg-gray-300 rounded-full" />
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Input Footer */}
            <div className="p-6 bg-white border-t border-gray-100">
              <div className="flex gap-2">
                <input 
                  type="text" 
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                  placeholder={t('ai_assistant_placeholder')}
                  className="flex-1 bg-gray-50 border border-transparent focus:border-accent outline-none px-5 py-3 rounded-2xl font-bold text-sm transition-all"
                />
                <button 
                  onClick={handleSend}
                  disabled={!input.trim() || isTyping}
                  className="bg-primary text-white p-3 rounded-2xl hover:bg-accent disabled:opacity-50 disabled:hover:bg-primary transition-all shadow-lg shadow-primary/10"
                >
                  <Send size={20} />
                </button>
              </div>
              <div className="mt-4 flex items-center justify-center gap-2 opacity-40">
                <ShieldCheck size={12} />
                <span className="text-[10px] font-black uppercase tracking-widest">CPA Secure Intelligence</span>
              </div>
            </div>
          </MotionAny.div>
        )}
      </AnimatePresence>

      {/* FAB Button */}
      <MotionAny.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className="w-16 h-16 bg-primary text-white rounded-2xl shadow-glow flex items-center justify-center relative group overflow-hidden"
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <MotionAny.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}>
              <X size={32} />
            </MotionAny.div>
          ) : (
            <MotionAny.div key="open" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }}>
              <Sparkles size={32} className="text-accent animate-pulse" />
            </MotionAny.div>
          )}
        </AnimatePresence>
        
        {/* Pulse effect when closed */}
        {!isOpen && (
          <span className="absolute inset-0 bg-white/20 animate-ping rounded-2xl" />
        )}
      </MotionAny.button>
    </div>
  );
};
