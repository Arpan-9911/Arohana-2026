import AuthLayout from "../layouts/AuthLayout";
import Input from "../components/Input";
import { Link } from "react-router-dom";
import { User, Mail } from "lucide-react";

export default function Signup() {
  return (
    <AuthLayout
      reverse
      title="Join the Pack!"
      subtitle={
        <>
          <span className="text-muted">Already have an account?</span>{" "}
          <Link to="/login" className="text-muted font-semibold">
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
              w-full bg-secondary-foreground
              hover:bg-muted
              py-4 rounded-full
              text-xl font-bold
            "
          >
            Register
          </button>
        </form>
    </AuthLayout>
  );
}
