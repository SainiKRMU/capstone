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
const CalendarPage = () => {
  const events = [
    { time: "09:00 AM", task: "Deep Work: Project SOP", type: "Focus" },
    { time: "11:30 AM", task: "AI Strategy Review", type: "Meeting" },
    { time: "02:00 PM", task: "React Dependency Audit", type: "Technical" },
  ];

  return (
    <div className="p-8 animate-in fade-in slide-in-from-bottom-4 duration-700 flex flex-col gap-8 h-full flex-1">
      <header>
        <h2 className="text-3xl font-black text-slate-800 tracking-tight">Smart Schedule</h2>
        <p className="text-slate-500 mt-1">AI-optimized time blocks for maximum focus.</p>
      </header>

      <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
        {/* THE MINI CALENDAR GRID */}
        <div className="xl:col-span-3 bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm">
          <div className="flex justify-between items-center mb-8">
            <h3 className="font-bold text-lg text-slate-700">May 2026</h3>
            <div className="flex gap-2">
              <button className="p-2 hover:bg-slate-50 rounded-lg text-slate-400">{"<"}</button>
              <button className="p-2 hover:bg-slate-50 rounded-lg text-slate-400">{">"}</button>
            </div>
          </div>
          
          <div className="grid grid-cols-7 gap-4">
            {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map(day => (
              <div key={day} className="text-center text-xs font-bold text-slate-400 uppercase tracking-widest pb-4">{day}</div>
            ))}
            {[...Array(31)].map((_, i) => (
              <div key={i} className={`h-24 rounded-2xl border flex flex-col p-2 transition-all ${
                i === 3 ? 'bg-indigo-600 border-indigo-600 text-white shadow-lg shadow-indigo-100' : 'border-slate-50 bg-slate-50/50 hover:bg-white hover:border-slate-200 text-slate-400'
              }`}>
                <span className="text-sm font-bold">{i + 1}</span>
                {i === 3 && <div className="mt-2 text-[10px] bg-white/20 p-1 rounded font-medium text-center">3 Events</div>}
              </div>
            ))}
          </div>
        </div>

        {/* AI SUGGESTED AGENDA */}
        <div className="space-y-6">
          <h3 className="font-bold text-slate-800 px-2">Today's Agenda</h3>
          {events.map((event, idx) => (
            <div key={idx} className="bg-white p-5 rounded-3xl border border-slate-100 shadow-sm flex flex-col gap-1 hover:scale-[1.02] transition-transform cursor-default">
              <span className="text-xs font-bold text-indigo-500 uppercase tracking-wider">{event.time}</span>
              <span className="font-bold text-slate-700">{event.task}</span>
              <span className="text-xs text-slate-400">{event.type} Block</span>
            </div>
          ))}
          <div className="bg-indigo-50 p-6 rounded-[2rem] border border-indigo-100 mt-4">
            <p className="text-sm text-indigo-700 font-medium leading-relaxed">
              <Sparkles size={16} className="inline mr-2 mb-1" />
              AI Tip: Your energy levels are highest between 9 AM and 11 AM.
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

  const completedCount = tasks.filter(t => t.completed).length;
  const progress = tasks.length > 0 ? Math.round((completedCount / tasks.length) * 100) : 0;

  return (
    <main className="flex-1 p-8 animate-in fade-in duration-500">
      <header className="mb-10">
        <h2 className="text-4xl font-black text-slate-800 tracking-tight">Productivity Hub</h2>
        <p className="text-slate-500 mt-2">Welcome back. Your AI assistant has prepared your daily summary.</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <section className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold flex items-center gap-2 text-slate-700">
                <CheckCircle2 className="text-indigo-500" /> Daily Objectives
              </h3>
              <span className="bg-indigo-50 text-indigo-600 px-4 py-1 rounded-full text-sm font-bold">
                {tasks.filter(t => !t.completed).length} PENDING
              </span>
            </div>

            <div className="flex gap-2 mb-8">
              <input 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && addTask()}
                placeholder="What's your next big goal?"
                className="flex-1 bg-slate-50 border-none rounded-2xl px-6 py-4 focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
              />
              <button onClick={addTask} className="bg-indigo-600 hover:bg-indigo-700 text-white p-4 rounded-2xl shadow-lg shadow-indigo-200 transition-all">
                <Plus />
              </button>
            </div>

            <div className="space-y-3">
              {tasks.map(task => (
                <div key={task.id} className="group flex items-center justify-between p-4 bg-slate-50 rounded-2xl hover:bg-white hover:shadow-md border border-transparent hover:border-slate-100 transition-all">
                  <div className="flex items-center gap-4">
                    <input 
                      type="checkbox" 
                      checked={task.completed}
                      onChange={() => toggleTask(task.id)}
                      className="w-5 h-5 rounded-lg border-slate-300 text-indigo-600 focus:ring-indigo-500"
                    />
                    <span className={`font-medium ${task.completed ? 'line-through text-slate-400' : 'text-slate-700'}`}>
                      {task.text}
                    </span>
                  </div>
                  <button onClick={() => deleteTask(task.id)} className="text-slate-300 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all">
                    <Trash2 size={18} />
                  </button>
                </div>
              ))}
            </div>
          </section>
        </div>

        <div className="space-y-6">
          <div className="bg-gradient-to-br from-indigo-600 to-purple-700 p-8 rounded-[2rem] text-white shadow-xl shadow-indigo-100">
            <div className="flex items-center gap-2 mb-4 opacity-80">
              <Sparkles size={20} /> <span className="text-sm font-bold uppercase tracking-wider">AI Insight</span>
            </div>
            <p className="text-xl font-medium leading-relaxed">
              {progress === 100 ? "Amazing! You've cleared your plate. Time to recharge." : 
               progress > 50 ? "Great pace! You are on track to finish your daily goals." : 
               "Let's focus on the high-impact tasks first today."}
            </p>
          </div>

          <div className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Today's Forecast</p>
            <div className="flex justify-between items-center">
              <div>
                <h4 className="text-3xl font-black text-slate-800">28°C</h4>
                <p className="text-slate-500">Sunny Skies</p>
              </div>
              <Sun size={48} className="text-amber-400" />
            </div>
          </div>

          <div className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Productivity Score</p>
            <div className="h-3 bg-slate-100 rounded-full overflow-hidden">
              <div 
                className="h-full bg-indigo-500 transition-all duration-1000 ease-out"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            <p className="mt-4 font-bold text-right text-indigo-600">{progress}% Done</p>
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
      { id: 1, text: "Finalize Project SOP", completed: false },
      { id: 2, text: "Install React Dependencies", completed: true }
    ];
  });

  useEffect(() => {
    localStorage.setItem('focusmind-tasks', JSON.stringify(tasks));
  }, [tasks]);

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-slate-50 flex font-sans text-slate-900">
        {/* SIDEBAR NAVIGATION */}
        <aside className="w-72 bg-white border-r border-slate-200 p-8 flex flex-col gap-10">
          <div className="flex items-center gap-3 text-indigo-600">
            <div className="p-2 bg-indigo-600 rounded-xl text-white">
              <BrainCircuit size={28} />
            </div>
            <h1 className="text-2xl font-black tracking-tight text-slate-800">FocusMind AI</h1>
          </div>
          
          <nav className="flex flex-col gap-2">
            <SidebarLink to="/" icon={<LayoutDashboard size={20} />} label="Dashboard" />
            <SidebarLink to="/calendar" icon={<CalendarIcon size={20} />} label="Calendar" />
            <SidebarLink to="/settings" icon={<SettingsIcon size={20} />} label="Settings" />
          </nav>
        </aside>

        {/* PAGE ROUTES */}
        <Routes>
          <Route path="/" element={<Dashboard tasks={tasks} setTasks={setTasks} />} />
          <Route path="/calendar" element={<CalendarPage />} />
          <Route path="/settings" element={<div className="p-8 font-bold">Settings: Profile and AI Preferences</div>} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

// Custom Link Component for Sidebar styling
function SidebarLink({ to, icon, label }) {
  const location = useLocation();
  const isActive = location.pathname === to;
  
  return (
    <Link 
      to={to} 
      className={`flex items-center gap-4 px-4 py-3 rounded-2xl font-bold transition-all ${
        isActive 
        ? 'bg-indigo-50 text-indigo-600' 
        : 'text-slate-400 hover:bg-slate-50 hover:text-slate-600'
      }`}
    >
      {icon} {label}
    </Link>
  );
}