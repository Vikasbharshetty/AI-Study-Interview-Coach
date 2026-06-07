import { useEffect, useState } from "react";
import { api } from "../api/client.js";

export default function QuizPage() {
  const [topics, setTopics] = useState([]);
  const [selected, setSelected] = useState("java");
  const [topic, setTopic] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [result, setResult] = useState(null);

  useEffect(() => {
    api.get("/topics").then(({ data }) => setTopics(data.topics));
  }, []);

  useEffect(() => {
    api.get(`/topics/${selected}`).then(({ data }) => {
      setTopic(data.topic);
      setAnswers([]);
      setResult(null);
    });
  }, [selected]);

  async function submitQuiz() {
    const { data } = await api.post(`/quizzes/${selected}/submit`, { answers });
    setResult(data);
  }

  return (
    <section>
      <h1 className="text-2xl font-bold">Quiz Module</h1>
      <select className="input mt-5 max-w-sm" value={selected} onChange={(e) => setSelected(e.target.value)}>
        {topics.map((item) => (
          <option key={item.slug} value={item.slug}>{item.title}</option>
        ))}
      </select>

      <div className="mt-5 space-y-4">
        {topic?.quiz.map((question, questionIndex) => (
          <article key={question.question} className="rounded-lg border border-slate-200 bg-white p-5">
            <h2 className="font-semibold">{questionIndex + 1}. {question.question}</h2>
            <div className="mt-3 grid gap-2">
              {question.options.map((option, optionIndex) => (
                <label key={option} className="flex items-center gap-2 rounded-md border border-slate-200 p-3 text-sm">
                  <input
                    type="radio"
                    name={`question-${questionIndex}`}
                    checked={answers[questionIndex] === optionIndex}
                    onChange={() => {
                      const next = [...answers];
                      next[questionIndex] = optionIndex;
                      setAnswers(next);
                    }}
                  />
                  {option}
                </label>
              ))}
            </div>
          </article>
        ))}
      </div>

      <button className="btn mt-5" onClick={submitQuiz}>Submit quiz</button>
      {result && <p className="mt-4 rounded-md bg-teal-50 p-4 font-semibold text-teal-800">Score: {result.score}/{result.total}</p>}
    </section>
  );
}
