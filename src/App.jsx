import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Link, useLocation } from 'react-router-dom';
import { 
  BrainCircuit, 
  LayoutDashboard, 
  Calendar as CalendarIcon, 
  Settings as SettingsIcon, 
  Plus, 
  Trash2, 
  CheckCircle2, 
  Sparkles, 
  Sun 
} from 'lucide-react';

// --- SUB-COMPONENT: CALENDAR PAGE ---
const CalendarPage = ({ tasks }) => {
  const today = new Date();
  const currentDay = today.getDate(); 
  const monthName = today.toLocaleString('default', { month: 'long' });
  const year = today.getFullYear();
  const currentMonth = today.getMonth();

  const firstDayOfMonth = new Date(year, currentMonth, 1).getDay();
  const dayOffset = firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1;

  return (
    <div className="p-8 animate-in fade-in slide-in-from-bottom-4 duration-700 flex flex-col gap-6 h-full flex-1 overflow-y-auto">
      <header>
        <h2 className="text-4xl font-black text-slate-800 tracking-tight">Smart Schedule</h2>
        <p className="text-lg text-slate-500 mt-1 font-medium">{monthName} {year}</p>
      </header>

      <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
        <div className="xl:col-span-3 bg-white p-7 rounded-[2rem] border border-slate-100 shadow-sm">
          <div className="grid grid-cols-7 gap-3">
            {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map(day => (
              <div key={day} className="text-center text-[10px] font-black text-slate-400 uppercase tracking-widest pb-3">{day}</div>
            ))}
            
            {[...Array(dayOffset)].map((_, i) => (
              <div key={`spacer-${i}`} className="h-24"></div>
            ))}

            {[...Array(31)].map((_, i) => {
              const dateNumber = i + 1;
              const isToday = dateNumber === currentDay;
              
              return (
                <div key={i} className={`h-24 rounded-2xl border-2 flex flex-col p-3 transition-all ${
                  isToday 
                  ? 'bg-indigo-600 border-indigo-600 text-white shadow-lg z-10 scale-105' 
                  : 'border-slate-50 bg-slate-50/50 hover:bg-white hover:border-indigo-100 text-slate-400'
                }`}>
                  <span className="text-lg font-black">{dateNumber}</span>
                  {isToday && tasks.length > 0 && (
                    <div className="mt-auto text-[9px] bg-white/20 py-1 rounded-lg font-black text-center backdrop-blur-sm">
                      {tasks.length} ACTIVE
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        <div className="space-y-6">
          <h3 className="text-xl font-black text-slate-800 border-l-4 border-indigo-500 pl-3">Agenda</h3>
          <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2">
            {tasks.length > 0 ? (
              tasks.map((task) => (
                <div key={task.id} className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm flex flex-col gap-1">
                  <span className={`text-[10px] font-black uppercase tracking-wider ${task.completed ? 'text-emerald-500' : 'text-indigo-500'}`}>
                    {task.completed ? "Done" : "Pending"}
                  </span>
                  <span className={`text-base font-bold leading-tight ${task.completed ? 'text-slate-300 line-through' : 'text-slate-700'}`}>
                    {task.text}
                  </span>
                </div>
              ))
            ) : (
              <p className="text-sm font-bold text-slate-400 text-center py-10 bg-slate-50 rounded-2xl border border-dashed border-slate-200">No tasks planned</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// --- SUB-COMPONENT: DASHBOARD CONTENT ---
const Dashboard = ({ tasks, setTasks }) => {
  const [input, setInput] = useState("");

  const addTask = () => {
    if (!input.trim()) return;
    setTasks([...tasks, { id: Date.now(), text: input, completed: false }]);
    setInput("");
  };

  const toggleTask = (id) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(t => t.id !== id));
  };

  const progress = tasks.length > 0 ? Math.round((tasks.filter(t => t.completed).length / tasks.length) * 100) : 0;

  return (
    <main className="flex-1 p-8 animate-in fade-in duration-500 overflow-y-auto">
      <header className="mb-8">
        <h2 className="text-4xl font-black text-slate-800 tracking-tight">Productivity Hub</h2>
        <p className="text-lg text-slate-500 mt-1 font-medium">Smart task management.</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <section className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-black flex items-center gap-3 text-slate-700">
                <CheckCircle2 size={24} className="text-indigo-500" /> Objectives
              </h3>
              <span className="bg-indigo-50 text-indigo-600 px-4 py-1 rounded-xl text-[10px] font-black tracking-widest uppercase">
                {tasks.filter(t => !t.completed).length} Pending
              </span>
            </div>

            <div className="flex gap-3 mb-6">
              <input 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && addTask()}
                placeholder="New goal..."
                className="flex-1 bg-slate-50 border-2 border-transparent rounded-xl px-6 py-3 text-lg focus:bg-white focus:border-indigo-500 outline-none transition-all font-bold"
              />
              <button onClick={addTask} className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 rounded-xl shadow-md transition-all active:scale-95">
                <Plus size={24} />
              </button>
            </div>

            <div className="space-y-2">
              {tasks.map(task => (
                <div key={task.id} className="group flex items-center justify-between p-4 bg-slate-50 rounded-2xl hover:bg-white hover:shadow-md border border-transparent hover:border-slate-100 transition-all">
                  <div className="flex items-center gap-4">
                    <input 
                      type="checkbox" 
                      checked={task.completed}
                      onChange={() => toggleTask(task.id)}
                      className="w-6 h-6 rounded-lg border-slate-300 text-indigo-600 cursor-pointer"
                    />
                    <span className={`text-xl font-bold ${task.completed ? 'text-slate-300 line-through' : 'text-slate-700'}`}>
                      {task.text}
                    </span>
                  </div>
                  <button onClick={() => deleteTask(task.id)} className="text-slate-300 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all p-2">
                    <Trash2 size={20} />
                  </button>
                </div>
              ))}
            </div>
          </section>
        </div>

        <div className="space-y-6">
          <div className="bg-indigo-600 p-8 rounded-[2rem] text-white shadow-lg">
            <div className="flex items-center gap-2 mb-4 opacity-70">
              <Sparkles size={18} /> <span className="text-[10px] font-black uppercase tracking-widest">AI Status</span>
            </div>
            <p className="text-xl font-bold leading-tight italic">
              {progress === 100 ? "System Clear." : "Keep moving."}
            </p>
          </div>

          <div className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Forecast</p>
            <div className="flex justify-between items-center">
              <div>
                <h4 className="text-4xl font-black text-slate-800">28°C</h4>
                <p className="text-lg text-slate-500 font-bold">Sunny</p>
              </div>
              <Sun size={48} className="text-amber-400" />
            </div>
          </div>

          <div className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Efficiency</p>
            <div className="h-4 bg-slate-100 rounded-full overflow-hidden">
              <div 
                className="h-full bg-indigo-500 transition-all duration-1000 ease-out"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            <p className="mt-4 text-3xl font-black text-right text-indigo-600">{progress}%</p>
          </div>
        </div>
      </div>
    </main>
  );
};

// --- MAIN APP COMPONENT ---
export default function App() {
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem('focusmind-tasks');
    return saved ? JSON.parse(saved) : [
      { id: 1, text: "FocusMind AI online", completed: false }
    ];
  });

  useEffect(() => {
    localStorage.setItem('focusmind-tasks', JSON.stringify(tasks));
  }, [tasks]);

  return (
    <BrowserRouter>
      <div className="h-screen bg-slate-50 flex font-sans text-slate-900 overflow-hidden">
        <aside className="w-72 bg-white border-r border-slate-200 p-8 flex flex-col gap-10 shrink-0">
          <div className="flex items-center gap-3 text-indigo-600">
            <div className="p-2 bg-indigo-600 rounded-xl text-white">
              <BrainCircuit size={32} />
            </div>
            <h1 className="text-xl font-black tracking-tight text-slate-800">FocusMind</h1>
          </div>
          
          <nav className="flex flex-col gap-2">
            <SidebarLink to="/" icon={<LayoutDashboard size={20} />} label="Dashboard" />
            <SidebarLink to="/calendar" icon={<CalendarIcon size={20} />} label="Calendar" />
            <SidebarLink to="/settings" icon={<SettingsIcon size={20} />} label="Settings" />
          </nav>
        </aside>

        <div className="flex-1 overflow-hidden">
          <Routes>
            <Route path="/" element={<Dashboard tasks={tasks} setTasks={setTasks} />} />
            <Route path="/calendar" element={<CalendarPage tasks={tasks} />} />
            <Route path="/settings" element={<div className="p-10 text-2xl font-black">Settings</div>} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

function SidebarLink({ to, icon, label }) {
  const location = useLocation();
  const isActive = location.pathname === to;
  
  return (
    <Link 
      to={to} 
      className={`flex items-center gap-4 px-4 py-3 rounded-2xl text-base font-bold transition-all ${
        isActive 
        ? 'bg-indigo-50 text-indigo-600' 
        : 'text-slate-400 hover:bg-slate-50 hover:text-slate-600'
      }`}
    >
      {icon} {label}
    </Link>
  );
}