import React, { useState } from "react";
import { createTicket } from "../controllers/ticketController.js";

export default function TicketForm({ onCancel, onSuccess }) {
  const [form, setForm] = useState({
    title: "",
    category: "Technical",
    priority: "Medium",
    description: "",
  });
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  function change(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }

  async function submit(e) {
    e.preventDefault();
    setBusy(true);
    setError("");

    try {
      await createTicket(form);
      onSuccess();
    } catch (e) {
      setError(e.message);
    } finally {
      setBusy(false);
    }
  }

  return (
    <section className="card formcard">
      <button className="link" onClick={onCancel}>
        ← Back to tickets
      </button>

      <h1>Create ticket</h1>
      <form onSubmit={submit}>
        <label>
          Title
          <input
            name="title"
            value={form.title}
            onChange={change}
            placeholder="Brief summary of the issue"
            required
          />
        </label>

        <label>
          Category
          <select name="category" value={form.category} onChange={change}>
            <option value="Technical">Technical</option>
            <option value="Billing">Billing</option>
            <option value="Account">Account</option>
            <option value="Delivery">Delivery</option>
            <option value="Other">Other</option>
          </select>
        </label>

        <label>
          Priority
          <select name="priority" value={form.priority} onChange={change}>
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
        </label>

        <label>
          Description
          <textarea
            name="description"
            rows="5"
            value={form.description}
            onChange={change}
            placeholder="Detailed description of your problem"
            required
          />
        </label>

        {error && <p className="error">{error}</p>}

        <button className="primary" disabled={busy}>
          {busy ? "Submitting…" : "Submit ticket"}
        </button>
      </form>
    </section>
  );
}
