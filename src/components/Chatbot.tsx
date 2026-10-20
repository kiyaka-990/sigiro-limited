"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { MessageCircle, X, Send, Bot, Minimize2, Maximize2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { getBotResponse, generateId, welcomeMessage, type ChatMessage } from "@/lib/chatbot-data";

function formatMessage(text: string) {
  return text
    .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
    .replace(/\*(.*?)\*/g, "<em>$1</em>")
    .replace(/\n/g, "<br />");
}

function TypingIndicator() {
  return (
    <div className="flex items-end gap-2">
      <div className="w-7 h-7 rounded-full bg-[#0e2016] dark:bg-[var(--gold)] flex items-center justify-center flex-shrink-0">
        <Bot className="w-4 h-4 text-white" />
      </div>
      <div className="bubble-bot px-4 py-3">
        <div className="flex items-center gap-1.5">
          <span className="typing-dot w-2 h-2 rounded-full bg-slate-400 block" />
          <span className="typing-dot w-2 h-2 rounded-full bg-slate-400 block" />
          <span className="typing-dot w-2 h-2 rounded-full bg-slate-400 block" />
        </div>
      </div>
    </div>
  );
}

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([welcomeMessage]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [unread, setUnread] = useState(1);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping, scrollToBottom]);

  const handleOpen = () => {
    setIsOpen(true);
    setIsMinimized(false);
    setUnread(0);
    setTimeout(() => inputRef.current?.focus(), 100);
  };

  const sendMessage = useCallback(
    async (text?: string) => {
      const msg = (text || input).trim();
      if (!msg) return;

      const userMsg: ChatMessage = {
        id: generateId(),
        role: "user",
        content: msg,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, userMsg]);
      setInput("");
      setIsTyping(true);

      // Simulate typing delay (600–1200ms)
      const delay = 600 + Math.random() * 600;
      await new Promise((r) => setTimeout(r, delay));

      const response = getBotResponse(msg);
      const botMsg: ChatMessage = {
        id: generateId(),
        role: "bot",
        content: response.message,
        timestamp: new Date(),
      };

      setIsTyping(false);
      setMessages((prev) => [...prev, botMsg]);

      if (response.quickReplies) {
        const qrMsg: ChatMessage = {
          id: generateId() + "-qr",
          role: "bot",
          content: "__quickreplies__",
          timestamp: new Date(),
        };
        (qrMsg as ChatMessage & { quickReplies: string[] }).quickReplies = response.quickReplies;
        setMessages((prev) => [...prev, qrMsg]);
      }
    },
    [input]
  );

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <>
      {/* Floating button */}
      <div className="fixed bottom-6 right-5 z-50">
        {!isOpen && (
          <div className="relative">
            {unread > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-[var(--gold)] text-white text-xs rounded-full flex items-center justify-center font-bold z-10 ring-2 ring-white dark:ring-[#0c1a12]">
                {unread}
              </span>
            )}
            <button
              onClick={handleOpen}
              className="w-[52px] h-[52px] bg-[#0e2016] dark:bg-[var(--gold)] hover:bg-slate-800 dark:hover:bg-[var(--gold-hover)] text-white rounded-full shadow-xl flex items-center justify-center transition-all duration-300 hover:scale-110"
              aria-label="Open chat assistant"
            >
              <MessageCircle className="w-6 h-6" />
            </button>
          </div>
        )}

        {/* Chat window */}
        {isOpen && (
          <div
            className={cn(
              "bg-white dark:bg-[#0c1a12] rounded-2xl shadow-2xl border border-slate-200 dark:border-[#16331f] flex flex-col transition-all duration-300 overflow-hidden",
              isMinimized ? "w-72 h-14" : "w-[22rem] sm:w-96 h-[540px] max-h-[80vh]"
            )}
          >
            {/* Header */}
            <div className="flex items-center gap-3 px-4 py-3 bg-[#0e2016]">
              <div className="relative">
                <div className="w-9 h-9 bg-[var(--gold)] rounded-full flex items-center justify-center">
                  <Bot className="w-5 h-5 text-white" />
                </div>
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-400 rounded-full border-2 border-slate-900" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-white font-bold text-sm">SIGIRO Assistant</p>
                <p className="text-slate-400 text-xs">Online · typically replies instantly</p>
              </div>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => setIsMinimized(!isMinimized)}
                  className="p-1.5 text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                  aria-label={isMinimized ? "Expand" : "Minimize"}
                >
                  {isMinimized ? <Maximize2 className="w-4 h-4" /> : <Minimize2 className="w-4 h-4" />}
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1.5 text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                  aria-label="Close chat"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {!isMinimized && (
              <>
                {/* Messages */}
                <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4 scrollbar-thin">
                  {messages.map((msg) => {
                    const extMsg = msg as ChatMessage & { quickReplies?: string[] };

                    if (extMsg.content === "__quickreplies__" && extMsg.quickReplies) {
                      return (
                        <div key={msg.id} className="flex flex-wrap gap-2 pl-9">
                          {extMsg.quickReplies.map((qr) => (
                            <button
                              key={qr}
                              onClick={() => sendMessage(qr)}
                              className="px-3 py-1.5 text-xs font-medium bg-amber-50 dark:bg-amber-500/10 text-[var(--gold)] border border-amber-200 dark:border-amber-500/30 rounded-full hover:bg-amber-100 dark:hover:bg-amber-500/20 transition-colors"
                            >
                              {qr}
                            </button>
                          ))}
                        </div>
                      );
                    }

                    return (
                      <div
                        key={msg.id}
                        className={cn(
                          "flex items-end gap-2",
                          msg.role === "user" ? "flex-row-reverse" : "flex-row"
                        )}
                      >
                        {msg.role === "bot" && (
                          <div className="w-7 h-7 rounded-full bg-[#0e2016] dark:bg-[var(--gold)] flex items-center justify-center flex-shrink-0">
                            <Bot className="w-4 h-4 text-white" />
                          </div>
                        )}
                        <div
                          className={cn(
                            "max-w-[80%] px-4 py-2.5 text-sm leading-relaxed",
                            msg.role === "user" ? "bubble-user" : "bubble-bot"
                          )}
                          dangerouslySetInnerHTML={{ __html: formatMessage(msg.content) }}
                        />
                      </div>
                    );
                  })}

                  {isTyping && <TypingIndicator />}
                  <div ref={messagesEndRef} />
                </div>

                {/* Input */}
                <div className="px-4 py-3 border-t border-slate-100 dark:border-[#16331f]">
                  <div className="flex items-center gap-2 bg-[#f3f8f4] dark:bg-[#11271b] rounded-xl border border-slate-200 dark:border-[#16331f] px-3 py-2 focus-within:border-[var(--gold)] transition-colors">
                    <input
                      ref={inputRef}
                      type="text"
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      onKeyDown={handleKeyDown}
                      placeholder="Type your message..."
                      className="flex-1 bg-transparent text-sm text-slate-700 dark:text-slate-200 placeholder-slate-400 outline-none"
                      aria-label="Chat message"
                    />
                    <button
                      onClick={() => sendMessage()}
                      disabled={!input.trim()}
                      className="p-2 bg-[#0e2016] dark:bg-[var(--gold)] hover:bg-slate-800 dark:hover:bg-[var(--gold-hover)] disabled:opacity-40 disabled:cursor-not-allowed text-white rounded-lg transition-colors"
                      aria-label="Send message"
                    >
                      <Send className="w-4 h-4" />
                    </button>
                  </div>
                  <p className="text-center text-[10px] text-slate-400 dark:text-slate-600 mt-2">
                    Powered by Sigiro AI Assistant
                  </p>
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </>
  );
}
