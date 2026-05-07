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

  // FIX: Calculate how many empty spaces we need at the start of the month
  // (Monday = 0, Tuesday = 1... Friday = 4)
  const firstDayOfMonth = new Date(year, currentMonth, 1).getDay();
  // Adjusting JS Sunday(0) to Monday(1) logic for our grid
  const dayOffset = firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1;

  return (
    <div className="p-10 animate-in fade-in slide-in-from-bottom-4 duration-700 flex flex-col gap-8 h-full flex-1 overflow-y-auto">
      <header>
        <h2 className="text-5xl font-black text-slate-800 tracking-tight">Smart Schedule</h2>
        <p className="text-xl text-slate-500 mt-2 font-medium">Verified agenda for {monthName} {year}.</p>
      </header>

      <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
        <div className="xl:col-span-3 bg-white p-9 rounded-[2.5rem] border border-slate-100 shadow-md">
          <div className="flex justify-between items-center mb-8">
            <h3 className="font-black text-3xl text-slate-800">{monthName}</h3>
            <div className="flex gap-3">
              <button className="p-3 hover:bg-slate-50 rounded-2xl text-slate-400 border border-slate-100 transition-colors">{"<"}</button>
              <button className="p-3 hover:bg-slate-50 rounded-2xl text-slate-400 border border-slate-100 transition-colors">{">"}</button>
            </div>
          </div>
          
          <div className="grid grid-cols-7 gap-4">
            {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map(day => (
              <div key={day} className="text-center text-xs font-black text-slate-400 uppercase tracking-[0.2em] pb-4">{day}</div>
            ))}
            
            {/* 1. RENDER EMPTY SPACERS */}
            {[...Array(dayOffset)].map((_, i) => (
              <div key={`spacer-${i}`} className="h-28"></div>
            ))}

            {/* 2. RENDER ACTUAL DATES */}
            {[...Array(31)].map((_, i) => {
              const dateNumber = i + 1;
              const isToday = dateNumber === currentDay;
              
              return (
                <div key={i} className={`h-28 rounded-[2rem] border-2 flex flex-col p-4 transition-all duration-300 ${
                  isToday 
                  ? 'bg-indigo-600 border-indigo-600 text-white shadow-xl shadow-indigo-100 z-10 scale-105' 
                  : 'border-slate-50 bg-slate-50/50 hover:bg-white hover:border-indigo-200 text-slate-400 hover:text-slate-600'
                }`}>
                  <span className="text-xl font-black">{dateNumber}</span>
                  {isToday && tasks.length > 0 && (
                    <div className="mt-auto text-[11px] bg-white/20 py-1.5 rounded-xl font-black text-center backdrop-blur-sm">
                      {tasks.length} ACTIVE
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        <div className="space-y-6">
          <h3 className="text-2xl font-black text-slate-800 px-2">Today's Agenda</h3>
          
          {tasks.length > 0 ? (
            <div className="space-y-4">
              {tasks.map((task) => (
                <div key={task.id} className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm flex flex-col gap-2 hover:scale-[1.02] transition-transform">
                  <span className={`text-[11px] font-black uppercase tracking-widest ${task.completed ? 'text-emerald-500' : 'text-indigo-500'}`}>
                    {task.completed ? "✓ Complete" : "● In Progress"}
                  </span>
                  <span className={`text-lg font-bold leading-tight ${task.completed ? 'text-slate-300 line-through' : 'text-slate-700'}`}>
                    {task.text}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-slate-50/80 p-10 rounded-[2.5rem] border-2 border-dashed border-slate-200 text-center">
              <p className="text-lg font-bold text-slate-400">Empty Agenda</p>
            </div>
          )}
          
          <div className="bg-indigo-50 p-7 rounded-[2.5rem] border border-indigo-100">
            <p className="text-indigo-700 font-bold leading-relaxed text-lg italic">
              <Sparkles size={22} className="inline mr-2 mb-1" />
              Focus on impact today.
            </p>
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
    <main className="flex-1 p-10 animate-in fade-in duration-500 overflow-y-auto">
      <header className="mb-10">
        <h2 className="text-5xl font-black text-slate-800 tracking-tight">Productivity Hub</h2>
        <p className="text-2xl text-slate-500 mt-2 font-medium">Manage your goals with AI precision.</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 space-y-8">
          <section className="bg-white p-10 rounded-[3rem] border border-slate-100 shadow-md">
            <div className="flex justify-between items-center mb-8">
              <h3 className="text-2xl font-black flex items-center gap-4 text-slate-700">
                <CheckCircle2 size={28} className="text-indigo-500" /> Daily List
              </h3>
              <span className="bg-indigo-600 text-white px-5 py-1.5 rounded-2xl text-xs font-black tracking-[0.15em]">
                {tasks.filter(t => !t.completed).length} ACTIVE
              </span>
            </div>

            <div className="flex gap-4 mb-8">
              <input 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && addTask()}
                placeholder="What's your next mission?"
                className="flex-1 bg-slate-50 border-2 border-transparent rounded-[1.5rem] px-8 py-5 text-xl focus:bg-white focus:border-indigo-500 outline-none transition-all shadow-inner font-bold"
              />
              <button onClick={addTask} className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 rounded-[1.5rem] shadow-xl shadow-indigo-100 transition-all active:scale-95">
                <Plus size={32} />
              </button>
            </div>

            <div className="space-y-3">
              {tasks.map(task => (
                <div key={task.id} className="group flex items-center justify-between p-6 bg-slate-50 rounded-[2rem] hover:bg-white hover:shadow-lg border-2 border-transparent hover:border-slate-50 transition-all">
                  <div className="flex items-center gap-6">
                    <input 
                      type="checkbox" 
                      checked={task.completed}
                      onChange={() => toggleTask(task.id)}
                      className="w-7 h-7 rounded-xl border-slate-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer"
                    />
                    <span className={`text-2xl font-bold ${task.completed ? 'text-slate-300 line-through' : 'text-slate-700'}`}>
                      {task.text}
                    </span>
                  </div>
                  <button onClick={() => deleteTask(task.id)} className="text-slate-300 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all p-2">
                    <Trash2 size={24} />
                  </button>
                </div>
              ))}
            </div>
          </section>
        </div>

        <div className="space-y-8">
          <div className="bg-indigo-600 p-10 rounded-[3rem] text-white shadow-xl shadow-indigo-100">
            <div className="flex items-center gap-2 mb-6 opacity-80">
              <Sparkles size={20} /> <span className="text-xs font-black uppercase tracking-widest">AI Status</span>
            </div>
            <p className="text-2xl font-bold leading-tight italic">
              {progress === 100 ? "System Clear. Great work." : "Analyzing task priority..."}
            </p>
          </div>

          <div className="bg-white p-10 rounded-[3rem] border border-slate-100 shadow-md">
            <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-6">Today's Forecast</p>
            <div className="flex justify-between items-center">
              <div>
                <h4 className="text-5xl font-black text-slate-800">28°C</h4>
                <p className="text-xl text-slate-500 font-bold mt-1">Sunny Skies</p>
              </div>
              <Sun size={56} className="text-amber-400" />
            </div>
          </div>

          <div className="bg-white p-10 rounded-[3rem] border border-slate-100 shadow-md">
            <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-6">Efficiency</p>
            <div className="h-5 bg-slate-100 rounded-full overflow-hidden shadow-inner">
              <div 
                className="h-full bg-indigo-500 transition-all duration-1000 ease-out rounded-full"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            <p className="mt-6 text-4xl font-black text-right text-indigo-600 tracking-tighter">{progress}%</p>
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
        <aside className="w-80 bg-white border-r border-slate-200 p-10 flex flex-col gap-12 shrink-0">
          <div className="flex items-center gap-4 text-indigo-600">
            <div className="p-2.5 bg-indigo-600 rounded-[1.25rem] text-white shadow-lg shadow-indigo-100">
              <BrainCircuit size={36} />
            </div>
            <h1 className="text-2xl font-black tracking-tighter text-slate-800">FocusMind</h1>
          </div>
          
          <nav className="flex flex-col gap-3">
            <SidebarLink to="/" icon={<LayoutDashboard size={24} />} label="Dashboard" />
            <SidebarLink to="/calendar" icon={<CalendarIcon size={24} />} label="Calendar" />
            <SidebarLink to="/settings" icon={<SettingsIcon size={24} />} label="Settings" />
          </nav>
        </aside>

        <div className="flex-1 overflow-hidden">
          <Routes>
            <Route path="/" element={<Dashboard tasks={tasks} setTasks={setTasks} />} />
            <Route path="/calendar" element={<CalendarPage tasks={tasks} />} />
            <Route path="/settings" element={<div className="p-10 text-3xl font-black text-slate-800 underline decoration-indigo-500">Settings</div>} />
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
      className={`flex items-center gap-5 px-6 py-4 rounded-[1.75rem] text-lg font-black transition-all ${
        isActive 
        ? 'bg-indigo-50 text-indigo-600 shadow-sm' 
        : 'text-slate-400 hover:bg-slate-50 hover:text-slate-600'
      }`}
    >
      {icon} {label}
    </Link>
  );
}