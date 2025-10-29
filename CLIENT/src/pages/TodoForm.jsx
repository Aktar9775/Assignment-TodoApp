import React, { useState, useEffect } from "react";
import API from "../services/api";
import { useNavigate, useParams } from "react-router-dom";

export default function TodoForm() {
  const [form, setForm] = useState({ title: "", description: "", category: "Non-Urgent", dueDate: "", completed: false });
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (!id) return;
    API.get(`/todos`).then(res => {
      const found = res.data.find(t => t._id === id);
      if (found) setForm({...found, dueDate: found.dueDate ? new Date(found.dueDate).toISOString().slice(0,10) : ""});
    });
  }, [id]);

  const submit = async (e) => {
    e.preventDefault();
    try {
      if (id) await API.put(`/todos/${id}`, form);
      else await API.post("/todos", form);
      navigate("/todos");
    } catch (err) {
      alert(err.response?.data?.message || "Error");
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white rounded">
      <h2 className="text-xl mb-4">{id ? "Edit Todo" : "Create Todo"}</h2>
      <form onSubmit={submit} className="space-y-3">
        <input required maxLength={100} placeholder="Title" value={form.title} onChange={e => setForm({...form, title: e.target.value})} className="w-full p-2 border rounded" />
        <textarea maxLength={500} placeholder="Description" value={form.description} onChange={e => setForm({...form, description: e.target.value})} className="w-full p-2 border rounded" />
        <div className="flex gap-2">
          <select value={form.category} onChange={e => setForm({...form, category: e.target.value})} className="p-2 border rounded">
            <option>Non-Urgent</option>
            <option>Urgent</option>
          </select>
          <input type="date" value={form.dueDate || ""} onChange={e => setForm({...form, dueDate: e.target.value})} className="p-2 border rounded" />
        </div>
        <div className="flex gap-2 items-center">
          <input type="checkbox" checked={form.completed} onChange={e => setForm({...form, completed: e.target.checked})} />
          <label>Completed</label>
        </div>
        <button className="px-4 py-2 bg-indigo-600 text-white rounded">{id ? "Save" : "Create"}</button>
      </form>
    </div>
  );
}
