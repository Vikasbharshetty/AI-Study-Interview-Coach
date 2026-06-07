import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

export default function AuthPage({ mode }) {
  const isLogin = mode === "login";
  const navigate = useNavigate();
  const { login, register } = useAuth();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");

    try {
      if (isLogin) {
        await login(form.email, form.password);
      } else {
        await register(form.name, form.email, form.password);
      }
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Authentication failed");
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-50 px-4">
      <form onSubmit={handleSubmit} className="w-full max-w-md rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
        <h1 className="text-2xl font-bold text-slate-900">{isLogin ? "Login" : "Create account"}</h1>
        <p className="mt-1 text-sm text-slate-600">Practice interviews with resume-aware AI questions.</p>

        {!isLogin && (
          <label className="mt-5 block text-sm font-medium text-slate-700">
            Name
            <input className="input mt-1" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
          </label>
        )}

        <label className="mt-4 block text-sm font-medium text-slate-700">
          Email
          <input className="input mt-1" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
        </label>

        <label className="mt-4 block text-sm font-medium text-slate-700">
          Password
          <input className="input mt-1" type="password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} />
        </label>

        {error && <p className="mt-4 rounded-md bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p>}

        <button className="btn mt-5 w-full" type="submit">{isLogin ? "Login" : "Register"}</button>

        <button
          className="mt-4 w-full text-sm font-semibold text-teal-700"
          type="button"
          onClick={() => navigate(isLogin ? "/register" : "/login")}
        >
          {isLogin ? "Need an account? Register" : "Already registered? Login"}
        </button>
      </form>
    </main>
  );
}
