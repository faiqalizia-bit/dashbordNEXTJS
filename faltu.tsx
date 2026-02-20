     <div className="h-[90vh] bg-gray-100 dark:bg-gray-900 rounded-2xl shadow-xl overflow-hidden flex">
        {/* left pannel / Threads / chats */}
        <div className="w-80 bg-white dark:bg-gray-800 border-r p-5 flex flex-col ">
          {/* Header */}
          <div className="flex justify-between items-center mb-5">
            <h2 className="text-xl font-semibold">Messages</h2>
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
            {users.map((users, index) => (
              <div
                key={index}
                className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer transition"
              >
                <div className="min-w-10 min-h-10 rounded-full bg-blue-500 text-white flex items-center justify-center font-semibold">
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
        {/* {Chat Room l} */}
        <div className="flex-1 bg-gray-50 dark:bg-gray-900 flex flex-col">
          <div className="h-20 bg-white dark:bg-gray-800 border-b px-6 flex  items-center gap-4">
            {/* <div className="border p-2 text-xl">
            Messeges
            </div> */}

            <div className="w-10 h-10 rounded-full bg-blue-500 text-white flex items-center justify-center font-semibold">
              A
            </div>

            {/* chat header */}
            <div>
              <p className="font-semibold">Amna faheem</p>
              <p className="text-sm ">Last Seen 1/7/26</p>
            </div>
          </div>
         
          <div className="flex-1 p-6 space-y-6 overflow-y-auto">
            <div className="flex items-start gap-3">
               <div className="flex justify-center items-center gap-2">
              <div className="w-8 h-8 rounded-full  bg-blue-500 flex justify-center  items-center">
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
                <div className="w-8 h-8 flex items-center justify-center  rounded-full bg-blue-500">
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
              <div className="w-8 h-8 rounded-full  bg-blue-500 flex justify-center  items-center">
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
                <div className="w-8 h-8 flex items-center justify-center  rounded-full bg-blue-500">
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

          </div>