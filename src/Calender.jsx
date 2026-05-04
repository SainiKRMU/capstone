export default function Calendar() {
  return (
    <div className="p-8">
      <h2 className="text-3xl font-bold mb-4">Calendar</h2>
      <div className="bg-white p-10 rounded-3xl border border-slate-100 shadow-sm text-center">
        <p className="text-slate-500 italic">"AI is currently scheduling your week..."</p>
        <div className="mt-4 grid grid-cols-7 gap-2 opacity-20">
          {[...Array(31)].map((_, i) => (
            <div key={i} className="h-12 w-12 bg-slate-200 rounded-lg"></div>
          ))}
        </div>
      </div>
    </div>
  );
}