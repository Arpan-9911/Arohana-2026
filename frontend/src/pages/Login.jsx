import AuthLayout from "../layouts/AuthLayout";
import Input from "../components/Input";
import { Link, useNavigate } from "react-router-dom";
import { EyeClosed, Mail } from "lucide-react"
import { useState } from "react";
import { toast } from "sonner"
import { loginUser } from "../lib/user.service";
import { useUserStore } from "../store/user.store";

export default function Login() {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { setUser } = useUserStore();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData(e.target)
    const email = formData.get("email")
    const password = formData.get("password")

    try {
      const response = await loginUser({ email, password })
      if (response.success) {
        setUser(response.user);
        toast.success("Login successful")
        navigate("/dashboard")
      }
    } catch (error) {
      console.error(error)
      toast.error(error.response?.data?.message || "Login failed")
    } finally {
      setIsLoading(false)
    }
  }
  return (
    <AuthLayout
      image="login-nobg-cropped.svg"
      subtitle={
        <>
          <span>Don't have an account? </span>
          <Link to="/signup" className="font-semibold text-white">
            Sign up
          </Link>
        </>
      }
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        <Input
          required
          label="Email"
          id="email"
          name="email"
          type="email"
          icon={Mail}
        />
        <Input
          required
          label="Password"
          id="password"
          name="password"
          type="password"
          icon={EyeClosed}
        />

        <div className="flex justify-between items-center text-sm">
          <label className="flex text-background items-center gap-2">
            <input type="checkbox" className="accent-muted/40" />
            Remember me
          </label>

          <span className="text-background cursor-pointer">
            Forget password?
          </span>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="
            w-full
            bg-linear-to-r from-violet-brand-300 to-violet-brand-200
            shadow-[0_10px_30px_rgba(146,77,191,0.5)]
            hover:shadow-[0_15px_45px_rgba(146,77,191,0.7)]
            py-4
            rounded-full
            text-lg font-bold
            tracking-wide
            transition-all duration-300
            hover:scale-[1.02]
            active:scale-95
          "
        >
          {isLoading ? (
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              <span>Signing in...</span>
            </div>
          ) : (
            "Sign In"
          )}
        </button>
      </form>
    </AuthLayout>
  );
}
