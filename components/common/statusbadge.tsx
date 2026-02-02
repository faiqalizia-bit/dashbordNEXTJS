function StatusBadge({ status }: { status?: string }) {

  const isActive = status?.toLowerCase() === "active";

  return (
    <span
      className={`inline-flex items-center justify-center   px-2 py-0.5  rounded-full   text-[11px] font-medium text-white
      ${isActive ? "bg-green-500 " : "bg-red-500"}`}>
      {status}
    </span>
  );
}

export default StatusBadge