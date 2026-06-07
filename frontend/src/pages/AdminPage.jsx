import { useEffect, useState } from "react";
import { api } from "../api/client.js";
import { useAuth } from "../context/AuthContext.jsx";

export default function AdminPage() {
  const { user } = useAuth();
  const [users, setUsers] = useState([]);
  const [activity, setActivity] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    if (user?.role !== "admin") {
      setError("Admin access required.");
      return;
    }

    Promise.all([api.get("/admin/users"), api.get("/admin/activity")])
      .then(([usersResponse, activityResponse]) => {
        setUsers(usersResponse.data.users);
        setActivity(activityResponse.data.activity);
      })
      .catch((err) => setError(err.response?.data?.message || "Could not load admin data"));
  }, [user]);

  if (error) {
    return <p className="rounded-md bg-red-50 p-4 text-red-700">{error}</p>;
  }

  return (
    <section>
      <h1 className="text-2xl font-bold">Admin Panel</h1>
      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <div className="rounded-lg border border-slate-200 bg-white p-5">
          <h2 className="font-semibold">Users</h2>
          <div className="mt-3 space-y-3">
            {users.map((item) => (
              <div key={item._id} className="border-b border-slate-100 pb-3 text-sm">
                <p className="font-medium">{item.name}</p>
                <p className="text-slate-500">{item.email} - {item.role}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="rounded-lg border border-slate-200 bg-white p-5">
          <h2 className="font-semibold">Activity</h2>
          <div className="mt-3 space-y-3">
            {activity.map((item) => (
              <div key={item._id} className="border-b border-slate-100 pb-3 text-sm">
                <p className="font-medium">{item.action}</p>
                <p className="text-slate-500">{item.user?.email || "Unknown user"} - {item.details}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
