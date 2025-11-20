import React, { useState, useRef, useEffect } from 'react';
import { generateKUBotResponse } from '../services/geminiService';
import { ChatMessage, LoadState } from '../types';
import { Send, Sparkles, User, Bot } from 'lucide-react';

export const LiveDemo: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { id: 'welcome', role: 'model', text: '안녕! 나는 고대 AI 비서 "호랑이"야. 무엇이든 물어봐! (예: 중앙광장 맛집 추천해줘)', timestamp: Date.now() }
  ]);
  const [input, setInput] = useState('');
  const [status, setStatus] = useState<LoadState>(LoadState.IDLE);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || status === LoadState.LOADING) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      text: input,
      timestamp: Date.now()
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setStatus(LoadState.LOADING);

    try {
      const responseText = await generateKUBotResponse(input);
      const botMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'model',
        text: responseText,
        timestamp: Date.now()
      };
      setMessages(prev => [...prev, botMsg]);
      setStatus(LoadState.SUCCESS);
    } catch (e) {
      setStatus(LoadState.ERROR);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          
          {/* Text Description */}
          <div className="order-2 lg:order-1">
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-crimson/10 text-crimson text-sm font-bold mb-4">
              <Sparkles className="w-4 h-4 mr-2" />
              Powered by Gemini 2.5
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-6">
              궁금한 건 참지 마세요<br />
              <span className="text-crimson">AI 호랑이</span>에게 물어보세요
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              도서관 좌석 현황부터 오늘 학관 점심 메뉴, 그리고 복잡한 장학금 공지 요약까지.
              최신 Gemini AI 기술이 적용된 챗봇이 24시간 여러분을 도와드립니다.
            </p>
            <ul className="space-y-4">
              {[
                '실시간 캠퍼스 정보 질의응답',
                '복잡한 공지사항 요약 서비스',
                '자연스러운 한국어 대화'
              ].map((item, i) => (
                <li key={i} className="flex items-center text-gray-700">
                  <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center text-green-600 mr-3">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                  </div>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Chat Interface Demo */}
          <div className="order-1 lg:order-2 bg-gray-50 rounded-2xl shadow-xl border border-gray-200 overflow-hidden flex flex-col h-[500px]">
            <div className="bg-crimson p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center text-white text-xl">🐯</div>
                <div>
                  <h3 className="text-white font-bold">AI 호랑이</h3>
                  <p className="text-crimson-100 text-xs text-white/80">Online • Gemini 2.5 Flash</p>
                </div>
              </div>
            </div>

            <div className="flex-1 p-4 overflow-y-auto space-y-4">
              {messages.map((msg) => (
                <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                   <div className={`flex items-end gap-2 max-w-[85%] ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                      <div className={`w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center ${msg.role === 'user' ? 'bg-gray-200 text-gray-600' : 'bg-crimson/10 text-crimson'}`}>
                        {msg.role === 'user' ? <User size={16} /> : <Bot size={16} />}
                      </div>
                      <div className={`px-4 py-3 rounded-2xl text-sm leading-relaxed shadow-sm ${
                        msg.role === 'user' 
                          ? 'bg-gray-800 text-white rounded-br-none' 
                          : 'bg-white text-gray-800 border border-gray-100 rounded-bl-none'
                      }`}>
                        {msg.text}
                      </div>
                   </div>
                </div>
              ))}
              {status === LoadState.LOADING && (
                <div className="flex justify-start">
                  <div className="flex items-end gap-2">
                    <div className="w-8 h-8 rounded-full bg-crimson/10 text-crimson flex items-center justify-center">
                      <Bot size={16} />
                    </div>
                    <div className="bg-white px-4 py-3 rounded-2xl rounded-bl-none border border-gray-100 shadow-sm">
                      <div className="flex space-x-2">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-75"></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-150"></div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            <div className="p-4 bg-white border-t border-gray-200">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="질문을 입력하세요..."
                  className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-crimson focus:border-transparent"
                  disabled={status === LoadState.LOADING}
                />
                <button
                  onClick={handleSend}
                  disabled={!input.trim() || status === LoadState.LOADING}
                  className="bg-crimson text-white p-2 rounded-lg hover:bg-crimson-dark disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};