import AuthLayout from "../layouts/AuthLayout";
import Input from "../components/Input";
import { Link } from "react-router-dom";
import { User, Mail } from "lucide-react";

export default function Signup() {
  return (
    <AuthLayout
      reverse
      image="signUp-cropped.svg"
      subtitle={
        <>
          <span>Already have an account? </span>
          <Link to="/login" className="font-semibold text-white">
            Sign in
          </Link>
        </>
      }
    >
        <form className="space-y-6">
          <Input required placeholder="Full Name" icon={User} />
          <Input required placeholder="Email" type="email" icon={Mail}/>
          <Input required placeholder="Password" type="password" />
          <Input required placeholder="Confirm Password" type="password" />


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
              hover:cursor-pointer
            "
          >
            Register
          </button>
        </form>
    </AuthLayout>
  );
}
