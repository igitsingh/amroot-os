'use client';
import React, { useState, useEffect, useRef } from 'react';
import { Outfit } from 'next/font/google';
import { Mic, Send, Trash2, Edit2, Check, X, Lightbulb, Activity, Loader2 } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { db } from '@/lib/firebase';
import { collection, addDoc, deleteDoc, doc, updateDoc, onSnapshot, query, orderBy, serverTimestamp } from 'firebase/firestore';

const outfit = Outfit({ subsets: ['latin'], weight: ['300', '400', '500', '600', '700'] });

interface Note {
  id: string;
  text: string;
  createdAt: any;
  updatedAt: any;
}

// Ensure SpeechRecognition is available globally for TypeScript
declare global {
  interface Window {
    SpeechRecognition: any;
    webkitSpeechRecognition: any;
  }
}

export default function ScratchpadView() {
  const { user } = useAuth();
  const [notes, setNotes] = useState<Note[]>([]);
  const [newNoteText, setNewNoteText] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editNoteText, setEditNoteText] = useState('');
  const [loading, setLoading] = useState(true);

  const recognitionRef = useRef<any>(null);
  const notesContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!user) {
      setLoading(false);
      return;
    }

    const notesRef = collection(db, 'users', user.uid, 'scratchpad');
    const q = query(notesRef, orderBy('createdAt', 'desc'));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const fetchedNotes: Note[] = [];
      snapshot.forEach((doc) => {
        fetchedNotes.push({ id: doc.id, ...doc.data() } as Note);
      });
      setNotes(fetchedNotes);
      setLoading(false);
    }, (error) => {
      console.error("Error fetching notes: ", error);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [user]);

  // Initialize Speech Recognition
  useEffect(() => {
    if (typeof window !== 'undefined' && (window.SpeechRecognition || window.webkitSpeechRecognition)) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = true;
      recognitionRef.current.interimResults = true;

      recognitionRef.current.onresult = (event: any) => {
        let interimTranscript = '';
        let finalTranscript = '';

        for (let i = event.resultIndex; i < event.results.length; i++) {
          const transcript = event.results[i][0].transcript;
          if (event.results[i].isFinal) {
            finalTranscript += transcript;
          } else {
            interimTranscript += transcript;
          }
        }
        
        if (finalTranscript) {
          setNewNoteText((prev) => prev + (prev.length > 0 && !prev.endsWith(' ') ? ' ' : '') + finalTranscript);
        }
      };

      recognitionRef.current.onerror = (event: any) => {
        console.error("Speech recognition error", event.error);
        setIsRecording(false);
      };

      recognitionRef.current.onend = () => {
        setIsRecording(false);
      };
    }
  }, []);

  const toggleRecording = () => {
    if (!recognitionRef.current) {
      alert("Voice recognition is not supported in this browser. Try Chrome.");
      return;
    }

    if (isRecording) {
      recognitionRef.current.stop();
      setIsRecording(false);
    } else {
      try {
        recognitionRef.current.start();
        setIsRecording(true);
      } catch (e) {
        console.error(e);
      }
    }
  };

  const handleAddNote = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!newNoteText.trim() || !user) return;
    
    setIsSubmitting(true);
    if (isRecording) {
        recognitionRef.current?.stop();
        setIsRecording(false);
    }

    try {
      await addDoc(collection(db, 'users', user.uid, 'scratchpad'), {
        text: newNoteText.trim(),
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      });
      setNewNoteText('');
    } catch (error) {
      console.error("Error adding note: ", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteNote = async (id: string) => {
    if (!user) return;
    if (confirm("Delete this idea?")) {
      try {
        await deleteDoc(doc(db, 'users', user.uid, 'scratchpad', id));
      } catch (error) {
        console.error("Error deleting note: ", error);
      }
    }
  };

  const startEdit = (note: Note) => {
    setEditingId(note.id);
    setEditNoteText(note.text);
  };

  const handleUpdateNote = async (id: string) => {
    if (!user || !editNoteText.trim()) {
      setEditingId(null);
      return;
    }

    try {
      await updateDoc(doc(db, 'users', user.uid, 'scratchpad', id), {
        text: editNoteText.trim(),
        updatedAt: serverTimestamp()
      });
      setEditingId(null);
    } catch (error) {
      console.error("Error updating note: ", error);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent, isEditing: boolean, id?: string) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if (isEditing && id) {
        handleUpdateNote(id);
      } else {
        handleAddNote();
      }
    }
  };

  if (!user) return null;

  return (
    <div className={`min-h-screen bg-[#1A1A1A] ${outfit.className} text-[#F9F8F6] p-8 pb-32`}>
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 border-b border-white/10 pb-6">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#034F46] to-[#046C60] flex items-center justify-center shadow-lg shadow-[#034F46]/20">
                <Lightbulb size={20} className="text-[#F9F8F6]" />
              </div>
              <h1 className="text-3xl font-light tracking-tight text-[#F9F8F6]">Scratchpad</h1>
            </div>
            <p className="text-[#F9F8F6]/40 text-sm">A playground for Deepanshu's ideas, notes, and brain dumps.</p>
          </div>
        </div>

        {/* Input Area */}
        <div className="bg-[#2D3142] rounded-2xl p-2 border border-white/5 shadow-xl relative group focus-within:border-[#F16775]/50 transition-colors duration-300">
          <div className="flex flex-col relative z-10">
            <textarea
              value={newNoteText}
              onChange={(e) => setNewNoteText(e.target.value)}
              onKeyDown={(e) => handleKeyDown(e, false)}
              placeholder="What's on your mind? Type or click the mic to speak..."
              className="w-full bg-transparent border-none outline-none resize-none min-h-[100px] p-4 text-[#F9F8F6] placeholder-[#F9F8F6]/30 text-lg leading-relaxed focus:ring-0"
            />
            
            <div className="flex items-center justify-between px-4 pb-3 mt-2">
              <div className="flex items-center gap-4">
                <button
                  type="button"
                  onClick={toggleRecording}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full font-medium text-sm transition-all duration-300 ${
                    isRecording 
                      ? 'bg-[#F16775]/20 text-[#F16775] animate-pulse border border-[#F16775]/30' 
                      : 'bg-white/5 text-[#F9F8F6]/60 hover:bg-white/10 hover:text-white border border-transparent'
                  }`}
                >
                  {isRecording ? <Activity size={16} /> : <Mic size={16} />}
                  {isRecording ? 'Listening...' : 'Dictate'}
                </button>
                {isRecording && <span className="text-xs text-[#F16775]/70 flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-[#F16775] animate-ping" /> Live</span>}
              </div>

              <button
                onClick={handleAddNote}
                disabled={!newNoteText.trim() || isSubmitting}
                className="flex items-center justify-center w-10 h-10 rounded-full bg-[#034F46] hover:bg-[#046C60] disabled:opacity-50 disabled:cursor-not-allowed text-white transition-all shadow-lg hover:shadow-[#034F46]/30 hover:scale-105 active:scale-95"
              >
                {isSubmitting ? <Loader2 size={16} className="animate-spin" /> : <Send size={16} className="ml-1" />}
              </button>
            </div>
          </div>
        </div>

        {/* Notes Grid */}
        {loading ? (
          <div className="flex items-center justify-center py-20 text-[#F9F8F6]/30 gap-3">
            <Loader2 className="w-5 h-5 animate-spin" />
            <span className="text-sm">Loading ideas...</span>
          </div>
        ) : notes.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-center border-2 border-dashed border-white/5 rounded-3xl bg-white/[0.02]">
            <Lightbulb className="w-12 h-12 text-[#F9F8F6]/10 mb-4" />
            <h3 className="text-lg font-medium text-[#F9F8F6]/60 mb-2">No ideas yet</h3>
            <p className="text-[#F9F8F6]/30 max-w-sm text-sm">This is your personal scratchpad. Your notes will be safely synced to the cloud and waiting for you when you return.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6" ref={notesContainerRef}>
            {notes.map((note) => (
              <div 
                key={note.id} 
                className="bg-[#2D3142]/50 backdrop-blur-sm border border-white/5 rounded-2xl p-6 group hover:border-white/10 hover:bg-[#2D3142]/80 transition-all duration-300 relative flex flex-col min-h-[160px]"
              >
                {editingId === note.id ? (
                  <div className="flex-1 flex flex-col h-full">
                    <textarea
                      value={editNoteText}
                      onChange={(e) => setEditNoteText(e.target.value)}
                      onKeyDown={(e) => handleKeyDown(e, true, note.id)}
                      autoFocus
                      className="w-full bg-black/20 border border-white/10 rounded-xl outline-none resize-none flex-1 p-3 text-[#F9F8F6] text-sm leading-relaxed focus:border-[#034F46]/50 transition-colors"
                    />
                    <div className="flex justify-end gap-2 mt-3">
                      <button 
                        onClick={() => setEditingId(null)}
                        className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-[#F9F8F6]/50 hover:text-white transition-colors"
                      >
                        <X size={14} />
                      </button>
                      <button 
                        onClick={() => handleUpdateNote(note.id)}
                        className="p-1.5 rounded-lg bg-[#034F46] hover:bg-[#046C60] text-white transition-colors"
                      >
                        <Check size={14} />
                      </button>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="flex-1 whitespace-pre-wrap text-[#F9F8F6]/80 text-base leading-relaxed mb-8">
                      {note.text}
                    </div>
                    
                    <div className="flex items-center justify-between mt-auto pt-4 border-t border-white/5">
                      <span className="text-[11px] text-[#F9F8F6]/30 font-medium uppercase tracking-wider">
                        {note.createdAt?.toDate ? note.createdAt.toDate().toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }) : 'Just now'}
                      </span>
                      
                      <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button 
                          onClick={() => startEdit(note)}
                          className="p-2 rounded-lg hover:bg-white/10 text-[#F9F8F6]/40 hover:text-white transition-colors"
                          title="Edit"
                        >
                          <Edit2 size={14} />
                        </button>
                        <button 
                          onClick={() => handleDeleteNote(note.id)}
                          className="p-2 rounded-lg hover:bg-[#F16775]/20 text-[#F9F8F6]/40 hover:text-[#F16775] transition-colors"
                          title="Delete"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
