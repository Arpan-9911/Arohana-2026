import { Link } from "react-router-dom";
import { Button } from "../components/Button.jsx";

export default function Home() {
  return (
    <div>
      <div className="bg-primary m-10">color working ??</div>
      <h1 className="text-center text-background">text working ??</h1>

      {/* see if it is working or not */}
      <div className="flex justify-center gap-5">
        <Link to="/login">
        <Button className="text-2xl font-bold text-foreground">Login</Button>
      </Link>

      <Link to="/signup">
        <Button className="text-2xl font-bold text-foreground">Signup</Button>
      </Link>

      <Link to="/events">
        <Button className="text-2xl font-bold text-foreground">Events</Button>
      </Link>

      <Link to="/dashboard">
        <Button className="text-2xl font-bold text-foreground">Dashboard</Button>
      </Link>

      <Link to="/notFound">
        <Button className="text-2xl font-bold text-foreground">Not Found</Button>
      </Link>
      </div>
    </div>


  )
}
