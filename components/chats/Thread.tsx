import { threads } from "@/static-data/thread";
import { Search } from "lucide-react";

const Thread = () => {
  return (
    <div className="w-80 bg-white dark:bg-gray-800 border-r p-5 flex flex-col ">
      {/* Header */}
      <div className="flex justify-between items-center mb-5">
        <h2 className="text-xl font-semibold">Conversations</h2>
      </div>
      <div className="relative mb-6">
        <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
        <input
          type="text"
          placeholder="Search..."
          className="w-full pl-10 pr-4 py-2 bg-gray-100 dark:bg-gray-700 rounded-xl focus:outline-none"
        />
      </div>

      <div className="flex flex-col gap-4 overflow-y-auto">
        {threads.map((users, index) => (
          <div
            key={index}
            className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer transition"
          >
            <div className="min-w-10 min-h-10 rounded-full bg-[#151f33] text-white flex items-center justify-center font-semibold">
              {users.name.charAt(0)}
            </div>
            <div className="flex-1">
              <p className="font-medium text-sm">
                {users.name.length > 10
                  ? users.name.slice(0, 10) + "..."
                  : users.name}
              </p>
              <p className="text-xs text-gray-500 ">
                {users.Recent.length > 10
                  ? users.Recent.slice(0, 10) + "..."
                  : users.Recent}
              </p>
            </div>
            <span className="text-xs text-gray-400">{users.time}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Thread;
