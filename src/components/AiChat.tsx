'use client';

import { useChat } from '@ai-sdk/react';
import { useState, useRef, useEffect } from 'react';
import { Sparkles, ArrowRight, ShieldAlert, ChevronDown, Shield, AlertTriangle } from 'lucide-react';
import orgsData from '../db/intelligence/brands/organizations.json';

export default function AiChat() {
  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat() as any;
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  return (
    <div className="flex flex-col h-full w-full max-w-5xl mx-auto font-sans relative">
      
      {/* Lovable-style Animated Ambient Glows */}
      <div className="pointer-events-none absolute left-[30%] top-1/4 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] rounded-full bg-amber-500/20 blur-[100px] z-0 animate-pulse" />
      <div className="pointer-events-none absolute left-[70%] top-[40%] -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] rounded-full bg-fuchsia-600/10 blur-[120px] z-0 animate-pulse delay-700" />
      <div className="pointer-events-none absolute left-1/2 bottom-0 -translate-x-1/2 w-[400px] h-[200px] rounded-full bg-[#034F46]/10 blur-[100px] z-0" />
      
      <div className="flex-1 overflow-y-auto pb-32 pt-12 space-y-8 scrollbar-hide z-10 relative">
        {messages.length === 0 && (
          <div className="flex flex-col items-center justify-center mt-32 space-y-12">
            <div className="text-center space-y-4">
              <div className="relative inline-block">
                <div className="absolute inset-0 bg-gradient-to-r from-amber-500 to-fuchsia-500 blur-2xl opacity-20 rounded-full" />
                <h1 className="text-4xl font-semibold tracking-tight relative text-transparent bg-clip-text bg-gradient-to-br from-white via-white to-white/60">
                  What do you want to know?
                </h1>
              </div>
              <p className="text-[#2D3142]/50 text-sm max-w-sm mx-auto">Ask AmrootOS to query the Knowledge Graph, uncover relationships, or verify evidence.</p>
            </div>
          </div>
        )}
        
        {messages.map((m: any) => (
          <div key={m.id} className="flex gap-4">
            {m.role === 'assistant' && (
              <div className="w-8 h-8 rounded-full bg-[#2D3142]/5 border border-[#2D3142]/10 flex items-center justify-center flex-shrink-0 mt-0.5 shadow-[0_0_15px_rgba(255,255,255,0.05)]">
                <Sparkles className="w-4 h-4 text-[#F59E0B]" />
              </div>
            )}
            
            <div className="flex-1">
              {m.role === 'user' ? (
                <h2 className="text-2xl font-medium text-[#2D3142]/90">{m.content}</h2>
              ) : (
                <div className="text-[#2D3142]/80 text-[15px] leading-relaxed prose prose-invert max-w-none">
                  {renderMessageContent(m.content)}
                </div>
              )}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex gap-4 items-center text-[#2D3142]/50">
            <div className="w-8 h-8 rounded-full bg-[#2D3142]/5 border border-[#2D3142]/10 flex items-center justify-center animate-spin">
              <div className="w-4 h-4 rounded-full bg-gradient-to-tr from-amber-500 to-fuchsia-500 opacity-80" />
            </div>
            <span className="text-sm font-medium tracking-wide animate-pulse">Synthesizing intelligence...</span>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Fixed bottom input - Glassmorphism */}
      <div className="absolute bottom-12 left-0 right-0 z-20">
        <form 
          onSubmit={handleSubmit} 
          className="relative group bg-white backdrop-blur-xl border border-[#2D3142]/10 rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.4)] overflow-hidden transition-all hover:border-white/20 focus-within:border-amber-500/50 focus-within:ring-1 focus-within:ring-amber-500/50"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-amber-500/5 to-fuchsia-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
          <input
            id="ai-chat-input"
            autoFocus
            className="w-full bg-transparent text-[#2D3142] px-6 py-5 outline-none placeholder-white/30 relative z-10"
            value={input}
            placeholder="Ask anything..."
            onChange={handleInputChange}
            disabled={isLoading}
          />
          <div className="px-5 py-3 border-t border-[#2D3142]/10 bg-white/[0.02] flex justify-between items-center relative z-10">
            <div className="flex items-center gap-2">
              <ShieldAlert className="w-3 h-3 text-[#034F46]" />
              <span className="text-[10px] uppercase font-mono text-[#034F46] tracking-wider">Evidence Enforced</span>
            </div>
            <button 
              type="submit" 
              disabled={isLoading || !input?.trim()}
              className="w-8 h-8 rounded-full bg-white text-black flex items-center justify-center disabled:opacity-30 transition-opacity hover:scale-105"
            >
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </form>
      </div>

    </div>
  );
}

function renderMessageContent(content: string) {
  const parts = content.split('---');
  if (parts.length < 2) return content;
  
  const mainContent = parts[0].trim();
  const explainability = parts.slice(1).join('---').trim();

  return (
    <div className="space-y-4">
      <div className="whitespace-pre-wrap">{mainContent}</div>
      <ExplainabilityBlock text={explainability} />
    </div>
  );
}

function ExplainabilityBlock({ text }: { text: string }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="mt-4 border border-[#2D3142]/10 bg-white rounded-lg overflow-hidden">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between px-4 py-3 hover:bg-[#1C1C1C] transition-colors text-left group"
      >
        <div className="flex items-center gap-2">
          <ShieldAlert className="w-3.5 h-3.5 text-[#034F46]" />
          <span className="text-xs font-medium text-[#A1A1AA] group-hover:text-[#2D3142] transition-colors">View Evidence Provenance</span>
        </div>
        <ChevronDown className={`w-4 h-4 text-[#52525B] transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      
      {isOpen && (
        <div className="p-4 border-t border-[#2D3142]/10 text-[11px] text-[#A1A1AA] space-y-3 whitespace-pre-wrap font-mono leading-relaxed bg-white">
          {text}
        </div>
      )}
    </div>
  );
}
