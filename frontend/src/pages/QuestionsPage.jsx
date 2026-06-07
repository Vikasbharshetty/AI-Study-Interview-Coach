import { useEffect, useState } from "react";
import { Wand2 } from "lucide-react";
import { api } from "../api/client.js";

export default function QuestionsPage() {
  const [resumes, setResumes] = useState([]);
  const [history, setHistory] = useState([]);
  const [form, setForm] = useState({ resumeId: "", role: "Full Stack Developer", count: 5 });
  const [loading, setLoading] = useState(false);

  async function loadData() {
    const [resumeResponse, historyResponse] = await Promise.all([api.get("/resumes/me"), api.get("/ai/history")]);
    setResumes(resumeResponse.data.resumes);
    setHistory(historyResponse.data.questionSets);
    if (!form.resumeId && resumeResponse.data.resumes[0]) {
      setForm((current) => ({ ...current, resumeId: resumeResponse.data.resumes[0]._id }));
    }
  }

  useEffect(() => {
    loadData();
  }, []);

  async function generateQuestions(event) {
    event.preventDefault();
    setLoading(true);
    await api.post("/ai/questions", form);
    await loadData();
    setLoading(false);
  }

  async function generateAnswers(questionSetId) {
    setLoading(true);
    await api.post("/ai/answers", { questionSetId });
    await loadData();
    setLoading(false);
  }

  return (
    <section>
      <h1 className="text-2xl font-bold">AI Interview Questions</h1>
      <form onSubmit={generateQuestions} className="mt-5 grid gap-4 rounded-lg border border-slate-200 bg-white p-5 md:grid-cols-4">
        <select className="input md:col-span-2" value={form.resumeId} onChange={(e) => setForm({ ...form, resumeId: e.target.value })}>
          <option value="">Select resume</option>
          {resumes.map((resume) => (
            <option key={resume._id} value={resume._id}>{resume.originalName}</option>
          ))}
        </select>
        <input className="input" value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })} />
        <input className="input" type="number" min="1" max="10" value={form.count} onChange={(e) => setForm({ ...form, count: e.target.value })} />
        <button className="btn md:col-span-4" disabled={loading || !form.resumeId}>
          <Wand2 className="h-4 w-4" />
          {loading ? "Working..." : "Generate questions"}
        </button>
      </form>

      <div className="mt-6 space-y-5">
        {history.map((set) => (
          <article key={set._id} className="rounded-lg border border-slate-200 bg-white p-5">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <h2 className="font-semibold">{set.role}</h2>
                <p className="text-sm text-slate-500">{new Date(set.createdAt).toLocaleString()}</p>
              </div>
              <button className="btn-secondary" onClick={() => generateAnswers(set._id)} disabled={loading}>
                Generate answers
              </button>
            </div>
            <ol className="mt-4 space-y-4">
              {set.questions.map((item, index) => (
                <li key={`${set._id}-${index}`}>
                  <p className="font-medium">{index + 1}. {item.question}</p>
                  {item.answer && <p className="mt-2 rounded-md bg-slate-50 p-3 text-sm text-slate-700">{item.answer}</p>}
                </li>
              ))}
            </ol>
          </article>
        ))}
      </div>
    </section>
  );
}
