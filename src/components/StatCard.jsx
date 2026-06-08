export default function StatCard({ value, label }) {
  return (
    <div className="bg-white border border-slate-200 rounded-xl px-3 py-4 text-center shadow-sm">
      <div className="text-[1.9rem] font-extrabold text-accent leading-none tracking-tight">
        {value}
      </div>
      <div className="text-[0.72rem] text-slate-500 mt-1.5 font-medium">{label}</div>
    </div>
  )
}
