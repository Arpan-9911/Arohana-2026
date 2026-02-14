import AuthLayout from "../layouts/AuthLayout";
import Input from "../components/Input";
import { Link } from "react-router-dom";
import {Eye, EyeClosed, Mail} from "lucide-react"

export default function Login() {
  return (
    <AuthLayout
      image="login-nobg-cropped.svg"
      subtitle={
        <>
          <span>Don't have an account?{" "}</span>
          <Link to="/signup" className="font-semibold text-white">
            Sign up
          </Link>
        </>
      }
    >
      <form className="space-y-6">
        <Input required label="Email" type="email" icon={Mail}/>
        <Input required label="Password" type="password" icon={EyeClosed} />

        <div className="flex justify-between items-center text-sm">
          <label className="flex text-background items-center gap-2">
            <input type="checkbox" className= "accent-muted/40" />
            Remember me
          </label>

          <span className="text-background cursor-pointer">
            Forget password?
          </span>
        </div>

        <button
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
          Sign In
        </button>
      </form>
    </AuthLayout>
  );
}
