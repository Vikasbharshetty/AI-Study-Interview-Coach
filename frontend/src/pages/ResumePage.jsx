import { useEffect, useState } from "react";
import { Upload } from "lucide-react";
import { api } from "../api/client.js";

export default function ResumePage() {
  const [file, setFile] = useState(null);
  const [resumes, setResumes] = useState([]);
  const [message, setMessage] = useState("");

  async function loadResumes() {
    const { data } = await api.get("/resumes/me");
    setResumes(data.resumes);
  }

  useEffect(() => {
    loadResumes();
  }, []);

  async function uploadResume(event) {
    event.preventDefault();
    if (!file) return;

    const formData = new FormData();
    formData.append("resume", file);
    await api.post("/resumes/upload", formData);
    setMessage("Resume uploaded and text extracted successfully.");
    setFile(null);
    loadResumes();
  }

  return (
    <section>
      <h1 className="text-2xl font-bold">Upload Resume PDF</h1>
      <form onSubmit={uploadResume} className="mt-5 rounded-lg border border-slate-200 bg-white p-5">
        <input className="input" type="file" accept="application/pdf" onChange={(e) => setFile(e.target.files[0])} />
        <button className="btn mt-4" type="submit">
          <Upload className="h-4 w-4" />
          Upload
        </button>
        {message && <p className="mt-3 text-sm text-teal-700">{message}</p>}
      </form>

      <h2 className="mt-8 text-lg font-semibold">Previous resumes</h2>
      <div className="mt-3 space-y-3">
        {resumes.map((resume) => (
          <div key={resume._id} className="rounded-lg border border-slate-200 bg-white p-4">
            <p className="font-semibold">{resume.originalName}</p>
            <p className="mt-1 text-sm text-slate-500">{new Date(resume.createdAt).toLocaleString()}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
