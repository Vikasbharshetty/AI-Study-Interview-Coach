import { useEffect, useState } from "react";
import { api } from "../api/client.js";

export default function Dashboard() {
  const [progress, setProgress] = useState(null);

  useEffect(() => {
    api.get("/progress/me").then(({ data }) => setProgress(data.progress));
  }, []);

  return (
    <section>
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <div className="mt-6 grid gap-4 md:grid-cols-3">
        <div className="rounded-lg border border-slate-200 bg-white p-5">
          <p className="text-sm text-slate-500">Completed topics</p>
          <p className="mt-2 text-3xl font-bold">{progress?.completedTopics?.length || 0}</p>
        </div>
        <div className="rounded-lg border border-slate-200 bg-white p-5">
          <p className="text-sm text-slate-500">AI questions generated</p>
          <p className="mt-2 text-3xl font-bold">{progress?.generatedQuestionCount || 0}</p>
        </div>
        <div className="rounded-lg border border-slate-200 bg-white p-5">
          <p className="text-sm text-slate-500">Quiz attempts</p>
          <p className="mt-2 text-3xl font-bold">{progress?.quizScores?.length || 0}</p>
        </div>
      </div>
    </section>
  );
}
