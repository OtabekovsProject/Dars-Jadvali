import React, { useState, useEffect } from 'react';
import { ClassSession } from '../types';
import { CLASS_COLORS } from '../constants';
import { X, Save, Trash2, Clock, MapPin, User, BookOpen } from 'lucide-react';

interface ClassModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (session: ClassSession, dayId: string) => void;
  onDelete: (sessionId: string, dayId: string) => void;
  initialData?: ClassSession;
  dayId: string;
  dayName: string;
}

const ClassModal: React.FC<ClassModalProps> = ({
  isOpen,
  onClose,
  onSave,
  onDelete,
  initialData,
  dayId,
  dayName,
}) => {
  const [subject, setSubject] = useState('');
  const [teacher, setTeacher] = useState('');
  const [room, setRoom] = useState('');
  const [startTime, setStartTime] = useState('08:00');
  const [endTime, setEndTime] = useState('08:45');
  const [color, setColor] = useState(CLASS_COLORS[0].value);

  // Generate a safe ID
  const generateId = () => {
    if (typeof crypto !== 'undefined' && crypto.randomUUID) {
      return crypto.randomUUID();
    }
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  };

  useEffect(() => {
    if (initialData) {
      setSubject(initialData.subject);
      setTeacher(initialData.teacher || '');
      setRoom(initialData.room || '');
      setStartTime(initialData.startTime);
      setEndTime(initialData.endTime);
      setColor(initialData.color);
    } else {
      setSubject('');
      setTeacher('');
      setRoom('');
      setStartTime('08:00');
      setEndTime('08:45');
      setColor(CLASS_COLORS[0].value);
    }
  }, [initialData, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newClass: ClassSession = {
      id: initialData ? initialData.id : generateId(),
      subject,
      teacher,
      room,
      startTime,
      endTime,
      color,
    };
    onSave(newClass, dayId);
  };

  const handleDelete = (e: React.MouseEvent) => {
    // Stop form submission and event bubbling
    e.preventDefault();
    e.stopPropagation();
    
    if (initialData) {
        onDelete(initialData.id, dayId);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <div className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity" onClick={onClose}></div>
        
        {/* Modal Content */}
      <div className="relative bg-white dark:bg-slate-800 rounded-2xl shadow-2xl w-full max-w-md overflow-hidden transform transition-all scale-100 border border-gray-100 dark:border-slate-700">
        <div className="flex justify-between items-center p-5 border-b border-gray-100 dark:border-slate-700">
          <div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                {initialData ? 'Darsni tahrirlash' : 'Yangi dars'}
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{dayName}</p>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors bg-gray-100 dark:bg-slate-700 p-2 rounded-full">
            <X size={20} />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          <div>
            <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                <BookOpen size={16} className="text-blue-500" /> Fan nomi
            </label>
            <input
              type="text"
              required
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="w-full px-4 py-2.5 bg-gray-50 dark:bg-slate-900 border border-gray-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent outline-none transition-all text-gray-900 dark:text-white placeholder-gray-400"
              placeholder="Masalan: Matematika"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                <Clock size={16} className="text-blue-500" /> Boshlanish
              </label>
              <input
                type="time"
                required
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                className="w-full px-4 py-2.5 bg-gray-50 dark:bg-slate-900 border border-gray-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none text-gray-900 dark:text-white cursor-pointer"
              />
            </div>
            <div>
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                <Clock size={16} className="text-blue-500" /> Tugash
              </label>
              <input
                type="time"
                required
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
                className="w-full px-4 py-2.5 bg-gray-50 dark:bg-slate-900 border border-gray-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none text-gray-900 dark:text-white cursor-pointer"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                <User size={16} className="text-blue-500" /> O'qituvchi
              </label>
              <input
                type="text"
                value={teacher}
                onChange={(e) => setTeacher(e.target.value)}
                className="w-full px-4 py-2.5 bg-gray-50 dark:bg-slate-900 border border-gray-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none text-gray-900 dark:text-white placeholder-gray-400"
                placeholder="Ismi"
              />
            </div>
            <div>
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                <MapPin size={16} className="text-blue-500" /> Xona
              </label>
              <input
                type="text"
                value={room}
                onChange={(e) => setRoom(e.target.value)}
                className="w-full px-4 py-2.5 bg-gray-50 dark:bg-slate-900 border border-gray-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none text-gray-900 dark:text-white placeholder-gray-400"
                placeholder="№"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">Rang tanlash</label>
            <div className="flex flex-wrap gap-3">
              {CLASS_COLORS.map((c) => (
                <button
                  key={c.value}
                  type="button"
                  onClick={() => setColor(c.value)}
                  className={`w-9 h-9 rounded-full border-2 transition-transform hover:scale-110 ${c.value.split(' ')[0]} ${color === c.value ? 'border-gray-600 dark:border-white scale-110 ring-2 ring-offset-2 dark:ring-offset-slate-800 ring-gray-300' : 'border-transparent'}`}
                  title={c.label}
                />
              ))}
            </div>
          </div>

          <div className="pt-4 flex items-center justify-between gap-3">
             {initialData && (
              <button
                type="button"
                onClick={handleDelete}
                className="flex items-center justify-center px-4 py-3 text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20 hover:bg-red-100 dark:hover:bg-red-900/40 rounded-xl transition-colors font-medium cursor-pointer"
                title="O'chirish"
              >
                <Trash2 size={20} />
              </button>
             )}
            <button
              type="submit"
              className="flex-1 flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-500 text-white px-4 py-3 rounded-xl font-medium transition-all shadow-lg shadow-blue-500/30"
            >
              <Save size={20} />
              {initialData ? 'Saqlash' : 'Qo\'shish'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ClassModal;