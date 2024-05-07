export default function Loading() {
  // You can add any UI inside Loading, including a Skeleton.
  return (
    <div className="max-w-[1366px] lg:w-11/12 mx-auto h-[90vh]">
    <div className="flex flex-col md:flex-row w-12/12 justify-between gap-4 mt-3">
      <div className="w-12/12 md:w-3/12  h-[88vh] hidden md:block ">
        <div className="py-4 skeleton my-2"></div>
        <div className="py-4 skeleton my-2"></div>
        <div className="py-4 skeleton my-2"></div>
        <div className="py-4 skeleton my-2"></div>
        <div className="py-4 skeleton my-2"></div>
        
      </div>
      <div className="w-11/12 mx-auto md:w-9/12 h-[88vh] skeleton"></div>

    </div>
  </div>
  );
}
