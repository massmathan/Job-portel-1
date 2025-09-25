import { useContext } from "react";
import { AuthContext } from "../AuthContext/AuthContext";

export default function Dashboard() {
  const { user } = useContext(AuthContext);

  return (
    <header className="bg-primary text-white p-3 d-flex justify-content-between">
      <h2>Welcome, {user?.username || "Guest"}</h2>
    </header>
  );
}
