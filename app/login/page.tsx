"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  // CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
import API from "@/api";

const Login = () => {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [type, setType] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setType("error");
      setMessage("Email and password are required");
      return;
    }

    try {
      const res = await API.post("/users/login", { email, password });
      setType("success");
      setMessage(res.data.message);
      localStorage.setItem("users", JSON.stringify(res.data.user));
      localStorage.setItem("token", res.data.token);
      router.push("/dashboard");
    } catch (error) {
      setType("error");
      setMessage(error.response?.data?.message || "Invalid email or password");
    }
  };

  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");
  // const [message, setMessage] = useState("");
  // const [type, setType] = useState<"success" | "error" | "">("");

  //  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();

  //   const users = JSON.parse(localStorage.getItem("users") || "[]");

  //   const foundUser = users.find(
  //     (user) => user.email === email && user.password === password
  //   );

  //   if (foundUser) {
  //     localStorage.setItem("loggedUser", JSON.stringify(foundUser));
  //     setType("success");
  //     setMessage("Login successful");
  //     router.push("/dashboard");
  //   } else {
  //     setType("error");
  //     setMessage("Invalid email or password");
  //   }
  // }
  return (
    <div className="min-h-screen w-full rounded-none shadow-none border-none flex">
      {/* left panel */}
      <div className="hidden md:flex w-1/2 bg-orange-500 items-center justify-center flex-col text-black p-8">
        <h1 className="text-6xl font-bold ">
          Health<span className="text-white">Care</span>
        </h1>

        <p className="mt-3 text-md text-white text-center max-w-xs ">
          Your trusted hospital management system for better patient care.
        </p>

        <div className="mt-6 text-md opacity-75 text-white">
          2026 HealthCare System
        </div>
      </div>
      {/* right    panel */}
      <div className="w-full md:w-1/2 flex flex-col items-center mt-10 p-6 bg-white">
        <div className="flex flex-col gap-1 justify-center items-center mb-5">
          <h1 className="font-bold text-2xl"> 👋 Welcome !</h1>
          Enter your credentials to continue
        </div>
        <Card className="w-full max-w-sm shadow-none border-2">
          <CardHeader>
            <CardTitle className="text-center text-2xl font-semi bold">
              Sign in to your account
            </CardTitle>
            {/* <CardDescription className="text-center">
              Continue to your dashboard
            </CardDescription> */}
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


            <div className="flex ">
              <form onSubmit={handleLogin} className="space-y-4">
                <span className="mb-1 ">Email</span>
                <Input
                  type="email"
                  placeholder="Enter your email"
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-neutral-50"
                />
                <span className="mb-1 ">Password</span>
                <Input
                  type="password"
                  placeholder="Enter your password"
                  onChange={(e) => setPassword(e.target.value)}
                  className="bg-neutral-50"

                />

                <Button type="submit" className="w-full bg-orange-600">
                  Login
                </Button>
              </form>
            </div>
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

          <CardFooter className="flex flex-col justify-center  text-sm">
            <div>
              Not registered?
              <Link href="/register" className="ml-1 text-orange-600 font-bold">
                Register
              </Link>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default Login;

// <div className="min-h-screen flex items-center justify-center bg-gray-100">
//   <Card className="w-full max-w-sm">
//     <CardHeader>
//       <CardTitle className="text-center">Login</CardTitle>
//       <CardDescription className="text-center">
//         Enter your credentials to continue
//       </CardDescription>
//     </CardHeader>

//     <CardContent>
//       {message && (
//         <p
//           className={`mb-4 text-sm p-2 rounded ${
//             type === "error"
//               ? "bg-red-100 text-red-600"
//               : "bg-green-100 text-green-600"
//           }`}
//         >
//           {message}
//         </p>
//       )}

//       <form onSubmit={handleLogin} className="space-y-4">
//         <Input
//           type="email"
//           placeholder="Email"
//           onChange={(e) => setEmail(e.target.value)}
//         />

//         <Input
//           type="password"
//           placeholder="Password"
//           onChange={(e) => setPassword(e.target.value)}
//         />

//         <Button type="submit" className="w-full bg-orange-600">
//           Login
//         </Button>
//       </form>
//     </CardContent>

//     <CardFooter className="justify-center text-sm">
//       Not registered?
//       <Link href="/register" className="ml-1 text-orange-600">
//         Register
//       </Link>
//     </CardFooter>
//   </Card>
// </div>

//     <div className="min-h-screen w-full bg-gray-100">
//   <Card className="min-h-screen w-full rounded-none shadow-none border-none flex">

//
//     <div className="hidden md:flex w-1/2 bg-orange-600 items-center justify-center flex-col text-black p-8">
//       <h1 className="text-4xl font-bold tracking-wide">
//         Health<span className="text-orange-200">Care</span>
//       </h1>

//       <p className="mt-3 text-sm opacity-90 text-center max-w-xs text-white">
//         Your trusted hospital management system for better patient care.
//       </p>

//       <div className="mt-6 text-sm opacity-75 text-white">
//         © 2026 HealthCare System
//       </div>
//     </div>

//
//     <div className="w-full md:w-1/2 flex items-center justify-center p-6 bg-white">
//       <Card className="w-full max-w-sm shadow-none border-none">
//         <CardHeader>
//           <CardTitle className="text-center">Login</CardTitle>
//           <CardDescription className="text-center">
//             Enter your credentials to continue
//           </CardDescription>
//         </CardHeader>

//         <CardContent>
//           {message && (
//             <p
//               className={`mb-4 text-sm p-2 rounded ${
//                 type === "error"
//                   ? "bg-red-100 text-red-600"
//                   : "bg-green-100 text-green-600"
//               }`}
//             >
//               {message}
//             </p>
//           )}

//           <form onSubmit={handleLogin} className="space-y-4">
//             <Input
//               type="email"
//               placeholder="Email"
//               onChange={(e) => setEmail(e.target.value)}
//             />

//             <Input
//               type="password"
//               placeholder="Password"
//               onChange={(e) => setPassword(e.target.value)}
//             />

//             <Button type="submit" className="w-full bg-orange-600">
//               Login
//             </Button>
//           </form>
//         </CardContent>

//         <CardFooter className="justify-center text-sm">
//           Not registered?
//           <Link href="/register" className="ml-1 text-orange-600">
//             Register
//           </Link>
//         </CardFooter>
//       </Card>
//     </div>

//   </Card>
// </div>
