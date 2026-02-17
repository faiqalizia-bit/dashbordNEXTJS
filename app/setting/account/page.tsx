"use client";
import { useEffect, useState } from "react";
import { getProfile, updateUser } from "@/srevices/user";

interface User {
  id: string;
  name: string;
  email: string;
}

export default function AccountSettingsPage() {
  const [user, setUser] = useState({});

  console.log("step-1", user);
  const [type, setType] = useState("");
  const [msg, setMsg] = useState("");

  useEffect(() => {
    const authUser = JSON.parse(localStorage.getItem("users") || "{}");
    console.log("step-2", authUser);
    if (!authUser?.id) return;
    setUser(authUser)

    // getProfile(user.id)
    //   .then((data) => setUser(data))
    //   .catch(() => setMsg("Failed to load profile"));

  }, []);


console.log("step-3", user)


  const handleUpdate = async () => {

    if (!user?.id) return setMsg("No user data available");

    const payload = {
      name: user.name,
      email: user.email,
    };

    try {
      const res = await updateUser(user.id, payload);
      console.log("🚀 Update response:", res);

      setMsg(res.message || "Updated successfully");
      setType("success");

      // Optionally update local storage
      localStorage.setItem(
        "users",
        JSON.stringify({ id: user.id, name: user.name, email: user.email }),
      );
    } catch (err: any) {
      setMsg(err.response?.data?.message || "Update failed");
      setType("error");
    }
  };
  console.log("🚀 ~ handleUpdate ~ handleUpdate:", handleUpdate);
  

  return (
    <div>
      <h2 className="text-xl font-semibold mb-6">Account Settings</h2>

      {msg && (
        <p
          className={`mb-4 text-sm p-2 rounded ${
            type === "error"
              ? "bg-red-100 text-red-600"
              : "bg-green-100 text-green-600"
          }`}
        >
          {msg}
        </p>
      )}

      <div className="flex flex-col gap-4">
        <label>Name</label>
        <input
        
          value={user.name}
          onChange={(e) => setUser({ ...user, name: e.target.value })}
          placeholder="Name"
          className="w-1/2 border p-2 rounded-lg"
        />
        <label>Email</label>
        <input
          value={user.email}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
          placeholder="Email"
          className="w-1/2 border p-2 rounded-lg"
        />
      </div>

      <button
        onClick={handleUpdate}
        className="mt-6 bg-gray-500 hover:bg-gray-700 text-white px-6 py-2 rounded-lg"
      >
        Update
      </button>
    </div>
  );
}

