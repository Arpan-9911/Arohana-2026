import AuthLayout from "../layouts/AuthLayout";
import Input from "../components/Input";
import { Link } from "react-router-dom";
import {Eye, EyeClosed, EyeClosedIcon, icons, Mail} from "lucide-react"

export default function Login() {
  return (
    <AuthLayout
      title="Welcome Back!"
      subtitle={
        <>
          <span className="text-muted">Don't have an account?{" "}</span>
          <Link to="/signup" className="text-muted font-semibold">
            Sign up
          </Link>
        </>
      }
    >
      <form className="space-y-6">
        <Input required label="Email" type="Email" icon={Mail}/>
        <Input required label="Password" type="password" icon={EyeClosed} />

        <div className="flex justify-between items-center text-sm">
          <label className="flex text-muted items-center gap-2">
            <input type="checkbox" className= "accent-muted/40" />
            Remember me
          </label>

          <span className="text-muted cursor-pointer">
            Forget password?
          </span>
        </div>

        <button
          className="
            w-full bg-secondary-foreground
            hover:bg-muted
            py-4 rounded-full
            text-xl font-bold
          "
        >
          Sign In
        </button>
      </form>
    </AuthLayout>
  );
}
