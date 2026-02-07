import { Link } from "react-router-dom";
import { Button } from "../components/Button.jsx";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-10 px-6 bg-[var(--foreground)] text-[var(--background)]">
      
      {/* Title */}
      <div className="text-center space-y-3">
        <h1 className="text-5xl sm:text-6xl font-extrabold tracking-wide">
          Arohana 2026
        </h1>
        <p className="text-[var(--background)]/70 text-lg">
          Annual Tech & Cultural Fest
        </p>
      </div>

      {/* Navigation Buttons */}
      <div className="flex flex-wrap justify-center gap-5">
        <Link to="/login">
          <Button className="text-lg font-semibold px-6 py-3">
            Login
          </Button>
        </Link>

        <Link to="/signup">
          <Button className="text-lg font-semibold px-6 py-3">
            Signup
          </Button>
        </Link>

        <Link to="/events">
          <Button className="text-lg font-semibold px-6 py-3">
            Events
          </Button>
        </Link>

        <Link to="/dashboard">
          <Button className="text-lg font-semibold px-6 py-3">
            Dashboard
          </Button>
        </Link>
      </div>
    </div>
  );
}
