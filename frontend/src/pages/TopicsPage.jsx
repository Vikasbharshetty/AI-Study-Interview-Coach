import { useEffect, useState } from "react";
import { api } from "../api/client.js";

export default function TopicsPage() {
  const [topics, setTopics] = useState([]);

  useEffect(() => {
    api.get("/topics").then(({ data }) => setTopics(data.topics));
  }, []);

  return (
    <section>
      <h1 className="text-2xl font-bold">Topic-wise Preparation</h1>
      <div className="mt-5 grid gap-4 md:grid-cols-2">
        {topics.map((topic) => (
          <article key={topic.slug} className="rounded-lg border border-slate-200 bg-white p-5">
            <h2 className="text-lg font-semibold">{topic.title}</h2>
            <p className="mt-2 text-sm text-slate-600">{topic.notes}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
