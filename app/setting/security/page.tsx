import React from 'react'

function page() {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-6">Account Settings</h2>

      {/* {msg && (
        <p  className={`mb-4 text-sm p-2 rounded ${
                  type === "error"
                    ? "bg-red-100 text-red-600"
                    : "bg-green-100 text-green-600"
                }`}>{msg}</p>
      )} */}

      <div className="flex flex-col gap-6">
        <input
        //   value={user.name}
        //   onChange={(e)=>setUser({...user,name:e.target.value})}
          placeholder="Old Password"
          className="border p-2 rounded-lg"
        />
        <input
        //   value={user.email}
        //   onChange={(e)=>setUser({...user,email:e.target.value})}
          placeholder="Create strong password"
          className="border p-2 rounded-lg"
        />

        <input
        placeholder='confirm new password'
        className="border p-2 rounded-lg"
        />
      </div>

      <button
        // onClick={handleUpdate}
        className="mt-6 bg-gray-500 text-white px-6 py-2 rounded-lg"
      >
        Save Changes
      </button>
      </div>
  )
}

export default page