export default function Loading() {
  return (
    <div className="px-5 md:px-8 py-6 md:py-8 max-w-3xl animate-pulse">
      {/* Breadcrumb */}
      <div className="h-3 w-28 bg-slate-200 rounded mb-6"></div>

      {/* Title */}
      <div className="h-8 w-3/4 bg-slate-200 rounded-lg mb-2"></div>
      <div className="h-8 w-1/2 bg-slate-200 rounded-lg mb-8"></div>

      {/* Body lines */}
      {[100, 100, 90, 100, 85, 100, 95, 80, 100, 70].map((w, i) => (
        <div
          key={i}
          className="h-4 bg-slate-100 rounded mb-3"
          style={{ width: `${w}%` }}
        ></div>
      ))}

      {/* Video placeholder */}
      <div className="h-52 md:h-72 w-full md:w-10/12 mx-auto bg-slate-100 rounded-xl mt-10"></div>
    </div>
  );
}
