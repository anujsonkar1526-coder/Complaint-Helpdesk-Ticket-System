import React, { useState } from "react";
import { registerUser } from "../controllers/authController.js";

export default function Register({ onBack }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "customer",
  });
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState(false);

  function change(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }

  async function submit(e) {
    e.preventDefault();
    setError("");
    setMessage("");
    setBusy(true);

    try {
      await registerUser(form);
      setMessage("Account created. Please sign in.");
    } catch (e) {
      setError(e.message);
    } finally {
      setBusy(false);
    }
  }

  return (
    <section className="auth card">
      <p className="eyebrow">GET STARTED</p>
      <h1>Create account</h1>

      <form onSubmit={submit}>
        <label>
          Name
          <input
            name="name"
            value={form.name}
            onChange={change}
            placeholder="Your full name"
            required
          />
        </label>

        <label>
          Email
          <input
            name="email"
            type="email"
            value={form.email}
            onChange={change}
            placeholder="you@example.com"
            required
          />
        </label>

        <label>
          Password
          <input
            name="password"
            type="password"
            minLength="6"
            value={form.password}
            onChange={change}
            placeholder="At least 6 characters"
            required
          />
        </label>

        <label>
          Role
          <select name="role" value={form.role} onChange={change}>
            <option value="customer">Customer</option>
            <option value="support">Support</option>
          </select>
        </label>

        {error && <p className="error">{error}</p>}
        {message && <p className="success">{message}</p>}

        <button className="primary" disabled={busy}>
          {busy ? "Creating…" : "Create account"}
        </button>
      </form>
      <p className="center muted">
        Already registered?{" "}
        <button className="link" onClick={onBack}>
          Sign in
        </button>
      </p>
    </section>
  );
}
