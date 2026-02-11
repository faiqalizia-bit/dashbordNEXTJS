"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import API from "@/api";
import axios from "axios";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export default function Register() {
  const router = useRouter();
  
  const [message, setMessage] = useState("");
  const [type, setType] = useState("");
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { name, email, password } = form;

    if (!name || !email || !password) {
      setType("error");
      setMessage("All fields are required");
      return;
    }

    if (password.length < 6) {
      setType("error");
      setMessage("Password must be at least 6 characters");
      return;
    }

    try {
      const res = await API.post("/users/register", {
        name,
        email,
        password,
      });

      setType("success");
      setMessage(res.data.message);

      localStorage.setItem("users", JSON.stringify(res.data.user));
      localStorage.setItem("token", res.data.token);
      router.push("/dashboard");
    } catch (error:unknown) {
      setType("error");
       if (axios.isAxiosError(error)) {
        setMessage(error.response?.data?.message || "Invalid email or password");
      } else if (error instanceof Error) {
        setMessage(error.message);
      } else {
        setMessage("Invalid email or password");
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="min-h-screen w-full rounded-none shadow-none border-none flex">
        <div className="hidden md:flex w-1/2 bg-orange-600 items-center justify-center flex-col text-black p-8">
          <h1 className="text-4xl font-bold ">
            Health<span className="text-orange-200">Care</span>
          </h1>

          <p className="mt-3 text-sm opacity-90 text-center max-w-xs text-white">
            Your trusted hospital management system for better patient
            care.{" "}
          </p>

          <div className="mt-6 text-sm opacity-75 text-white">
            {" "}
            © 2026 HealthCare System
          </div>
        </div>
        <div className="w-full md:w-1/2 flex flex-col items-center mt-6 p-6  bg-white">
          <div className="flex flex-col gap-1 justify-center items-center mb-5">
            <h1 className="font-bold text-2xl"> 👋 Welcome !</h1>
            Let,s Register your self
          </div>
          <Card className="w-full max-w-sm">
            <CardHeader>
              <CardTitle className="text-center text-2xl font-semi bold">
                {" "}
                Create your account
              </CardTitle>
            </CardHeader>

            <CardContent>
              {message && (
                <p
                  className={`mb-4 text-sm p-2 rounded ${
                    type === "error"
                      ? "bg-red-100 text-red-600"
                      : "bg-green-100 text-green-600"
                  }`}
                >
                  {message}
                </p>
              )}

              <form onSubmit={handleRegister} className="space-y-4">
                <Input name="name" placeholder="Name" onChange={handleChange} className="bg-neutral-50" />

                <Input
                  type="email"
                  name="email"
                  placeholder="Email"
                  onChange={handleChange}
                  className="bg-neutral-50"
                />

                <Input
                  type="password"
                  name="password"
                  placeholder="Password"
                  onChange={handleChange}
                  className="bg-neutral-50"
                />

                <Button type="submit" className="w-full bg-orange-600">
                  Register
                </Button>
              </form>

                <div className="mt-3">

            <Button
              type="submit"
              className="w-full mb-5 bg-neutral-50 text-black"
            >
              Continue with google
            </Button>
              <Link href={"https://www.facebook.com/"}>

            <Button type="submit" className="w-full bg-neutral-50 text-black  ">
              Continue with facebook
            </Button>
              </Link>
            </div>
            <p className="text-center pt-2">or</p>
            </CardContent>

            <CardFooter className="justify-center text-sm">
              Already registered?
              <Link href="/login" className="ml-1 text-orange-600">
                Login
              </Link>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}
