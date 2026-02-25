import AuthLayout from "../layouts/AuthLayout";
import Input from "../components/Input";
import { Link, useNavigate } from "react-router-dom";
import { User, Mail, EyeClosed, File } from "lucide-react";
import { toast } from "sonner";
import { useState } from "react";
import { registerUser } from "../lib/user.service";

export default function Signup() {

  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData(e.target);

    const email = formData.get("email");
    const password = formData.get("password");
    const fullname = formData.get("fullname");
    const confirmPassword = formData.get("confirmPassword");
    const aadhaarCard = formData.get("aadhaarCard");
    const idCard = formData.get("idCard");

    if (password !== confirmPassword) {
      toast.warning("Confirm password doesn't match password!");
      setIsLoading(false);
      return;
    }

    if (!aadhaarCard || !idCard) {
      toast.error("Please upload both Aadhaar card and ID card");
      setIsLoading(false);
      return;
    }

    try {
      const data = new FormData();
      data.append("email", email);
      data.append("password", password);
      data.append("name", fullname); // Backend expects 'name', not 'fullname'
      data.append("aadhar_image", aadhaarCard); // Backend expects 'aadhar_image'
      data.append("idcard_image", idCard); // Backend expects 'idcard_image'

      const response = await registerUser(data);

      if (response.success) {
        toast.success("Account created successfully! Please login to continue.");
        navigate("/login");
      }
    } catch (error) {
      console.error("Signup error:", error);
      toast.error(error.response?.data?.message || "Sign up failed");
    } finally {
      setIsLoading(false);
    }
  };
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
      <form className="space-y-4" onSubmit={handleSubmit}>
        <Input
          required
          placeholder="Full Name"
          id="fullname"
          name="fullname"
          icon={User}
        />

        <Input
          required
          placeholder="Email"
          id="email"
          name="email"
          type="email"
          icon={Mail}
        />
        <Input
          required
          placeholder="Password"
          id="password"
          name="password"
          type="password"
          icon={EyeClosed}
        />
        <Input
          required
          placeholder="Confirm Password"
          id="confirmPassword"
          name="confirmPassword"
          type="password"
          icon={EyeClosed}
        />

        <div className="md:flex md:gap-2">
          <Input
            label="Aadhaar Card"
            required
            id="aadhaarCard"
            name="aadhaarCard"
            type="file"
            icon={File}
            accept="image/*"
          />

          <Input
            label="College Id Card"
            required
            id="idCard"
            name="idCard"
            type="file"
            icon={File}
            accept="image/*"
          />
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
            hover:cursor-pointer
            flex items-center justify-center
          "
        >
          {isLoading ? (
            <div className="flex items-center justify-center space-x-2 w-full">
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              <span>Registering...</span>
            </div>
          ) : (
            "Register"
          )}
        </button>
      </form>
    </AuthLayout>
  );
}
