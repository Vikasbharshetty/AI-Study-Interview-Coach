import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import { Brain, LogOut } from "lucide-react";
import { useAuth } from "../context/AuthContext.jsx";

const navItems = [
  ["Dashboard", "/"],
  ["Resume", "/resume"],
  ["AI Questions", "/questions"],
  ["Topics", "/topics"],
  ["Quiz", "/quiz"],
  ["Admin", "/admin"]
];

export default function Layout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate("/login");
  }

  return (
    <div className="min-h-screen">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-4 py-4">
          <Link to="/" className="flex items-center gap-2 font-bold text-slate-900">
            <Brain className="h-6 w-6 text-teal-700" />
            AI Study & Interview Coach
          </Link>
          <nav className="flex flex-wrap items-center gap-2 text-sm">
            {navItems.map(([label, path]) => (
              <NavLink
                key={path}
                to={path}
                className={({ isActive }) =>
                  `rounded-md px-3 py-2 ${isActive ? "bg-teal-50 text-teal-800" : "text-slate-600 hover:bg-slate-100"}`
                }
              >
                {label}
              </NavLink>
            ))}
          </nav>
          <div className="flex items-center gap-3">
            <span className="text-sm text-slate-600">{user?.name}</span>
            <button className="btn-secondary" onClick={handleLogout}>
              <LogOut className="h-4 w-4" />
              Logout
            </button>
          </div>
        </div>
      </header>
      <main className="mx-auto max-w-6xl px-4 py-6">
        <Outlet />
      </main>
    </div>
  );
}
