export default function Loading() {
  return (
    <div className="px-5 md:px-8 py-6 md:py-8 max-w-3xl animate-pulse">
      <div className="h-8 w-3/4 bg-slate-200 rounded-lg mb-2"></div>
      <div className="h-8 w-1/2 bg-slate-200 rounded-lg mb-8"></div>
      {[100, 100, 90, 100, 85].map((w, i) => (
        <div
          key={i}
          className="h-4 bg-slate-100 rounded mb-3"
          style={{ width: `${w}%` }}
        ></div>
      ))}
    </div>
  );
}
