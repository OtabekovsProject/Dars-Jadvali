import React, { useState, useEffect } from 'react';
import { Days, WeekSchedule, ClassSession } from './types';
import { INITIAL_SCHEDULE } from './constants';
import ClassModal from './components/ClassModal';
import { Calendar, Plus, MapPin, User, GraduationCap, Moon, Sun, Clock } from 'lucide-react';

const App: React.FC = () => {
  const [schedule, setSchedule] = useState<WeekSchedule>(INITIAL_SCHEDULE);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingDayId, setEditingDayId] = useState<string | null>(null);
  const [editingClass, setEditingClass] = useState<ClassSession | undefined>(undefined);
  
  // Dark Mode State
  const [isDarkMode, setIsDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('theme') === 'dark' ||
        (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches);
    }
    return false;
  });

  // Load from local storage on mount
  useEffect(() => {
    const savedSchedule = localStorage.getItem('schoolSchedule');
    if (savedSchedule) {
      try {
        setSchedule(JSON.parse(savedSchedule));
      } catch (e) {
        console.error("Error parsing schedule", e);
      }
    }
  }, []);

  // Save to local storage whenever schedule changes
  useEffect(() => {
    localStorage.setItem('schoolSchedule', JSON.stringify(schedule));
  }, [schedule]);

  // Dark Mode Effect
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);

  const toggleTheme = () => setIsDarkMode(!isDarkMode);

  const handleAddClass = (dayId: string) => {
    setEditingDayId(dayId);
    setEditingClass(undefined);
    setIsModalOpen(true);
  };

  const handleEditClass = (dayId: string, session: ClassSession) => {
    setEditingDayId(dayId);
    setEditingClass(session);
    setIsModalOpen(true);
  };

  const saveClass = (session: ClassSession, dayId: string) => {
    setSchedule(prev => prev.map(day => {
      if (day.dayId === dayId) {
        const existingClassIndex = day.classes.findIndex(c => c.id === session.id);
        let newClasses = [...day.classes];
        
        if (existingClassIndex >= 0) {
          // Update existing
          newClasses[existingClassIndex] = session;
        } else {
          // Add new
          newClasses.push(session);
        }
        
        // Sort by start time
        newClasses.sort((a, b) => a.startTime.localeCompare(b.startTime));
        
        return { ...day, classes: newClasses };
      }
      return day;
    }));
    setIsModalOpen(false);
  };

  const deleteClass = (sessionId: string, dayId: string) => {
    if (window.confirm("Rostdan ham bu darsni o'chirmoqchimisiz?")) {
      setSchedule(prevSchedule => {
        return prevSchedule.map(day => {
          if (day.dayId === dayId) {
            return {
              ...day,
              classes: day.classes.filter(c => c.id !== sessionId)
            };
          }
          return day;
        });
      });
      setIsModalOpen(false);
    }
  };

  const getDayName = (dayId: string) => schedule.find(d => d.dayId === dayId)?.dayName || '';

  return (
    <div className="min-h-screen pb-20 bg-gray-100 dark:bg-slate-900 transition-colors duration-300 text-gray-900 dark:text-gray-100 font-sans">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white/80 dark:bg-slate-800/80 backdrop-blur-md shadow-sm border-b border-gray-200 dark:border-slate-700 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-gradient-to-tr from-blue-600 to-indigo-600 p-2.5 rounded-xl shadow-lg shadow-blue-500/20">
              <GraduationCap className="text-white" size={24} />
            </div>
            <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-400">
              Maktab Jadvali
            </h1>
          </div>
          
          <button
            onClick={toggleTheme}
            className="p-2.5 rounded-xl bg-gray-100 dark:bg-slate-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-slate-600 transition-all focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-label="Toggle Dark Mode"
          >
            {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {schedule.map((day) => (
              <div key={day.dayId} className="flex flex-col h-full bg-white dark:bg-slate-800 rounded-3xl shadow-sm border border-gray-100 dark:border-slate-700 overflow-hidden transition-all duration-300 hover:shadow-md dark:hover:shadow-slate-900/50">
                {/* Card Header */}
                <div className="px-5 py-4 border-b border-gray-100 dark:border-slate-700 flex justify-between items-center bg-gray-50/50 dark:bg-slate-800/50">
                  <h3 className="font-bold text-lg text-gray-800 dark:text-gray-100 flex items-center gap-2.5">
                    <span className="p-2 rounded-lg bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400">
                        <Calendar size={18} />
                    </span>
                    {day.dayName}
                  </h3>
                  <button
                    onClick={() => handleAddClass(day.dayId)}
                    className="p-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 shadow-md shadow-blue-500/20 transition-all active:scale-95"
                    title="Dars qo'shish"
                  >
                    <Plus size={18} strokeWidth={2.5} />
                  </button>
                </div>
                
                {/* Card Content */}
                <div className="p-4 flex-1 space-y-3 min-h-[150px]">
                  {day.classes.length === 0 ? (
                    <div className="h-full flex flex-col items-center justify-center text-gray-400 dark:text-gray-500 py-10 opacity-70">
                      <div className="mb-3 p-3 bg-gray-50 dark:bg-slate-700/50 rounded-full">
                         <Clock size={24} />
                      </div>
                      <p className="text-sm font-medium">Darslar yo'q</p>
                    </div>
                  ) : (
                    day.classes.map((session) => (
                      <div
                        key={session.id}
                        onClick={() => handleEditClass(day.dayId, session)}
                        className={`group relative p-3.5 rounded-2xl border border-transparent transition-all cursor-pointer ${session.color} bg-opacity-60 dark:bg-opacity-20 hover:scale-[1.02] hover:shadow-sm`}
                      >
                        <div className="flex justify-between items-start mb-1.5">
                          <span className="font-bold text-base tracking-tight">{session.subject}</span>
                          <span className="text-xs font-semibold font-mono bg-white/60 dark:bg-black/30 px-2 py-1 rounded-md backdrop-blur-sm">
                            {session.startTime}
                          </span>
                        </div>
                        
                        <div className="flex items-center justify-between text-sm opacity-90 mt-2.5">
                            <div className="flex items-center gap-3">
                                {session.room && (
                                    <div className="flex items-center gap-1.5" title="Xona">
                                    <MapPin size={13} />
                                    <span>{session.room}</span>
                                    </div>
                                )}
                                {session.teacher && (
                                    <div className="flex items-center gap-1.5" title="O'qituvchi">
                                    <User size={13} />
                                    <span className="truncate max-w-[80px] sm:max-w-[120px]">{session.teacher}</span>
                                    </div>
                                )}
                            </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            ))}
          </div>
      </main>

      <ClassModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={saveClass}
        onDelete={deleteClass}
        initialData={editingClass}
        dayId={editingDayId || ''}
        dayName={getDayName(editingDayId || '')}
      />
    </div>
  );
};

export default App;