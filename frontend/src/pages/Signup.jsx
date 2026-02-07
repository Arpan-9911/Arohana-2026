import AuthLayout from "../layouts/AuthLayout";
import Input from "../components/Input";
import { Link } from "react-router-dom";

export default function Signup() {
  return (
    <AuthLayout
      reverse
      title="Join the Pack!"
      subtitle={
        <>
          <span className="text-lemon-chiffon">Already have an account?</span>{" "}
          <Link to="/login" className="text-muted font-semibold">
            Sign in
          </Link>
        </>
      }
    >
      <form className="space-y-6">
        <Input required label="Full Name" />
        <Input required label="Email" type="email"/>
        <Input required label="Password" type="password" />
        <Input required label="Confirm Password" type="password" />


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
