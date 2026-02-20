import { dummyMessages } from "@/static-data/dummyMessages";

const ChatRoom = () => {

  return (
    <div className="flex-1 bg-gray-50 dark:bg-gray-900 flex flex-col">
      {/* chat header */}
      <div className="h-20 bg-white dark:bg-gray-800 border-b px-6 flex pb-3  items-center gap-4">
        <div className="w-10 h-10 rounded-full bg-[#151f33] text-white flex items-center justify-center font-semibold">
          A
        </div>
        <div>
          <p className="font-semibold">Amna faheem</p>
          <p className="text-[10px] pb-1">Last Seen 1/7/26</p>
        </div>
      </div>

      {/* chating */}
      <div className="flex flex-col  p-6 space-y-6 overflow-y-auto">
        {dummyMessages.map((item, idx) => (
          <div
            className={`flex ${item.userType === "receiver" ? "justify-start" : "justify-end"}`}
            key={idx}
          >
            <div className="flex items-center gap-2 max-w-[70%]">
              <div className="w-8 text-sm h-8 rounded-full  bg-[#151f33] text-white flex justify-center  items-center">
                {item.name}
              </div>

              {/* Todo need to collaps over flow content but visible  */}
              <div
                className={` ${item.userType === "receiver" ? "bg-green-200" : "bg-white"} overflow-hidden  gap-2 dark:bg-gray-800 px-4 py-3 rounded-2xl shadow max-w-xs`}
              >
                <p>{item.message}</p>
                <p className="text-right text-xs">{item.time}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* <div className="flex items-end justify-end gap-3">
          <div className="flex justify-center items-center gap-2">
            <div className="bg-blue-600 flex gap-2 justify-between items-center text-white px-4 py-3 rounded-2xl shadow max-w-xs">
              <p>JO mrzi smj lo</p>
              <p className="text-right text-xs">12:37</p>
            </div>
            <div className="w-8 h-8 rounded-full  bg-gray-500 flex justify-center items-center">
              F
            </div>
          </div>
        </div>

        <div className="flex items-end justify-end gap-3">
          <div className="flex justify-center items-center gap-2">
            <div className="bg-blue-600 flex gap-2 justify-between items-center text-white px-4 py-3 rounded-2xl shadow max-w-xs">
              <p>Gas U!</p>
              <p className="text-right text-xs">12:38</p>
            </div>
            <div className="w-8 h-8 rounded-full  bg-gray-500 flex justify-center items-center">
              F
            </div>
          </div>
        </div>

        <div className="flex items-start  gap-3">
          <div className="flex justify-center items-center gap-2">
            <div className="w-8 h-8 flex items-center justify-center  rounded-full bg-[#151f33]">
              A
            </div>
            <div className="bg-white flex gap-2 justify-between items-center dark:bg-gray-800 px-4 py-3 rounded-2xl shadow max-w-xs">
              <p>typo hogya?</p>
              <p className="text-right text-xs">12:40</p>
            </div>
          </div>
        </div>

        <div className="flex items-end justify-end gap-3">
          <div className="flex justify-center items-center gap-2">
            <div className="bg-blue-600 flex gap-2 justify-between items-center text-white px-4 py-3 rounded-2xl shadow max-w-xs">
              <p>Nhi toh</p>
              <p className="text-right text-xs">12:41</p>
            </div>
            <div className="w-8 h-8 rounded-full  bg-gray-500 flex justify-center items-center">
              F
            </div>
          </div>
        </div>
        <div className="flex items-start gap-3">
          <div className="flex justify-center items-center gap-2">
            <div className="w-8 h-8 rounded-full  bg-[#151f33] flex justify-center  items-center">
              A
            </div>
            <div className="bg-white flex gap-2 justify-between items-center dark:bg-gray-800 px-4 py-3 rounded-2xl shadow max-w-xs">
              <p>who,s there</p>
              <p className="text-right text-xs">12:37</p>
            </div>
          </div>
        </div>

        <div className="flex items-end justify-end gap-3">
          <div className="flex justify-center items-center gap-2">
            <div className="bg-blue-600 flex gap-2 justify-between items-center text-white px-4 py-3 rounded-2xl shadow max-w-xs">
              <p>JO mrzi smj lo</p>
              <p className="text-right text-xs">12:37</p>
            </div>
            <div className="w-8 h-8 rounded-full  bg-gray-500 flex justify-center items-center">
              F
            </div>
          </div>
        </div>

        <div className="flex items-end justify-end gap-3">
          <div className="flex justify-center items-center gap-2">
            <div className="bg-blue-600 flex gap-2 justify-between items-center text-white px-4 py-3 rounded-2xl shadow max-w-xs">
              <p>Gas U!</p>
              <p className="text-right text-xs">12:38</p>
            </div>
            <div className="w-8 h-8 rounded-full  bg-gray-500 flex justify-center items-center">
              F
            </div>
          </div>
        </div>

        <div className="flex items-start  gap-3">
          <div className="flex justify-center items-center gap-2">
            <div className="w-8 h-8 flex items-center justify-center  rounded-full bg-[#151f33]">
              A
            </div>
            <div className="bg-white flex gap-2 justify-between items-center dark:bg-gray-800 px-4 py-3 rounded-2xl shadow max-w-xs">
              <p>typo hogya?</p>
              <p className="text-right text-xs">12:40</p>
            </div>
          </div>
        </div>

        <div className="flex items-end justify-end gap-3">
          <div className="flex justify-center items-center gap-2">
            <div className="bg-blue-600 flex gap-2 justify-between items-center text-white px-4 py-3 rounded-2xl shadow max-w-xs">
              <p>Nhi toh</p>
              <p className="text-right text-xs">12:41</p>
            </div>
            <div className="w-8 h-8 rounded-full  bg-gray-500 flex justify-center items-center">
              F
            </div>
          </div>
        </div> */}

      {/* Type Section / Input */}
      <div className="  h-20 bg-white dark:bg-gray-800 border-t px-6 flex items-center gap-4">
        <input
          type="text"
          placeholder="Type a message..."
          className="flex-1 px-4 py-2 bg-gray-100 dark:bg-gray-700 rounded-xl outline-none"
        />
        <button className="bg-[#151f33] text-white px-6 py-2 rounded-xl hover:bg-blue-700 transition">
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatRoom;
