import { useState } from "react";
import { Lock, Mail } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData(e.target);
    const email = formData.get("email");
    const password = formData.get("password");

    console.log(email, password);

    // simulate API call
    setTimeout(() => {
      setIsLoading(false);
      navigate("/dashboard");
    }, 1500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-pink-100 p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="flex flex-col items-center mb-8 text-center">
          <h1 className="text-2xl font-bold">Society Panel</h1>
          <p className="text-sm text-gray-500">
            Enter your credentials to access your dashboard
          </p>
        </div>

        {/* Card */}
        <div className="bg-white shadow-xl rounded-lg border-r-4 border-b-4 p-6">
          <div className="mb-6">
            <h2 className="text-xl font-semibold">Sign in</h2>
            <p className="text-sm text-gray-500">
              Enter your email and password below
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email */}
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium">
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <input
                  name="email"
                  id="email"
                  type="email"
                  placeholder="name@example.com"
                  required
                  className="w-full h-10 rounded-md border-r-3 border-b-3 px-3 pl-10 text-sm focus:outline-none"
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-2">
              <label htmlFor="password" className="text-sm font-medium">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <input
                  name="password"
                  id="password"
                  type="password"
                  placeholder="***********"
                  required
                  className="w-full h-10 rounded-md border-r-3 border-b-3 px-3 pl-10 text-sm focus:outline-none"
                />
              </div>
            </div>

            {/* Button */}
            <div className="pt-5">
              <button
                type="submit"
                disabled={isLoading}
                className="w-full h-10 rounded-md cursor-pointer bg-gray-100 text-black border-r-5 border-b-5  font-medium hover:bg-gray-100 disabled:opacity-50"
              >
                {isLoading ? "Signing in..." : "Sign In"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
