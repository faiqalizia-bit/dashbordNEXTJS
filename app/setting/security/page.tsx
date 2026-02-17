"use client";
import { useEffect, useState } from "react";
import {updateUser } from "@/srevices/user";

export default function PasswordPage() {
  const [userId, setUserId] = useState("");

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [msg, setMsg] = useState("");
  const [type, setType] = useState<"success" | "error" | "">("");

 
  useEffect(() => {
    const authUser = JSON.parse(localStorage.getItem("users") || "{}");
    if (authUser?.id) setUserId(authUser.id);
  }, []);

  const handleChangePassword = async () => {
    setMsg("");

    if (!userId) return setMsg("User not found");


    if (!oldPassword || !newPassword || !confirmPassword) {
      setType("error");
      return setMsg("All fields are required");
    }

    if (newPassword.length < 6) {
      setType("error");
      return setMsg("Password must be at least 6 characters");
    }

    if (newPassword !== confirmPassword) {
      setType("error");
      return setMsg("Passwords do not match");
    }

    try {
      const res = await updateUser(userId, {
        password: newPassword,
      });

      setType("success");
      setMsg(res.message || "Password updated successfully");

    
      setOldPassword("");
      setNewPassword("");
      setConfirmPassword("");

    } catch (err: unknown) {
      setType("error");
      setMsg("Password update failed");
    }
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-6">Change Password</h2>

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

      <div className="flex flex-col gap-6 w-1/2">
        <input
          type="password"
          value={oldPassword}
          onChange={(e) => setOldPassword(e.target.value)}
          placeholder="Old Password"
          className="border p-2 rounded-lg"
        />

        <input
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          placeholder="Create strong password"
          className="border p-2 rounded-lg"
        />

        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="Confirm new password"
          className="border p-2 rounded-lg"
        />
      </div>

      <button
        onClick={handleChangePassword}
        className="mt-6 bg-gray-600 hover:bg-gray-800 text-white px-6 py-2 rounded-lg"
      >
        Save Changes
      </button>
    </div>
  );
}
